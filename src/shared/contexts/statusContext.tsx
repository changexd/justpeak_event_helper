export default {}
// import React, {useState} from 'react';
// import {login_status} from '../../models/models';
// interface IStatusContext {
//   status: login_status;
//   setNewStatus: (value: login_status) => void;
//   userName: string;
//   setUserName: (value: string) => void;
// }
// interface IStatusContextProp {
//   children: React.ReactNode;
// }
// export const StatusContext = React.createContext({} as IStatusContext);
// export function StatusProvider({children}: IStatusContextProp) {
//   const [currentStatus, setCurrentStatus] = useState(login_status.default);
//   const [userName, setUserName] = useState('');
//   function setNewStatus(status: login_status) {
//     setCurrentStatus(status);
//   }
//   return (
//     <StatusContext.Provider
//       value={{
//         status: currentStatus,
//         userName: userName,
//         setNewStatus: setNewStatus,
//         setUserName: setUserName,
//       }}
//     >
//       {children}
//     </StatusContext.Provider>
//   );
// }
