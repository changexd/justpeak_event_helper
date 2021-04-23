import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventAPI } from '../../service/api/EventAPI';
import { StatusContext } from '../../shared/contexts/statusContext';
import { useForm } from '../../shared/hooks/useForm';
import { IEventInfo, ISignUpEvent } from '../../shared/models/EventInterfaces';
import { IStatus } from '../../shared/models/MemberInterfaces';

export default function EventPage() {
  const { status } = useContext(StatusContext);
  const { EventId } = useParams<{EventId: string}>();
  const [eventInfo, setEventInfo] = useState<IEventInfo>({} as IEventInfo);
  const [signup, setSignup] = useState(false);
  const [confirmSignup, setConfirmSignup] = useState(false);
  const EventDate = new Date(eventInfo.EventDate);
  const currentDate = new Date();
  const dateString = EventDate.toDateString().split(' ');
  useEffect(() => {
    EventAPI.GetEventInfo<IEventInfo>(EventId, status.MemberId).then((response) => { setEventInfo(response.data); });
  }, [confirmSignup]);
  // console.log(eventInfo);
  // TODO Logic here use custom hook to change info
  console.log(EventId);
  return (
    <div className="EventPage">
      {signup ? (
        confirmSignup ? (
          <span className="SignUpForm" onClick={() => { setConfirmSignup(false); setSignup(false); }}>
            <div className="FormContainer">
              <p>Successfully Signed Up!</p>
              <p>Check out event page for Room Password!</p>
            </div>
          </span>
        ) : (
          <SignUpForm status={status} EventId={EventId} setConfirmSignup={setConfirmSignup} />
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
        {currentDate > EventDate ? <div>The Event is already finished</div> : <button type="button" onClick={() => setSignup(true)}>SignUp</button>}
      </div>
    </div>
  );
}
function SignUpForm({
  status, EventId, setConfirmSignup
}
  :{status:IStatus, EventId:string, setConfirmSignup:React.Dispatch<boolean>}) {
  const [myStatus, setMyStatus] = useForm<ISignUpEvent>({} as ISignUpEvent);
  const [agree, setAgree] = useState(false);
  useEffect(() => {
    EventAPI.GetMyStatus<ISignUpEvent>(EventId, status.MemberId).then((response) => {
      const data = response.data;
      if (data) {
        Object.keys(data).forEach((key) => { setMyStatus(key, data[key]); });
      } else {
        setMyStatus('EventId', EventId);
        setMyStatus('IsComing', true);
        setMyStatus('IsCancel', false);
        setMyStatus('MemberId', status.MemberId);
      }
    });
  }, []);
  useEffect(() => {
    if (myStatus.PaidMethod === 'TRANSFER') { setMyStatus('PaidAccount', ''); }
  }, [myStatus.PaidMethod]);
  console.log(myStatus);
  return (
    <form
      className="SignUpForm"
      onSubmit={(evt) => {
        console.log(myStatus);
        evt.preventDefault();
        if (agree) {
          EventAPI.SignUpEvent(myStatus).then(() => {
            setConfirmSignup(true);
          });
        }
      }}
    >
      <div className="FormContainer">
        <div className="FormSelection">
          <p>I want to pay by:</p>
          <span>
            <input name="PaidMethod" type="radio" value="CASH" onChange={(evt) => setMyStatus(evt.target.name, evt.target.value)} />
            <label>Pay by cash to host</label>
          </span>
          <span>
            <input name="PaidMethod" type="radio" value="TRANSFER" onChange={(evt) => setMyStatus(evt.target.name, evt.target.value)} />
            <label>Pay by money transfer</label>
            {myStatus.PaidMethod === 'TRANSFER'
              ? <input name="PaidAccount" value={myStatus.PaidAccount} onChange={(evt) => setMyStatus(evt.target.name, evt.target.value)} /> : ''}
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
          <input type="checkbox" onClick={() => { setAgree(!agree); }} />
          <label>I Agree, and will follow the rules</label>
        </span>
        <button type="submit" disabled={!agree}>SignUp</button>
      </div>
    </form>
  );
}
