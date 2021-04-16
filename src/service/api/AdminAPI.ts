import { AxiosResponse } from 'axios';
import { AxiosHandler } from '../utilities/AxiosHandler';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/admin`
  : `${process.env.REACT_APP_PRODHOST}/admin`;

export interface INewEvent{
  EventName: string;
  HostId: string;
  EventDate:string;
  ParticipantNumberLimit:number;
  Week:number;
  EventInfo:string;
  PassCode?: string;
  EventLocation?:string;
}

export interface IEditEvent{
  EventName: string;
  EventId:string
  EventDate:string;
  Week:number;
  EventInfo:string;
  PassCode?: string;
  EventLocation?:string;
}
interface IAdminAPI {
  CreateEvent:<T>(arg:T)=>Promise<AxiosResponse<any>>;
  DeleteEvent:(arg:number)=>Promise<AxiosResponse<any>>;
  CancelEvent:(arg:number)=>Promise<AxiosResponse<any>>;
  EditEvent:<T>(arg:T)=>Promise<AxiosResponse<any>>;
  FindMember:(arg:string)=>Promise<AxiosResponse<any>>;
  GetMembers:(arg:number)=>Promise<AxiosResponse<any>>;
}
const AdminAPI :IAdminAPI = {
  CreateEvent: async <INewEvent>(item:INewEvent) => {
    return await AxiosHandler('POST', `${url}/CreateEvent`, item, true);
  },
  DeleteEvent: async (EventId:number) => {
    return await AxiosHandler('DELETE', `${url}/DeleteEvent?EventId=${EventId}`, true);
  },
  CancelEvent: async (EventId:number) => {
    return await AxiosHandler('POST', `${url}/CancelEvent?EventId=${EventId}`, true);
  },
  EditEvent: async <IEditEvent>(item:IEditEvent) => {
    return await AxiosHandler('POST', `${url}/EditEvent`, item, true);
  },
  FindMember: async (MemberName:string) => {
    return await AxiosHandler('POST', `${url}/FindMember?MemberName=${MemberName}`, true);
  },
  GetMembers: async (page:number) => {
    return await AxiosHandler('GET', `${url}/GetMembers=${page}`, true);
  }
};
