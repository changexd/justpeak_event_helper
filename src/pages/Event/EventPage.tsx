import { useEffect, useState, useContext } from 'react';
import * as uuid from 'uuid';
import { useParams } from 'react-router-dom';
import { EventAPI } from '../../service/api/EventAPI';
import { StatusContext } from '../../shared/contexts/statusContext';
import { IEventInfo } from '../../shared/models/EventInterfaces';
import SignUpForm from './components/SignUpForm';

export default function EventPage() {
  const { status } = useContext(StatusContext);
  const { EventId } = useParams<{EventId: string}>();
  const [eventInfo, setEventInfo] = useState<IEventInfo>({} as IEventInfo);
  const [formType, setFormType] = useState('');
  const [confirmForm, setConfirmForm] = useState(false);
  const EventDate = new Date(eventInfo.EventDate);
  const currentDate = new Date();
  const dateString = EventDate.toDateString().split(' ');
  const myInfo = eventInfo.Participants
    ? eventInfo.Participants.filter((p) => p.MemberId === status.MemberId) : [];
  console.log(myInfo);
  useEffect(() => {
    EventAPI.GetEventInfo<IEventInfo>(EventId, status.MemberId).then((response) => { setEventInfo(response.data); });
  }, [confirmForm]);
  // console.log(eventInfo);
  // TODO Logic here use custom hook to change info
  console.log(eventInfo);
  return (
    eventInfo.EventId
      ? (
        <div className="EventPage">
          {formType === 'signUp' ? (
            confirmForm ? (
              <span className="SignUpForm" onClick={() => { setConfirmForm(false); setFormType(''); }}>
                <div className="FormContainer">
                  <p>Successfully Signed Up!</p>
                  <p>Check out event page for Room Password!</p>
                </div>
              </span>
            ) : (
              <SignUpForm
                key={uuid.v4()}
                status={status}
                EventId={EventId}
                setConfirmForm={setConfirmForm}
                EventDate={EventDate}
                formType={formType}
                currentDate={currentDate}
              />
            )
          ) : (
            ''
          )}
          {formType === 'cancel' ? (
            confirmForm ? (
              <span className="SignUpForm" onClick={() => { setConfirmForm(false); setFormType(''); }}>
                <div className="FormContainer">
                  <p>Successfully Cancelled!</p>
                  <p>Check out for future Events!</p>
                </div>
              </span>
            ) : (
              <SignUpForm
                key={uuid.v4()}
                status={status}
                EventId={EventId}
                setConfirmForm={setConfirmForm}
                EventDate={EventDate}
                formType={formType}
                currentDate={currentDate}
              />
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
          <div className="Participants">
            {eventInfo.Participants.map((participant) => {
              if (participant.IsCancel !== true && participant.IsComing === true) {
                return <div>{participant.ParticipantName}</div>;
              }
            })}
          </div>
          <div className="ParticiapntsCheck" />
          <div>
            {currentDate > EventDate
              ? <div>The Event is already finished</div>
              : myInfo.length > 0 && myInfo[0].IsComing == true
                ? (
                  <div>
                    <button type="button" onClick={() => setFormType('signUp')}>EditPayment</button>
                    <button type="button" onClick={() => setFormType('cancel')}>Cancel</button>
                  </div>
                )
                : myInfo.length > 0 && myInfo[0].IsCancel === true
                  ? <p> You already canceled this Event, you may not rejoin</p>
                  : <button type="button" onClick={() => setFormType('signUp')}>SignUp</button>}
          </div>
        </div>
      )
      : <div />);
}
