import {
  Switch, Route, NavLink, useRouteMatch
} from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';

export default function Admin() {
  const { path } = useRouteMatch();
  return (
    <div className="Admin">
      <ul>
        <li>
          <NavLink to={`${path}/createEvent`}>Create Event</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/createEvent`}>
          <CreateEvent />
        </Route>
      </Switch>
    </div>
  );
}
