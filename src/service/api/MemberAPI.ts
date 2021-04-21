import { ICreateMember, IMemberAPI } from '../../shared/models/MemberInterfaces';
import { AxiosHandler } from '../utilities/AxiosHandler';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/member`
  : `${process.env.REACT_APP_PRODHOST}/member`;

export const MemberAPI:IMemberAPI = {
  CheckMember: (MemberId:string) => {
    const result = AxiosHandler('GET', `${url}/CheckMember?MemberId=${MemberId}`, true).then((data) => data);
    return result;
  },
  LoginMember: (MemberId:string, Email:string) => {
    return AxiosHandler('GET', `${url}/LoginMember?MemberId=${MemberId}&Email=${Email}`, true);
  },
  CreateMember: (item:ICreateMember) => {
    return AxiosHandler('POST', `${url}/CreateMember`, item, false);
  },
  GetMember: (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}`, true);
  },
  GetHistoryEventParticipant: (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}/history/participant`, true);
  },
  GetHistoryEventHost: (MemberId:string) => {
    return AxiosHandler('GET', `${url}/${MemberId}/history/`, true);
  }
};
