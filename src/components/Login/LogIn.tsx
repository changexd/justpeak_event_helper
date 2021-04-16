import {Dispatch, SetStateAction, useState, useContext, useEffect} from 'react';
// import {StatusContext} from '../../shared/contexts/statusContext';
import {AuthContext} from '../../shared/contexts/authContext';
// import {HostContext} from '../../shared/contexts/hostContext';
import FacebookLogin from 'react-facebook-login';
// import {request} from '../shared/request';
import {FB_Login} from '../../service/api/FB_Login';
// import {IEvent, login_status} from '../models/models';
import {Link} from 'react-router-dom';
import {useForm} from '../hooks/useForm';

function RegisterForm({setAuth}: any) {
  //type memberInfo
  const [memberInfo, SetMemberInfo] = useForm({});
  useEffect(() => {
    FB.api(
      '/me',
      'get',
      {fields: 'id,name,email,link'},
      //TODO check if database has this info
      async function (response: any) {
        const {id, name, email, link} = response;
        SetMemberInfo('Email', email);
        SetMemberInfo('MemberId', id);
        SetMemberInfo('FbLink', link);
        SetMemberInfo('NameFb', name);

        //if result is goood set auth
        // Insert your code here
      }
    );
  }, []);

  return (
    <form
      className='Register'
      onSubmit={async (evt) => {
        evt.preventDefault();
        const result = await FB_Login.CreateMember(memberInfo);
        if (result.status === 200) {
          setAuth(true);
        }
        //send data to backend and if success set auth
      }}
    >
      <div className='Register__Form'>
        <div>
          <label htmlFor='Email'>Email</label>
          <input id='Email' defaultValue={memberInfo.Email}></input>
        </div>
        <div>
          <label htmlFor='NameEng'>English Name</label>
          <input
            id='NameEng'
            onChange={(evt) => {
              SetMemberInfo(evt.target.id, evt.target.value);
              console.log(memberInfo);
            }}
          ></input>{' '}
        </div>
        <div>
          <label htmlFor='NameZht'> Chinese Name</label>
          <input
            id='NameZht'
            onChange={(evt) => {
              SetMemberInfo(evt.target.id, evt.target.value);
              console.log(memberInfo);
            }}
          ></input>
        </div>
      </div>
      <button type='submit'>Register</button>
    </form>
  );
}
function LogIn() {
  // const {status, userName, setUserName, setNewStatus} = useContext(
  //   StatusContext
  // );
  const {setAuth} = useContext(AuthContext);
  // const {hostInfo, setHostInfo} = useContext(HostContext);
  // const {CreateMember, CheckMember} = FB_Login;

  const [showRegister, setShowRegister] = useState(false);

  //TODO add useEffect to check Login at first
  // console.log(status);
  // const [passcode, setPassCode] = useState('');
  // const [hostName, setHostName] = useState('');
  // const [adminWarning, setAdminWarning] = useState(false);
  // parse XFBML to the page

  return (
    <div className='Login'>
      {showRegister ? <RegisterForm setAuth={setAuth} /> : ''}
      <div className='Login__EventThisWeek'>
        <h3>Event This Week</h3>
        <h3>Apr.10 (Fri)</h3>
        <h2>Title</h2>
        <h2>HostName</h2>
      </div>
      <div className='Login__LoginWithFB'>
        <FacebookLogin
          appId='2218447721622502'
          autoLoad={true}
          callback={() => {
            console.log('');
          }}
        />
      </div>
      <div className='Login__CheckUsOut'>
        <button>F</button>
        <p>Check Us Out On Facebook</p>
      </div>
    </div>
    // <div
    //   className='Landing'
    //   // onClick={async () => {
    //   //   const result = await CheckMember({id: '334578'});
    //   //   if (result.status !== 200) {
    //   //     console.log('register function');
    //   //   }
    //   // }}
    // >
    //   <div className='Landing__form'>
    //     <h1>
    //       {status == login_status.admin
    //         ? '口說團 管理員助手 v1'
    //         : '口說團 活動助手 v1'}
    //     </h1> */}

    //   </div>
    // </div>
  );
}

export default LogIn;
