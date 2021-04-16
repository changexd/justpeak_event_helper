export default {}
// import React, {useState} from 'react';
// import {IPassCode} from '../../models/models';
// interface IHostContext {
//   hostInfo: IPassCode;
//   setHostInfo?: (newHostInfo: IPassCode) => void;
// }
// interface IHostContextProp {
//   children: React.ReactNode;
// }
// export const HostContext = React.createContext({} as IHostContext);

// export function HostProvider({children}: IHostContextProp) {
//   const [hostInfo, setHostInfo] = useState<IPassCode>({HostName: '', Code: ''});
//   function setNewHost(newHostInfo: IPassCode) {
//     setHostInfo(newHostInfo);
//   }
//   return (
//     <HostContext.Provider
//       value={{hostInfo: hostInfo, setHostInfo: setHostInfo}}
//     >
//       {children}
//     </HostContext.Provider>
//   );
// }
