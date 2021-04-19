import { AxiosResponse } from 'axios';
import { AxiosHandler } from '../utilities/AxiosHandler';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/member`
  : `${process.env.REACT_APP_PRODHOST}/member`;

interface IMemberAPI {
  CheckMember:(args: string)=>Promise<AxiosResponse<any>>;
  LoginMember:(id: string, email: string)=>Promise<AxiosResponse<any>>;
  CreateMember:(item:ICreateMember)=>Promise<AxiosResponse<any>>;
  GetMember:(id:string)=>Promise<AxiosResponse<any>>;
  GetHistoryEventParticipant:(id:string)=>Promise<AxiosResponse<any>>;
  GetHistoryEventHost:(id:string)=>Promise<AxiosResponse<any>>;

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
    return AxiosHandler('GET', `${url}/CheckMember?MemberId=${MemberId}`, true);
  },
  LoginMember: async (MemberId:string, Email:string) => {
    return AxiosHandler('GET', `${url}/LoginMember?MemberId=${MemberId}&Email=${Email}`, true);
  },
  CreateMember: async (item:ICreateMember) => {
    return AxiosHandler('POST', `${url}/CreateMember`, item, false);
  },
  GetMember: async (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}`, true);
  },
  GetHistoryEventParticipant: async (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}/history/participant`, true);
  },
  GetHistoryEventHost: async (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}/history/`, true);
  }
};
