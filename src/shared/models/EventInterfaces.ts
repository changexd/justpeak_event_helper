import { AxiosResponse } from 'axios';
import { IParticipantLanding, IPayment } from './ParticipantInterfaces';

export interface IEventAPI {
  GetThisWeek:<T = any>(arg: string)=>Promise<AxiosResponse<T>>;
  GetEventInfo:<T = any>(arg:string, FBId:string)=>Promise<AxiosResponse<T>>;
  GetEvents:<T = any>(arg:number)=>Promise<AxiosResponse<Array<T>>>;
  GetMyStatus:<T = any>(arg1:string, arg2:string)=>Promise<AxiosResponse<T>>
  SignUpEvent:<T = any>(arg:ISignUpEvent)=>Promise<AxiosResponse<T>>;
  UpdatePaymentStatus:<T = any>(arg:IUpdatePaymentStatus)=>Promise<AxiosResponse<T>>;

}
export interface IEventBase {
  EventId:string,
  EventName:string,
  Week:number,
  EventDate:Date,
}
export interface ISignUpEvent{
  [key:string]:any,
  MemberId:string,
  IsComing:boolean,
  IsCancel:boolean,
  EventId:number,
  PaidMethod:string,
  PaidAccount?:string

}
export interface IEventInfo extends IEventBase{
  HostId:string,
  HostName:string,
  EventInfo:string,
  ParticipantNumberExpected :number,
  IsCancel:boolean,
  ParticipantNumberLimit:number,
  ParticipantNumber:number,
  EventLocation:string,
  EventTags: Array<IEventTag>,
  Participants:Array<IParticipantLanding>,
  PaymentStatus:Array<IPayment>,
}

export interface IEventTag {
  EventTagEng:string,
  EventTagZht:string,
}
export interface IEventListItem extends IEventBase {
  path:string;
  NowDate:Date;
  IsCancel:boolean;
  EventTags: Array<IEventTag>;
  HostName:string
}
export interface IEventThisWeek extends IEventBase {
  EventInfo:string,
  EventTags: Array<IEventTag>,
  HostName:string
}
export interface IUpdatePaymentStatus{
  EventId:string,
  PaymentList:Array<IPayment>;
}
