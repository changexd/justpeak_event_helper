import { useEffect, useState, useContext } from 'react';
import * as uuid from 'uuid';
import { useParams } from 'react-router-dom';
import { EventAPI } from '../../service/api/EventAPI';
import { StatusContext } from '../../shared/contexts/statusContext';
import { IEventInfo } from '../../shared/models/EventInterfaces';
import SignUpForm from './components/SignUpForm';
import HostForm from './components/HostForm';
import { IStatus } from '../../shared/models/MemberInterfaces';
import { IParticipantLanding } from '../../shared/models/ParticipantInterfaces';

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
  const Participants = eventInfo.Participants || eventInfo.PaymentStatus;
  const pageButtonOptions = checkPageType(currentDate, EventDate, eventInfo.HostId, status, myInfo);
  const optionDisplay = pageButtonOptions.map((option) => {
    if (option.type === 'text') {
      return <p key={uuid.v4()}>{option.text}</p>;
    } else {
      return <button key={uuid.v4()} type="button" onClick={() => setFormType(option.type)}>{option.text}</button>;
    }
  });

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
                myInfo={myInfo}
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
                myInfo={myInfo}
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
          {formType === 'payment' ? (
            confirmForm ? (
              <span className="SignUpForm" onClick={() => { setConfirmForm(false); setFormType(''); }}>
                <div className="FormContainer">
                  <p>Successfully Submitted!</p>
                  <p>Check out for future Events!</p>
                </div>
              </span>
            ) : (
              <HostForm
                key={uuid.v4()}
                PaymentStatus={eventInfo.PaymentStatus}
                status={status}
                EventId={EventId}
                setConfirmForm={setConfirmForm}
                EventDate={EventDate}
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
            {Participants.map((participant) => {
              if (participant.IsCancel !== true && participant.IsComing === true) {
                return <div key={uuid.v4()}>{participant.ParticipantName}</div>;
              }
            })}
          </div>
          <div className="ParticiapntsCheck" />
          <div>
            {optionDisplay}
          </div>
        </div>
      )
      : <div />);
}

function checkPageType(currentDate:Date, EventDate: Date, HostId: string, status:IStatus, myInfo: IParticipantLanding[]) {
  if (currentDate > EventDate && status.IsAdmin === false) {
    return [{ type: 'text', text: 'The Event is already finished' }];
  } else if (HostId === status.MemberId) {
    return [{ type: 'payment', text: 'EditPayment' }];
  } else if (status.IsAdmin === true && HostId !== status.MemberId) {
    return [{ type: 'payment', text: 'EditPayment' }, { type: 'signUp', text: 'SignUp' }];
  } else if (myInfo.length > 0 && myInfo[0].IsComing == true) {
    return [{ type: 'signUp', text: 'EditPayment' }, { type: 'cancel', text: 'Cancel' }];
  } else if (myInfo.length > 0 && myInfo[0].IsCancel === true) {
    return [{ type: 'text', text: 'You already canceled this Event, you may not rejoin' }];
  } else {
    return [{ type: 'signUp', text: 'SignUp' }];
  }
}
