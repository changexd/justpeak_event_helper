/* eslint-disable quote-props */
import { useContext, useEffect, useState } from 'react';
import { EventAPI } from '../../service/api/EventAPI';
import { StatusContext } from '../../shared/contexts/statusContext';
import { IHistoryEventParticipant } from '../../shared/models/EventInterfaces';

function Event({ date, text } :any) {
  return (
    <div className="MyPage__Event">
      <p>{date}</p>
      <p>{text}</p>
    </div>
  );
}
export default function MyPage() {
  const [imageUrl, setImageUrl] = useState('');
  const { status } = useContext(StatusContext);
  const [page, setPage] = useState(0);
  const [EventOption, setEventOption] = useState('hosted');
  const [eventList, setEventList] = useState<Array<IHistoryEventParticipant | IHistoryEventParticipant>>([] as Array<IHistoryEventParticipant | IHistoryEventParticipant>);
  useEffect(() => {
    FB.api(
      `/${status.MemberId}/picture?redirect=false`,
      'get',
      // eslint-disable-next-line quotes
      { "width": "200", "hieght": "100" },
      (response:any) => {
        setImageUrl(response.data.url);
        // Insert your code here
      }
    );
  }, []);
  useEffect(() => {
    if (EventOption === 'hosted') {
      EventAPI.GetHistoryEventHost(status.MemberId).then((response) => { setEventList(response.data); });
    } else {
      EventAPI.GetHistoryEventParticipant(status.MemberId).then((response) => { setEventList(response.data); });
    }
  }, [EventOption]);
  const MaxPage = Math.floor(eventList.length / 8);
  const eventdisplay = eventList.slice(page * 8, (page + 1) * 8).map((evt) => { return <Event date={evt.EventDate} text={evt.EventName} />; });
  return (
    <div className="MyPage">
      <div className="MyPage__Info">
        <div><span><img alt="asd" src={imageUrl} /></span></div>
        <p>{status.NameEng}</p>
      </div>
      <div className="MyPage__History">
        <div className="MyPage__label">
          <p
            onClick={() => { setEventOption('hosted'); setPage(0); }}
            className={EventOption === 'hosted' ? 'active' : 'inactive'}
          >
            Hosted
          </p>
          <p
            onClick={() => { setEventOption('joined'); setPage(0); }}
            className={EventOption === 'joined' ? 'active' : 'inactive'}
          >Joined
          </p>
        </div>
        <div className="MyPage__Events">{eventdisplay}</div>
        <div className="MyPage__Arrows">
          <p
            onClick={() => setPage(page == 0 ? 0 : page - 1)}
            className={page === 0 ? 'inactive' : 'active'}
          >&lt;
          </p>
          <p
            className={page === 0 ? 'inactive' : 'active'}
            onClick={() => {
              setPage(page === MaxPage ? MaxPage : page + 1);
            }}
          >&gt;
          </p>
        </div>
      </div>
    </div>
  );
}
