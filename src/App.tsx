import {Component, useState, useContext, useEffect} from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import LogIn from './components/Login/LogIn';
import HostView from './components/Event/HostView';
import AdminView from './components/Admin/AdminView';
// import {StatusContext} from './shared/contexts/statusContext';
// import {HostProvider} from './shared/contexts/hostContext';
import {AuthContext} from './shared/contexts/authContext';
import {FB_Login} from './service/api/FB_Login';
import Header from './components/Header';
import Events from './components/Event/Events';

// import dotenv from 'dotenv';
// dotenv.config();

function PrivateRoute() {
  return (
    <div>
      <Route path='/host/:HostName/:PassCode'>{/* <HostView /> */}</Route>
      <Route exact path='/admin'>
        {/* <AdminView /> */}
      </Route>
    </div>
  );
}
function App() {
  // const {auth, setAuth} = useContext(AuthContext);
  // let display;
  // console.log(auth);
  // console.log(process.env);
  // useEffect(() => {
  //    function getInfoFB(){
  //     return new Promise<string>((resolve, reject) => {
  //       FB.api(
  //         '/me',
  //         'get',
  //         {fields: 'id'},(res :any)=>{
  //           if(res){resolve(res.id)}
  //         })
  //     })
  //   }
  //   async function CheckMember(){
  //     window.FB.getLoginStatus(async res=>{
  //       const {status} = res;
  //       if(status === 'connected'){
  //         const MemberId =  await getInfoFB();
  //         const result = await FB_Login.CheckMember({MemberId: MemberId})
  //         if(result.status === 200){
  //           setAuth(true)
  //         }else{setAuth(false)}

  //       }else{setAuth(false)}

  //     })

  //   }CheckMember();
  //   // window.FB.getLoginStatus((res) => {
  //   //   const {status} = res;
  //   //   if (status === 'connected') {
  //   //     setAuth(true);
  //   //   } else {
  //   //     setAuth(false);
  //   //   }
  //   // });
  // }, []);

  return (
    <Router>
      <div className='App'>
        <Switch>
          {/* <HostProvider> */}
          <Route path='/login'>
            <Header title='SignUp'>
              <LogIn />
            </Header>
          </Route>
          <Route path='/events'>
            <Header title='Events'>
              <Events />
            </Header>
          </Route>
          {/* {auth == null ? (
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'yellow',
                }}
              >
                {' '}
                still waiting
              </div>
            ) : auth == false ? (
              <Redirect to='/login' />
            ) : (
              <PrivateRoute />
            )} */}
          {/* </HostProvider> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
