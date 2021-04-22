import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventAPI } from '../../service/api/EventAPI';
import { StatusContext } from '../../shared/contexts/statusContext';
import { IEventInfo } from '../../shared/models/EventInterfaces';

export default function EventPage() {
  const { status } = useContext(StatusContext);
  const { EventId } = useParams<{EventId: string}>();
  const [eventInfo, setEventInfo] = useState<IEventInfo>({} as IEventInfo);
  const dateString = new Date(eventInfo.EventDate).toDateString().split(' ');
  useEffect(() => {
    EventAPI.GetEventInfo(EventId, status.MemberId).then((response) => { setEventInfo(response.data); });
  }, []);
  console.log(eventInfo);
  // TODO Logic here use custom hook to change info
  const Signup = false;
  const confirmSignup = false;
  console.log(EventId);
  return (
    <div className="EventPage">
      {Signup ? (
        confirmSignup ? (
          <span className="SignUpForm">
            <div className="FormContainer">
              <p>Successfully Signed Up!</p>
              <p>Check out event page for Room Password!</p>
            </div>
          </span>
        ) : (
          <form className="SignUpForm">
            <div className="FormContainer">
              <div className="FormSelection">
                <p>I want to pay by:</p>
                <span>
                  <input type="checkbox" />
                  <label>Pay by cash to host</label>
                </span>
                <span>
                  <input type="checkbox" />
                  <label>Pay by money transfer</label>
                </span>
              </div>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of &#34 de Finibopular
                during the Renaissance. The first line of Lorem Ipsum, &#34Lorem
                ipsum dolor sit amet..&#34,in a piece of classical Latin literature
                from 45 BC, making it over
              </p>
              <span>
                <input type="checkbox" />
                <label>I Agree, and will follow the rules</label>
              </span>
              <button type="submit">SignUp</button>
            </div>
          </form>
        )
      ) : (
        ''
      )}
      <div className="Date">{dateString[1]}.{dateString[2]} ({dateString[0]})</div>
      <div className="EventName">{eventInfo.EventName}</div>
      <div className="HostName">Host : {eventInfo.HostName}</div>
      <div className="EventInfo">
        {eventInfo.EventInfo}
      </div>
      {/* TODO Implement Participants */}
      <div className="Participants">Participants</div>
      <div className="ParticiapntsCheck" />
      <div>
        <button className="SignUp" type="button"> SignUp</button>
      </div>
    </div>
  );
}
