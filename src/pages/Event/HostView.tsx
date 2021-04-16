export default {};
// import {
//   Dispatch,
//   SetStateAction,
//   useState,
//   useRef,
//   useEffect,
//   useContext,
// } from 'react';
// import useParticipants from '../hooks/useParticipants';
// import * as uuid from 'uuid';
// import {
//   IEvent,
//   IEventDay,
//   IParticipant,
//   login_status,
//   page_status,
// } from '../models/models';
// import {request} from '../shared/request';
// import {useHistory, useParams} from 'react-router-dom';
// //context
// import {HostContext} from '../../shared/contexts/hostContext';
// import {StatusContext} from '../../shared/contexts/statusContext';

// interface participant extends IParticipant {
//   setPaid: (index: number) => void;
//   index: number;
// }
// interface IParamtypes {
//   HostName: string;
//   PassCode: string;
// }
// //--------------------------Primary Component---------------------
// function HostView() {
//   //Set contexts
//   const {status, setNewStatus} = useContext(StatusContext);
//   // const host = useContext(HostContext);
//   const history = useHistory();
//   //States
//   const [EventData, setEventData] = useState<IEvent>({} as IEvent);
//   const {participants, setPaid, setParticipants} = useParticipants(
//     (EventData?.participants as Array<IParticipant>) || []
//   );
//   const [pageStatus, SetPageStatus] = useState(page_status.default);

//   const [confirmSubmit, setConfirmSubmit] = useState(false);
//   const [success, setSuccess] = useState(false);
//   //Params from react router
//   let {HostName, PassCode} = useParams<IParamtypes>();
//   useEffect(() => {
//     async function getEvent() {
//       const hostInfo = {HostName: HostName, Code: PassCode};
//       const result = await request.getParticipants(hostInfo);
//       if (result.status === 200) {
//         const data = result.data;
//         SetPageStatus(page_status.success);
//         setEventData(data);
//       } else {
//         SetPageStatus(page_status.wrong);
//       }
//     }
//     getEvent();
//   }, []);
//   useEffect(() => {
//     if (EventData?.participants) {
//       setParticipants(EventData.participants);
//     }
//   }, [EventData]);
//   const {eventId, eventName, hostName, passCode, eventDate, participantNumber} =
//     EventData || {};

//   // const confirmRef = useRef(null);

//   const expected_money = participants.length * 200;

//   const admins = participants.filter((participant: IParticipant, i: number) => {
//     return participant.isAdmin === true;
//   });
//   let collected = participants.filter(
//     (participant: IParticipant, i: number) => {
//       return participant.paid === true;
//     }
//   );
//   //Mapping Participants
//   const ParticipantsList = participants.map((data, index) => {
//     return (
//       <Participant
//         eventName={data.eventName}
//         participantId={data.participantId}
//         eventId={data.eventId}
//         setPaid={setPaid}
//         participantName={data.participantName}
//         index={index}
//         paid={data.paid}
//         key={uuid.v4()}
//         isAdmin={data.isAdmin}
//       />
//     );
//   });
//   switch (pageStatus) {
//     case page_status.success:
//       return (
//         <div
//           className='List'
//           onClick={(evt) => {
//             // console.log(evt.target);
//             setConfirmSubmit(false);
//           }}
//         >
//           {success ? (
//             <div
//               className='List__success'
//               onClick={() => {
//                 if (setNewStatus) {
//                   setNewStatus(login_status.default);
//                   history.push('/');
//                 }
//               }}
//             >
//               <div>Successfully Submitted!</div>
//             </div>
//           ) : (
//             ''
//           )}
//           <h1>Welcome {hostName} !</h1>

//           <div className='List__container'>
//             <div className='List__info'>
//               <p>Participants : {participants.length}</p>
//               <p>Admins : {admins.length}</p>
//             </div>
//             <div className='List__List'>{ParticipantsList}</div>

//             <div className='List__money'>
//               <div className='left'>
//                 <p>Shall Recieve:</p>
//                 <p>${expected_money}</p>
//               </div>
//               <div className='right'>
//                 <p>Collected :</p>
//                 <p>${collected.length * 200}</p>
//               </div>
//             </div>
//           </div>

//           <div className='List__buttons'>
//             {/* <button className='text'>Generate text</button> */}
//             <button
//               // ref={confirmRef}
//               className={confirmSubmit ? 'confirm' : 'submit'}
//               onClick={(evt) => {
//                 evt.stopPropagation();
//                 // console.log(evt.target);
//                 // console.log(evt.target);
//                 const now = new Date();
//                 const eventDate = new Date(EventData.eventDate);
//                 if (
//                   status == login_status.host &&
//                   (now.getMonth() !== eventDate.getMonth() ||
//                     now.getDate() !== eventDate.getDate() ||
//                     now.getHours() > 22)
//                 ) {
//                   //TODO create a better method
//                   alert('不能編輯了唷已超過時間');
//                 } else {
//                   setConfirmSubmit(true);
//                 }

//                 if (confirmSubmit == true) {
//                   const result = request.upDatePaid(EventData, participants);
//                   if (result) {
//                     setSuccess(true);
//                   }
//                 }
//               }}
//             >
//               {confirmSubmit ? 'Confirm' : 'Submit'}
//             </button>
//           </div>
//         </div>
//       );
//     case page_status.wrong:
//       return <div>You may enter the wrong Passcode or HostName</div>;
//     default:
//       return <div>Please Wait</div>;
//   }
// }
// // -----------------Participants Card---------------------------
// function Participant({
//   participantId,
//   participantName,
//   eventId,
//   isAdmin,
//   index,
//   paid,
//   eventName,
//   setPaid,
// }: participant) {
//   return (
//     <div className={`List__member ${index % 2 === 0 ? 'darkgrey' : 'grey'}`}>
//       <h2>{participantName}</h2>
//       {paid ? (
//         <div>
//           <input
//             type='checkbox'
//             checked
//             onChange={() => {
//               setPaid(index);
//             }}
//           ></input>
//           <label>Paid</label>
//         </div>
//       ) : (
//         <div>
//           <input
//             type='checkbox'
//             onChange={() => {
//               setPaid(index);
//             }}
//           ></input>
//           <label>Unpaid</label>
//         </div>
//       )}
//     </div>
//   );
// }
// export default HostView;
