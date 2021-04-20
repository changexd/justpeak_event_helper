import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LogIn from './pages/Login';
import Events from './pages/Event';
import Header from './shared/Header';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import 'draft-js/dist/Draft.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <HostProvider> */}
          <Route path="/login">
            <Header title="SignUp">
              <LogIn />
            </Header>
          </Route>
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
          <Route path="/admin">
            <Header title="Admins">
              <Admin />
            </Header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
