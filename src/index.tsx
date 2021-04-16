import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './shared/contexts/authContext';

function FBinit() {
  return new Promise((resolve) => {
    (window as any).fbAsyncInit = function () {
      window.FB.init({
        appId: '2218447721622502',
        cookie: true,
        xfbml: true,
        version: 'v10.0',
      });

      window.FB.AppEvents.logPageView();
      resolve(undefined);
    };

    (function (d, s, id) {
      const js: any = d.createElement(s);
      const fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}
FBinit().then(startApp);

function startApp() {
  ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        {/* <StatusProvider> */}
        <App />
        {/* </StatusProvider> */}
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
//  in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
