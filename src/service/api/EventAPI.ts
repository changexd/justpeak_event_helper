import axios, {AxiosResponse} from 'axios';
import {AxiosHandler} from '../utilities/AxiosHandler';
const url =
process.env.REACT_APP_MODE == 'DEV'
  ? `${process.env.REACT_APP_DEVHOST}/event`
  : `${process.env.REACT_APP_PRODHOST}/event`;

interface IEventAPI {
  GetThisWeek:(arg: string)=>Promise<AxiosResponse<any>>;
  GetEventInfo:(arg:number,FBId:string)=>Promise<AxiosResponse<any>>;
  GetEvents:(arg:number)=>Promise<AxiosResponse<any>>;
  SignUpEvent:<T>(arg:T)=>Promise<AxiosResponse<any>>;
  UpdatePaymentStatus:<T>(arg:T)=>Promise<AxiosResponse<any>>;


}
interface ISignUpEvent{
  MemberId:string,
  IsComing:boolean,
  IsCancel:boolean,
  EventId:number,
  PaidMethod:string
}
interface IPayment{
  MemberId:string,
  IsComing:boolean,
  IsCancel:boolean,
  EventId:number,
  PaidMethod:string,
  PaidNote:string,
  PaidAccount:string,
  Paid:boolean
  PaidMoney:number
}
interface IUpdatePaymentStatus{
  EventId:number,
  ParticipantNumber:number,
  PaymentList:Array<IPayment>;
}

export const EventAPI:IEventAPI = {
  GetThisWeek:async (date:string)=>{
    return await AxiosHandler('GET',`${url}/GetThisWeek/${date}`,false)
  },
  GetEventInfo:async(EventId:number,FBId:string)=>{
    return await AxiosHandler('GET',`${url}/${EventId}?FBId=${FBId}`,true)
  },
  GetEvents:async(page:number)=>{
    return await AxiosHandler('GET',`${url}/GetEvents?page=${page}`,true)
  },
  SignUpEvent:async<ISignUpEvent>(item:ISignUpEvent)=>{
    return await AxiosHandler('POST',`${url}/SignUpEvent`,item,true)
  },
  UpdatePaymentStatus: async<IUpdatePaymentStatus>(item:IUpdatePaymentStatus)=>{
    return await AxiosHandler('POST',`${url}/UpdatePaymentStatus`,item,true)
  }
}