import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import LogIn from './pages/Login';
import Events from './pages/Event';
import Header from './shared/Header';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/login'>
            <Header title='SignUp'>
              <LogIn />
            </Header>
          </Route>
          <Route exact path='/events'>
            <Header title='Events'>
              <Events />
            </Header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
