import {useRouteMatch, Switch, Route} from 'react-router-dom';
import EventPage from './EventPage';
import * as uuid from 'uuid';

interface IEventTag {
  EventTagEng: string;
  EventTagZht: string;
}
interface IEventInfo {
  NowDate: Date;
  EventId: number;
  EventDate: Date;
  EventName: string;
  Week: number;
  IsCancel: boolean;
  HostName: string;
  EventTags: Array<IEventTag>;
}

function EventItem(prop: IEventInfo) {
  //TODO Add Event link button
  const DateString = prop.EventDate.toDateString().split(' ');
  return (
    <div className='EventItem'>
      {prop.EventDate > prop.NowDate ? (
        <div>
          <button>SignUp</button>
          <p className='ThisWeek'>Event This week</p>
          <p className='Date'>
            {DateString[1]}.{DateString[2]} ({DateString[0]})
          </p>
          <h2 className='EventName'>{prop.EventName}</h2>
          <h2 className='HostName'>{prop.HostName}</h2>
          <p className='More'>more..</p>
        </div>
      ) : (
        <div>
          <p className='Date'>
            {DateString[1]}.{DateString[2]} ({DateString[0]})
          </p>
          <h2 className='EventName'>{prop.EventName}</h2>
          <h2 className='HostName'>{prop.HostName}</h2>

          <p className='More'>more..</p>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  const {path, url} = useRouteMatch();
  const nowDate = new Date();
  const data = [
    {
      EventId: 1,
      EventDate: new Date('2021-04-14T19:30'),
      EventName: 'Gay Marriage',
      Week: 2,
      IsCancel: false,
      HostName: 'Darren',
      EventTags: [{EventTagEng: 'gay', EventTagZht: 'gay'}],
    },
    {
      EventId: 1,
      EventDate: new Date('2021-04-14T19:30'),
      EventName: 'Gay Marriage',
      Week: 2,
      IsCancel: false,
      HostName: 'Darren',
      EventTags: [{EventTagEng: 'gay', EventTagZht: 'gay'}],
    },
    {
      EventId: 1,
      EventDate: new Date('2021-04-14T19:30'),
      EventName: 'Gay Marriage',
      Week: 2,
      IsCancel: false,
      HostName: 'Darren',
      EventTags: [{EventTagEng: 'gay', EventTagZht: 'gay'}],
    },
    {
      EventId: 1,
      EventDate: new Date('2021-04-14T19:30'),
      EventName: 'Gay Marriage',
      Week: 2,
      IsCancel: false,
      HostName: 'Darren',
      EventTags: [{EventTagEng: 'gay', EventTagZht: 'gay'}],
    },
    {
      EventId: 1,
      EventDate: new Date('2021-04-14T19:30'),
      EventName: 'Gay Marriage',
      Week: 2,
      IsCancel: false,
      HostName: 'Darren',
      EventTags: [{EventTagEng: 'gay', EventTagZht: 'gay'}],
    },
  ];
  const EventList = data.map((event, index) => {
    return (
      <EventItem
        NowDate={nowDate}
        key={uuid.v4()}
        EventId={event.EventId}
        EventDate={event.EventDate}
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
          <div className='Event'>{EventList}</div>
        </Route>
        <Route path={`${path}/:EventId`}>
          <EventPage />
        </Route>
      </Switch>
    </div>
  );
}
