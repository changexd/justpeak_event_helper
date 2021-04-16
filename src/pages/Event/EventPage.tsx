import { useParams } from 'react-router-dom';

export default function EventPage() {
  const { EventId } = useParams<{EventId: string}>();
  // TODO Logic here use custom hook to change info
  const Signup = false;
  const confirmSignup = false;
  console.log(EventId);
  return (
    <div className="EventPage">
      {Signup ? (
        confirmSignup ? (
          <span className="SignUpForm">
            <div className="FormContainer">
              <p>Successfully Signed Up!</p>
              <p>Check out event page for Room Password!</p>
            </div>
          </span>
        ) : (
          <form className="SignUpForm">
            <div className="FormContainer">
              <div className="FormSelection">
                <p>I want to pay by:</p>
                <span>
                  <input type="checkbox" />
                  <label>Pay by cash to host</label>
                </span>
                <span>
                  <input type="checkbox" />
                  <label>Pay by money transfer</label>
                </span>
              </div>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of &#34 de Finibopular
                during the Renaissance. The first line of Lorem Ipsum, &#34Lorem
                ipsum dolor sit amet..&#34,in a piece of classical Latin literature
                from 45 BC, making it over
              </p>
              <span>
                <input type="checkbox" />
                <label>I Agree, and will follow the rules</label>
              </span>
              <button type="submit">SignUp</button>
            </div>
          </form>
        )
      ) : (
        ''
      )}
      <div className="Date">Apr.10 (fri)</div>
      <div className="EventName">How to make people happy</div>
      <div className="HostName">Host : Johnson</div>
      <div className="EventInfo">
        {' '}
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of &#34de Finibopular during the Renaissance. The first line of Lorem
        Ipsum,&#34Lorem ipsum dolor sit amet..&#34,in a piece of classical Latin
        literature from 45 BC, making it over 2000 years old. Richapsum used
        since the 1500s is reproduced below for those interested. Sections 1.10
        .32 and 1.10.33 from &#34de Finibus Bonorum et Malorum&#34 by Cicero are also
        reproduced in their exact original form,nterested. Sections 1.10 .32 and
        1.10.33 from &#34de Finibus Bonorum et Malorum&#34 by Cicero are also
        reproduced in their exact original form, accompanied by English versions
        from the 1914 translation by H. Rackham.
      </div>
      <div className="Participants">Participants</div>
      <div className="ParticiapntsCheck" />
      <div>
        <button className="SignUp" type="button"> SignUp</button>
      </div>
    </div>
  );
}
