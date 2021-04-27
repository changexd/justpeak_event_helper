import { useState } from 'react';
import { IPayment } from '../../../shared/models/ParticipantInterfaces';

export function usePaymentState(initial: Array<IPayment>) {
  const [PaymentList, setPaymentList] = useState(initial);
  function updatePayment(index:number):void;
  function updatePayment(index:number, note:string):void;
  function updatePayment(index:number, note?:string) {
    if (note) {
      const temp = PaymentList;
      temp[index].PaidNote = note;
      setPaymentList([...temp]);
    } else {
      const temp = PaymentList;
      temp[index].Paid = !temp[index].Paid;
      setPaymentList([...temp]);
    }
  }

  return { PaymentList, updatePayment };
}
