import { AxiosHandler } from '../utilities/AxiosHandler';
import {
  IEventAPI, ISignUpEvent, IUpdatePaymentStatus
} from '../../shared/models/EventInterfaces';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/event`
  : `${process.env.REACT_APP_PRODHOST}/event`;

export const EventAPI:IEventAPI = {
  GetMyStatus: async (EventId:string, MemberId:string) => {
    return AxiosHandler('GET', `${url}/GetMyStatus?EventId=${EventId}&MemberId=${MemberId}`, false);
  },
  GetThisWeek: async (date:string) => {
    return AxiosHandler('GET', `${url}/GetThisWeek/${date}`, false);
  },
  GetEventInfo: async (EventId:string, FBId:string) => {
    return AxiosHandler('GET', `${url}/${EventId}?FBId=${FBId}`, true);
  },
  GetEvents: async (page:number) => {
    return AxiosHandler('GET', `${url}/GetEvents?page=${page}`, true);
  },
  SignUpEvent: async (item:ISignUpEvent) => {
    return AxiosHandler('POST', `${url}/SignUpEvent`, item, true);
  },
  UpdatePaymentStatus: async (item:IUpdatePaymentStatus) => {
    return AxiosHandler('PUT', `${url}/UpdatePaymentStatus`, item, true);
  }
};
