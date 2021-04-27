import React, { useMemo } from 'react';
import { IStatus } from '../models/MemberInterfaces';

interface IStatusContext{
  status:IStatus,
  setStatus: React.Dispatch<React.SetStateAction<IStatus>>;
}

export const StatusContext = React.createContext({} as IStatusContext);
export function StatusProvider({ children }:{children: React.ReactNode}) {
  const [status, setStatus] = React.useState<IStatus>({} as IStatus);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const value = useMemo(() => { return { status, setStatus }; }, [status.Email]);
  console.log(status);

  return (
    <StatusContext.Provider value={value}>
      {children}
    </StatusContext.Provider>
  );
}
