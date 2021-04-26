import React, { useContext, useEffect } from 'react';
import {
  Switch, BrowserRouter as Router, Route, Redirect
} from 'react-router-dom';
import { MemberAPI } from './service/api/MemberAPI';
import { AuthContext } from './shared/contexts/authContext';
import { StatusContext } from './shared/contexts/statusContext';
import './App.css';
import LogIn from './pages/Login';
import Events from './pages/Event';
import Header from './shared/Header';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import { IStatus } from './shared/models/MemberInterfaces';

function PrivateRoute() {
  const { status } = useContext(StatusContext);
  return (
    <div>
      <Route path="/events">
        <Header title="Events">
          <Events />
        </Header>
      </Route>
      <Route path="/mypage">
        <Header title="My Page">
          <MyPage />
        </Header>
      </Route>
      {status.IsAdmin == true ? (
        <Route path="/admin">
          <Header title="Admins">
            <Admin />
          </Header>
        </Route>
      ) : ''}
    </div>
  );
}
const App = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setStatus } = useContext(StatusContext);
  useEffect(() => {
    // console.log('auth state changed');
    const LoginStatus :any = new Promise((resolve, reject) => {
      FB.getLoginStatus((res) => {
        if (res.status === 'connected') {
          FB.api('/me',
            'get',
            { fields: 'id,email' }, (data) => resolve(data));
        } else {
          setAuth(false);
          reject(res);
        }
      });
    });
    LoginStatus
      .then((res:any) => { return MemberAPI.LoginMember<IStatus>(res.id, res.email); })
      .then((res:any) => { if (res.status === 200) { setStatus(res.data); setAuth(true); } else { setAuth(false); } });
  }, [auth]);

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <HostProvider> */}
          <Route path="/login">
            {auth == true ? <Redirect to="/events" /> : (
              <Header title="SignUp">
                <LogIn />
              </Header>
            ) }
          </Route>
          {auth == null ? (
            <div style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: 'yellow',
            }}
            />
          ) : auth == false
            ? <Redirect to="/login" /> : <PrivateRoute />}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
