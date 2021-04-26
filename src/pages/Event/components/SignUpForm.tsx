import { useState, useEffect } from 'react';
import { EventAPI } from '../../../service/api/EventAPI';
import { useForm } from '../../../shared/hooks/useForm';
import { ISignUpEvent } from '../../../shared/models/EventInterfaces';
import { IStatus } from '../../../shared/models/MemberInterfaces';

export default function SignUpForm({
  status, EventId, setConfirmForm, formType, EventDate, currentDate
}
  :{status:IStatus, EventId:string, setConfirmForm:React.Dispatch<boolean>, formType:string,
    EventDate:Date, currentDate:Date}) {
  const [myStatus, setMyStatus] = useForm<ISignUpEvent>({} as ISignUpEvent);
  const [agree, setAgree] = useState(false);
  useEffect(() => {
    EventAPI.GetMyStatus<ISignUpEvent>(EventId, status.MemberId).then((response) => {
      const data = response.data;
      if (data) {
        Object.keys(data).forEach((key) => { setMyStatus(key, data[key]); });
      } else {
        setMyStatus('EventId', EventId);
        setMyStatus('MemberId', status.MemberId);
      }
    });
  }, []);
  // console.log(myStatus);
  return (
    <form
      className="SignUpForm"
      onSubmit={(evt) => {
        const deadline = new Date(EventDate);
        deadline.setHours(12, 0, 0);
        evt.preventDefault();
        if (agree) {
          if (currentDate > deadline && formType === 'cancel') {
            setMyStatus('PaidMethod', 'Cancel');
            setMyStatus('PaidAccount', 'Cancel');
            setMyStatus('IsComing', false);
            setMyStatus('IsCancel', true);
          } else if (formType === 'cancel') {
            setMyStatus('IsComing', false);
          } else if (formType === 'signUp' && myStatus.IsComing === false) { setMyStatus('IsComing', true); }
          EventAPI.SignUpEvent(myStatus).then(() => {
            setConfirmForm(true);
          });
        }
      }}
    >
      <div className="FormContainer">
        {formType === 'signUp'
          ? (
            <div className="FormSelection">
              <p>I want to pay by:</p>
              <span>
                <input
                  checked={myStatus.PaidMethod === 'CASH'}
                  name="PaidMethod"
                  type="radio"
                  value="CASH"
                  onChange={(evt) => {
                    setMyStatus(evt.target.name, evt.target.value);
                    setMyStatus('PaidAccount', null);
                  }}
                />
                <label>Pay by cash to host</label>
              </span>
              <span>
                <input
                  checked={myStatus.PaidMethod === 'TRANSFER'}
                  name="PaidMethod"
                  type="radio"
                  value="TRANSFER"
                  onChange={(evt) => {
                    setMyStatus(evt.target.name, evt.target.value);
                    setMyStatus('PaidAccount', '');
                  }}
                />
                <label>Pay by money transfer</label>
                {myStatus.PaidMethod === 'TRANSFER'
                  ? <input name="PaidAccount" value={myStatus.PaidAccount} onChange={(evt) => setMyStatus(evt.target.name, evt.target.value)} /> : ''}
              </span>
            </div>
          )
          : '' }
        <p>
          {formType === 'signUp'
            ? `Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old. Richard McClintock, a
            Latin professor at Hampden-Sydney College in Virginia, looked up
            one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem
            Ipsum comes from sections 1.10.32 and 1.10.33 of &#34 de Finibopular
            during the Renaissance. The first line of Lorem Ipsum, &#34Lorem
            ipsum dolor sit amet..&#34,in a piece of classical Latin literature
            from 45 BC, making it over`
            : `Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old. Richard McClintock, a
            Latin professor at Hampden-Sydney College in Virginia, looked up
            one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem
            Ipsum comes from sections 1.10.32 and 1.10.33 of &#34 de Finibopular
            during the Renaissance. The first line of Lorem Ipsum, &#34Lorem
            ipsum dolor sit amet..&#34,in a piece of classical Latin literature
            from 45 BC, making it over`}
        </p>
        <span>
          <input type="checkbox" onClick={() => { setAgree(!agree); }} />
          <label>I Agree, and will follow the rules</label>
        </span>
        <button type="submit" disabled={!agree}>
          {formType === 'signUp'
            ? myStatus.IsComing === true
              ? 'Change Method' : 'SignUp'
            : 'Cancel'}
        </button>
      </div>
    </form>
  );
}
