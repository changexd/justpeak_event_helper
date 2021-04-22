import { AxiosResponse } from 'axios';
import { IParticipantLanding, IPayment } from './ParticipantInterfaces';

export interface IEventAPI {
  GetThisWeek:(arg: string)=>Promise<AxiosResponse<any>>;
  GetEventInfo:(arg:string, FBId:string)=>Promise<AxiosResponse<any>>;
  GetEvents:(arg:number)=>Promise<AxiosResponse<any>>;
  SignUpEvent:(arg:ISignUpEvent)=>Promise<AxiosResponse<any>>;
  UpdatePaymentStatus:(arg:IUpdatePaymentStatus)=>Promise<AxiosResponse<any>>;

}
export interface IEventBase {
  EventId:number,
  EventName:string,
  Week:number,
  EventDate:Date,
}
export interface ISignUpEvent{
  MemberId:string,
  IsComing:boolean,
  IsCancel:boolean,
  EventId:number,
  PaidMethod:string
}
export interface IEventInfo extends IEventBase{
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
  EventId:number,
  ParticipantNumber:number,
  PaymentList:Array<IPayment>;
}
