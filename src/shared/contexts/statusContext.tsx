import React from 'react';
import { IStatus } from '../models/MemberInterfaces';

interface IStatusContext{
  status:IStatus,
  setStatus: React.Dispatch<React.SetStateAction<IStatus>>;
}

export const StatusContext = React.createContext({} as IStatusContext);
export function StatusProvider({ children }:{children: React.ReactNode}) {
  const [status, setStatus] = React.useState<IStatus>({} as IStatus);
  return (
    <StatusContext.Provider value={{ status: status, setStatus: setStatus }}>
      {children}
    </StatusContext.Provider>
  );
}
