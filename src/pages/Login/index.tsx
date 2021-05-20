import React, { useState, useContext, useEffect } from 'react';
import * as uuid from 'uuid';
import { EventAPI } from '../../service/api/EventAPI';
import { MemberAPI } from '../../service/api/MemberAPI';
import { AuthContext } from '../../shared/contexts/authContext';
import { useForm } from '../../shared/hooks/useForm';
import { IEventThisWeek } from '../../shared/models/EventInterfaces';
import { ICreateMember } from '../../shared/models/MemberInterfaces';
// import {IEvent, login_status} from '../models/models';

function RegisterForm({ setAuth }: any) {
  // type memberInfo
  const [memberInfo, SetMemberInfo] = useForm<ICreateMember>({} as ICreateMember);
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
        SetMemberInfo('FBLink', link);
        SetMemberInfo('NameFb', name);

        // if result is goood set auth
        // Insert your code here
      },
    );
  }, []);
  console.log(setAuth);
  return (
    <form
      className="h-full w-full bg-black bg-opacity-80 absolute top-0 left-0 z-10 flex flex-col justify-center items-center"
      onSubmit={async (evt) => {
        evt.preventDefault();
        MemberAPI.CreateMember(memberInfo).then((response) => { SetMemberInfo('Email', response); });
        // send data to backend and if success set auth
      }}
    >
      <div className="container h-4/6 w-10/12 rounded-3xl bg-white border-4 border-grey flex flex-col justify-around items-center">
        <h2 className="border-b-2 p-2">Please Enter your Information</h2>
        <div className="h-auto w-5/6 space-y-2">
          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="Email">Email</label>
            <input type="email" className="rounded" id="Email" defaultValue={memberInfo.Email} />
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="NameEng">English Name</label>
            <input
              className="rounded"
              type="text"
              id="NameEng"
              onChange={(evt) => {
                SetMemberInfo(evt.target.id, evt.target.value);
                console.log(memberInfo);
              }}
            />
          </div>
          <div className="flex flex-col space-y-3 w-full ">
            <label htmlFor="NameZht"> Chinese Name</label>
            <input
              className="rounded"
              type="text"
              id="NameZht"
              onChange={(evt) => {
                SetMemberInfo(evt.target.id, evt.target.value);
                console.log(memberInfo);
              }}
            />
          </div>
        </div>
        <button className="h-12 w-1/2 bg-yellow rounded-lg border-2 border-grey" type="submit">Register</button>
      </div>
    </form>
  );
}
function ThisWeekEventItem({ event }:{event:IEventThisWeek}) {
  // TODO Add classes to this component

  const eventDate = new Date(event.EventDate);
  const dateString = eventDate.toDateString().split(' ');
  // console.log(eventDate);
  return (
    <>
      <h3>{dateString[1]}.{dateString[2]} ({dateString[0]})</h3>
      <h2>{event.EventName}</h2>
      <h2>{event.HostName}</h2>
    </>
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
    EventAPI.GetThisWeek(now.toISOString()).then((response) => { if (response.data) { setEventThisWeek(response.data); } });
  }, []);
  // parse XFBML to the page
  const thisWeekEvents = eventThisWeek.length < 1 ? '' : eventThisWeek.map((event) => {
    return <ThisWeekEventItem event={event} key={uuid.v4()} />;
  });
  return (
    <div className="Login container h-full flex flex-col justify-center relative">
      {showRegister ? <RegisterForm setAuth={setAuth} /> : ''}
      <div className="container h-2/4 flex flex-col justify-center items-center space-y-3">
        <h3 className="h-auto">Event This Week</h3>
        <div className="container w-10/12 h-4/6  bg-white">
          <ThisWeekEventItem
            event={{
              EventId: 'string',
              EventName: 'string',
              Week: 12,
              EventDate: new Date(),
              EventInfo: 'Something',
              EventTags: [{
                EventTagEng: 'string',
                EventTagZht: 'string',
              }],
              HostName: 'string',
              HostId: 'string'
            }}
            key={uuid.v4()}
          />
        </div>
        {thisWeekEvents.length > 0 ? thisWeekEvents : ''}
        <div className="container h-8 flex justify-center space-x-3"><div className="w-3 h-3 bg-darkgrey rounded-full" /></div>
      </div>
      <div className="container h-1/5 flex flex-col justify-between items-center">
        <button
          className="w-10/12 h-1/3 bg-grey rounded filter drop-shadow-login text-white"
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
        <div className="container h-1/2 flex flex-col justify-between items-center">
          <button type="button" className="h-10 w-10 ring ring-white rounded-full bg-blue-300">F</button>
          <p>Check Us Out On Facebook</p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
