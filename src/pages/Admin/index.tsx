import {
  Switch, Route, NavLink, useRouteMatch
} from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Members from './pages/Members';

export default function Admin() {
  const { path } = useRouteMatch();
  return (
    <div className="Admin">
      <ul>
        <li>
          <NavLink to={`${path}/createEvent`}>Create Event</NavLink>
        </li>
        <li>
          <NavLink to={`${path}/Members`}>Members</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/createEvent`}>
          <CreateEvent />
        </Route>
        <Route path={`${path}/Members`}>
          <Members />
        </Route>
      </Switch>
    </div>
  );
}
