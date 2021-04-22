import { AxiosHandler } from '../utilities/AxiosHandler';
import {
  IEventAPI, IEventInfo, IEventListItem, IEventThisWeek, ISignUpEvent, IUpdatePaymentStatus
} from '../../shared/models/EventInterfaces';

const url = process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/event`
  : `${process.env.REACT_APP_PRODHOST}/event`;

export const EventAPI:IEventAPI = {
  GetThisWeek: async (date:string) => {
    return AxiosHandler<IEventThisWeek>('GET', `${url}/GetThisWeek/${date}`, false);
  },
  GetEventInfo: async (EventId:string, FBId:string) => {
    return AxiosHandler<IEventInfo>('GET', `${url}/${EventId}?FBId=${FBId}`, true);
  },
  GetEvents: async (page:number) => {
    return AxiosHandler<Array<IEventListItem>>('GET', `${url}/GetEvents?page=${page}`, true);
  },
  SignUpEvent: async (item:ISignUpEvent) => {
    return AxiosHandler('POST', `${url}/SignUpEvent`, item, true);
  },
  UpdatePaymentStatus: async (item:IUpdatePaymentStatus) => {
    return AxiosHandler('POST', `${url}/UpdatePaymentStatus`, item, true);
  }
};
