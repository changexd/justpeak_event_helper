import React, { useState, useContext, useEffect } from 'react';
import * as uuid from 'uuid';
import { EventAPI } from '../../service/api/EventAPI';
import { MemberAPI } from '../../service/api/MemberAPI';
import { AuthContext } from '../../shared/contexts/authContext';
import { useForm } from '../../shared/hooks/useForm';
import { IEventThisWeek } from '../../shared/models/EventInterfaces';
// import {IEvent, login_status} from '../models/models';

function RegisterForm({ setAuth }: any) {
  // type memberInfo
  const [memberInfo, SetMemberInfo] = useForm({});
  useEffect(() => {
    FB.api(
      '/me',
      'get',
      { fields: 'id,name,email,link' },
      // TODO check if database has this info
      async (response: any) => {
        const {
          id, name, email, link,
        } = response;
        SetMemberInfo('Email', email);
        SetMemberInfo('MemberId', id);
        SetMemberInfo('FbLink', link);
        SetMemberInfo('NameFb', name);

        // if result is goood set auth
        // Insert your code here
      },
    );
  }, []);

  return (
    <form
      className="Register"
      onSubmit={async (evt) => {
        evt.preventDefault();
        const result = await MemberAPI.CreateMember(memberInfo);
        if (result.status === 200) {
          setAuth(true);
        }
        // send data to backend and if success set auth
      }}
    >

      <div className="Register__Form">
        <div>
          <label htmlFor="Email">Email</label>
          <input id="Email" defaultValue={memberInfo.Email} />
        </div>
        <div>
          <label htmlFor="NameEng">English Name</label>
          <input
            id="NameEng"
            onChange={(evt) => {
              SetMemberInfo(evt.target.id, evt.target.value);
              console.log(memberInfo);
            }}
          />
          {' '}
        </div>
        <div>
          <label htmlFor="NameZht"> Chinese Name</label>
          <input
            id="NameZht"
            onChange={(evt) => {
              SetMemberInfo(evt.target.id, evt.target.value);
              console.log(memberInfo);
            }}
          />
        </div>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
function ThisWeekEventItem({ event }:{event:IEventThisWeek}) {
  // TODO Add classes to this component

  const eventDate = new Date(event.EventDate);
  const dateString = eventDate.toDateString().split(' ');
  console.log(eventDate);
  return (
    <div>
      <h3>{dateString[1]}.{dateString[2]} ({dateString[0]})</h3>
      <h2>{event.EventName}</h2>
      <h2>{event.HostName}</h2>
    </div>
  );
}
function LogIn() {
  const { setAuth } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [eventThisWeek, setEventThisWeek] = useState<Array<IEventThisWeek>>([] as Array<IEventThisWeek>);
  useEffect(() => {
    const now = new Date();
    const date = now.getDate();
    const day = now.getDay();
    const daysTillSat = day == 6 ? 7 : 6 - day;
    now.setDate(date + daysTillSat);
    now.setHours(23, 59, 59);
    EventAPI.GetThisWeek(now.toISOString()).then((response) => setEventThisWeek(response.data));
  }, []);
  // parse XFBML to the page
  const thisWeekEvents = eventThisWeek.length < 1 ? '' : eventThisWeek.map((event) => {
    return <ThisWeekEventItem event={event} key={uuid.v4()} />;
  });
  return (
    <div className="Login">
      {showRegister ? <RegisterForm setAuth={setAuth} /> : ''}
      <div className="Login__EventThisWeek">
        <h3>Event This Week</h3>
        {thisWeekEvents}
      </div>
      <div className="Login__LoginWithFB">
        <button
          type="button"
          onClick={() => {
            FB.login((res:any) => {
              console.log(res);
              const result = MemberAPI.CheckMember(res.authResponse.userID);
              console.log(result);
              result.then((response) => { if (response.status === 200) { setAuth(true); } else { setShowRegister(true); } });
            });
          }}
        >
          Login With Facebook
        </button>
      </div>
      <div className="Login__CheckUsOut">
        <button type="button">F</button>
        <p>Check Us Out On Facebook</p>
      </div>
    </div>
  );
}

export default LogIn;
