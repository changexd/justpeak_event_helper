import React from 'react';
import SignUpLogo from './Assets/SignUpLogo.png';
import Logo from './Assets/Logo.png';
export default function Header(props: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      {props.title === 'SignUp' ? (
        <div className='Header'>
          <div className='Header__SignUpLogo'>
            <img src={SignUpLogo} width='100%'></img>
          </div>
        </div>
      ) : (
        <div className='Header'>
          <div className='Header__NavContainer'>
            <div className='Header__Nav'>
              <div className='bar'> </div>
              <div className='bar'> </div>
              <div className='bar'> </div>
            </div>
          </div>
          <div className='Header__Logo'>
            <img src={Logo} width='100%'></img>
            <p>{props.title}</p>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
}
