interface IParticipantBase{
  MemberId :string,
  IsComing :boolean,
  IsCancel:boolean
}

export interface IParticipantLanding extends IParticipantBase{
  ParticipantName :string
}
export interface IPayment extends IParticipantBase {
  EventId:number,
  PaidMethod:string,
  PaidNote:string,
  PaidAccount:string,
  Paid:boolean
  PaidMoney:number
}
