export default {}
// import {useContext, useEffect, useState} from 'react';
// import {StatusContext} from '../../shared/contexts/statusContext';
// import {request} from '../shared/request';
// import {IEvent} from '../models/models';
// import {Link} from 'react-router-dom';
// import * as uuid from 'uuid';

// interface IAdminEvent extends IEvent {
//   index: number;
// }

// function Event({
//   week,
//   eventId,
//   index,
//   eventName,
//   hostName,
//   passCode,
//   participantNumber,
// }: IAdminEvent) {
//   return (
//     <tr className={`Admin__event ${index % 2 === 0 ? 'darkgrey' : 'grey'}`}>
//       <td className='week'>
//         <Link to={`/host/${hostName}/${passCode}`}>{week}</Link>
//       </td>
//       <td className='topic'>
//         <Link to={`/host/${hostName}/${passCode}`}>{eventName}</Link>
//       </td>
//       <td className='people'>
//         <Link to={`/host/${hostName}/${passCode}`}>{participantNumber}</Link>
//       </td>
//     </tr>
//   );
// }

// function AdminView() {
//   const {status, userName, setNewStatus, setUserName} = useContext(
//     StatusContext
//   );
//   const [eventList, setEventList] = useState<Array<IEvent> | []>([]);
//   useEffect(() => {
//     async function getEventList() {
//       const result = await request.adminGetAllEvent();
//       const eventList = result.data;
//       if (result.status == 200) {
//         setEventList(eventList);
//       } else {
//         console.log(result);
//       }
//     }

//     getEventList();
//   }, []);
//   const eventListView = eventList
//     .sort((a: IEvent, b: IEvent) => {
//       return b.week - a.week;
//     })
//     .map((event: IEvent, index: number) => {
//       return (
//         <Event
//           key={uuid.v4()}
//           passCode={event.passCode}
//           eventDate={event.eventDate}
//           hostName={event.hostName}
//           index={index}
//           eventId={event.eventId}
//           week={event.week}
//           eventName={event.eventName}
//           participantNumber={event.participantNumber}
//         />
//       );
//     });
//   return (
//     <div className='Admin'>
//       <h1>Welcome {userName} !</h1>

//       <div className='Admin__container'>
//         <div className='Admin__info'>
//           <p>Total Events : {eventList.length} </p>
//           <p>Total Participants :</p>
//         </div>
//         <table className='Admin__EventList'>
//           <tbody>
//             <tr className='Admin__event'>
//               <th className='week'>week</th>
//               <th className='topic'>Topic</th>
//               <th className='people'>People </th>
//             </tr>
//             {eventListView}
//           </tbody>
//         </table>
//       </div>

//       <div className='Admin__buttons'>
//         {/* <button className='text'>Generate text</button> */}
//         <button
//         // ref={confirmRef}
//         >
//           Return
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminView;
