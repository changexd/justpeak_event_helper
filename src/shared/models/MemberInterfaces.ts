import { AxiosResponse } from 'axios';

export interface IStatus {
  Email:string,
  NameEng:string,
  MemberId:string,
  IsAdmin:boolean,
}
export interface IMemberAPI {
  CheckMember:<T = any>(args: string)=>Promise<AxiosResponse<T>>;
  LoginMember:<T = any>(id: string, email: string)=>Promise<AxiosResponse<T>>;
  CreateMember:<T = any>(item:ICreateMember)=>Promise<AxiosResponse<T>>;
  GetMember:<T = any>(id:string)=>Promise<AxiosResponse<T>>;
  GetHistoryEventParticipant:<T = any>(id:string)=>Promise<AxiosResponse<T>>;
  GetHistoryEventHost:<T = any>(id:string)=>Promise<AxiosResponse<T>>;

}

export interface ICreateMember {
  Email:string;
  MemberId:string;
  NameFb:string;
  NameEng:string;
  NameZht:string;
}
