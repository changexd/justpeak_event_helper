import React, { useState } from 'react';
import { EventAPI } from '../../../service/api/EventAPI';
import { IStatus } from '../../../shared/models/MemberInterfaces';
import { IPayment } from '../../../shared/models/ParticipantInterfaces';
import { usePaymentState } from './hook';

export default function HostForm({
  EventId, setConfirmForm, EventDate, currentDate, PaymentStatus
}
  :{status:IStatus, EventId:string, setConfirmForm:React.Dispatch<boolean>,
    EventDate:Date, currentDate:Date, PaymentStatus:IPayment[]}) {
  const { PaymentList, updatePayment } = usePaymentState(PaymentStatus);

  const [agree, setAgree] = useState(false);
  const deadline = new Date(EventDate);
  deadline.setHours(21, 40, 0);
  const PaymentDisplay = PaymentList.map((payment, index) => {
    return (
      <PaymentItem
        key={index}
        Payment={payment}
        updatePayment={updatePayment}
        index={index}
      />
    );
  });
  return (
    <form
      className="SignUpForm"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (agree) {
          EventAPI.UpdatePaymentStatus({ EventId: EventId, PaymentList: PaymentList })
            .then((res) => {
              if (res.status === 200) {
                setConfirmForm(true);
              }
            });
        }
      }}
    >
      <div className="FormContainer">
        <div className="ParticipantList">
          <div className="ParticipantTable">
            <div className="ParticipantName"><p>Name</p></div>
            <div className="Paid">
              <p>Paid</p>
            </div>
            <div className="MethodAndMoney">
              <p>$</p>
            </div>
            <div className="Note">
              <p>Note</p>
            </div>
          </div>
          <div className="ParticipantListContainer">
            {PaymentDisplay}
          </div>
        </div>
        <div className="CheckBoxAndButton">
          <div>
            <input type="checkbox" onChange={() => setAgree(!agree)} />
            <label> I have Checked All the Payment </label>
          </div>

          {
        deadline < currentDate ? <p>You cannot edit Form anymore</p> : <button type="submit" disabled={!agree}> Submit</button>
      }
        </div>

      </div>

    </form>
  );
}
function PaymentItem({ Payment, updatePayment, index } : {Payment:IPayment, updatePayment:(index:number, note?:string)=>void, index:number}) {
  const [nameFb, setNameFb] = useState(false);
  const [note, setNote] = useState(Payment.PaidNote == null ? '' : Payment.PaidNote);
  console.log(Payment);
  return (
    <div className="ParticipantItem">
      <div className="ParticipantName">{nameFb ? <p>{Payment.NameEng}</p> : <p onClick={() => setNameFb(!nameFb)}>{Payment.NameFb}</p>}</div>
      <div className="Paid">
        <div><input type="checkbox" checked={Payment.Paid} onChange={() => updatePayment(index)} />
          <label>{Payment.Paid ? 'Paid' : 'Unpaid'}</label>
        </div>
      </div>
      <div className="MethodAndMoney">
        <div>
          <p>{Payment.PaidMethod}</p>
          {Payment.PaidMethod === 'Cash' ? <p>{Payment.PaidAccount}</p> : ''}
          <p>{Payment.PaidMoney}</p>
        </div>
      </div>
      <div className="Note">
        <input type="text" value={note} onChange={(evt) => { setNote(evt.target.value); updatePayment(index, evt.target.value); }} />
      </div>
    </div>
  );
}
