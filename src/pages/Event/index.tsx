import {
  useRouteMatch, Switch, Route, Link
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as uuid from 'uuid';
import EventPage from './EventPage';
import { IEventListItem } from '../../shared/models/EventInterfaces';
import { EventAPI } from '../../service/api/EventAPI';

function EventItem(prop: IEventListItem) {
  // TODO Add Event link button
  const DateString = prop.EventDate.toDateString().split(' ');
  return (
    <div className="EventItem">
      {prop.EventDate > prop.NowDate ? (
        <div>
          <button type="button">SignUp</button>
          <p className="ThisWeek">Event This week</p>
          <p className="Date">
            {DateString[1]}.{DateString[2]} ({DateString[0]})
          </p>
          <h2 className="EventName">{prop.EventName}</h2>
          <h2 className="HostName">{prop.HostName}</h2>
          <p className="More"><Link to={`${prop.path}/${prop.EventId}`}>more..</Link></p>
        </div>
      ) : (
        <div>
          <p className="Date">
            {DateString[1]}.{DateString[2]} ({DateString[0]})
          </p>
          <h2 className="EventName">{prop.EventName}</h2>
          <h2 className="HostName">{prop.HostName}</h2>
          <p className="More"><Link to={`${prop.path}/${prop.EventId}`}>more..</Link></p>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  const [eventList, setEventList] = useState<Array<IEventListItem>>([] as Array<IEventListItem>);
  const [page, setPage] = useState(0);
  // console.log(eventList);
  useEffect(() => {
    EventAPI.GetEvents(page).then((response) => { if (response.data) { setEventList([...eventList, ...response.data]); } });
  }, [page]);
  const { path } = useRouteMatch();
  // console.log(url);
  const nowDate = new Date();

  const EventList = eventList.map((event) => {
    const eventDate = new Date(event.EventDate);
    return (
      <EventItem
        path={path}
        NowDate={nowDate}
        key={uuid.v4()}
        EventId={event.EventId}
        EventDate={eventDate}
        EventName={event.EventName}
        Week={event.Week}
        IsCancel={event.IsCancel}
        HostName={event.HostName}
        EventTags={event.EventTags}
      />
    );
  });
  return (
    <div>
      {' '}
      <Switch>
        <Route exact path={path}>
          <div className="Event">{EventList}
            <button type="button" onClick={() => { setPage(page + 1); }}>next page</button>
          </div>
        </Route>
        <Route path={`${path}/:EventId`}>
          <EventPage />
        </Route>
      </Switch>
    </div>
  );
}
