import axios, { AxiosResponse } from 'axios';
import { AxiosHandler } from '../utilities/AxiosHandler';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/member`
  : `${process.env.REACT_APP_PRODHOST}/member`;

interface IMemberAPI {
  CheckMember:(args: string)=>Promise<AxiosResponse<any>>;
  LoginMember:(id: string, email: string)=>Promise<AxiosResponse<any>>;
  CreateMember:<T>(item:T)=>Promise<AxiosResponse<any>>;
  GetMember:(id:string)=>Promise<AxiosResponse<any>>;
  GetHistoryEvent_Participant:(id:string)=>Promise<AxiosResponse<any>>;
  GetHistoryEvent_Host:(id:string)=>Promise<AxiosResponse<any>>;

}

interface ICreateMember {
  Email:string;
  MemberId:string;
  NameFb:string;
  NameEng:string;
  NameZht:string;
}
export const MemberAPI:IMemberAPI = {
  CheckMember: async (MemberId:string) => {
    return await AxiosHandler('GET', `${url}/CheckMember?MemberId=${MemberId}`, true);
  },
  LoginMember: async (MemberId:string, Email:string) => {
    return await AxiosHandler('GET', `${url}/LoginMember?MemberId=${MemberId}&Email=${Email}`, true);
  },
  CreateMember: async <ICreateMember>(item:ICreateMember) => {
    return await AxiosHandler('POST', `${url}/CreateMember`, item, false);
  },
  GetMember: async (MemberId:string) => {
    return await AxiosHandler('GET', `${url}/${MemberId}`, true);
  },
  GetHistoryEvent_Participant: async (MemberId:string) => {
    return await AxiosHandler('GET', `${url}/${MemberId}/history/participant`, true);
  },
  GetHistoryEvent_Host: async (MemberId:string) => {
    return await AxiosHandler('GET', `${url}/${MemberId}/history/`, true);
  }
};
