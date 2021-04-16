import React, { useState } from 'react';

interface IAuthProp {
  auth: boolean | null;
  setAuth: React.Dispatch<React.SetStateAction<null | boolean>>;
}
interface IAuthContextProp {
  children: React.ReactNode;
}

export const AuthContext = React.createContext({} as IAuthProp);

export function AuthProvider({ children }: IAuthContextProp) {
  const [auth, setAuth] = useState<null | boolean>(null);
  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
