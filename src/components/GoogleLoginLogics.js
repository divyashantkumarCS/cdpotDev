import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function GoogleLoginLogics() {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)
  const REDIRECT_URI = window.location.href;

  const onLoginStart = useCallback(() => {
      alert('login start')
    }, []);
  
    const onLogoutSuccess = useCallback(() => {
      setProfile(null)
      setProvider('')
      alert('logout success')
    }, [])

    // function getUserData() {
    //   const url = '';
    //   const header = new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded',
        
    //   })
    //   const accessTOken =  profile?.access_token; 

    //   axios.get(url, header).then(res=> {
    //     console.log()
    //   })
    // }

    // useEffect(() => {
    //   getUserData();
    // }, [profile])

  return (
    <LoginSocialGoogle
            client_id="19327883413-h3c4402pt1g3can56igtoeivlj3422kn.apps.googleusercontent.com"
            scope='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
            onLoginStart={onLoginStart}
            onResolve={(response) => {
              setProvider(response.provider)
              setProfile(response.data)
              // console.log(response.data, response.provider);
              console.log(response);
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GoogleLoginButton />
        </LoginSocialGoogle>
  )
}

export default GoogleLoginLogics;



// function GoogleLoginLogics() {

//     const YOUR_CLIENT_ID = "19327883413-h3c4402pt1g3can56igtoeivlj3422kn.apps.googleusercontent.com";
//     const YOUR_REDIRECT_URI = "https://localhost:3000";
//     const fragmentString = window.location.hash.substring(1);
  
//     // Parse query string to see if page request is coming from OAuth 2.0 server.
//     let params = {};
//     let regex = /([^&=]+)=([^&]*)/g, m;
  
    
//     while (m === regex.exec(fragmentString)) {
//       params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
//     }


//     if (Object.keys(params).length > 0) {
//       localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
//       if (params['state'] && params['state'] === 'try_sample_request') {
//         trySampleRequest();
//       }
//     }
  
//     // If there's an access token, try an API request.
//     // Otherwise, start OAuth 2.0 flow.
//     function trySampleRequest() {
//       const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
//       if (params && params['access_token']) {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'https://www.googleapis.com/drive/v3/about?fields=user&' + 'access_token=' + params['access_token']);

//         xhr.onreadystatechange = function (e) {
//           if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log(xhr.response);
//           } else if (xhr.readyState === 4 && xhr.status === 401) {
//             // Token invalid, so prompt for user permission.
//             oauth2SignIn();
//           }
//         };

//         xhr.send(null);
//       } else {
//         oauth2SignIn();
//       }
//     }
  
//     /*
//      * Create form to request access token from Google's OAuth 2.0 server.
//      */
//     function oauth2SignIn() {
//       // Google's OAuth 2.0 endpoint for requesting an access token
//       const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
//       // Create element to open OAuth 2.0 endpoint in new window.
//       const form = document.createElement('form');
//       form.setAttribute('method', 'GET'); // Send as a GET request.
//       form.setAttribute('action', oauth2Endpoint);
//       form.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  
//       // Parameters to pass to OAuth 2.0 endpoint.
//       const params = {'client_id': YOUR_CLIENT_ID,
//                     'redirect_uri': YOUR_REDIRECT_URI,
//                     'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
//                     'state': 'try_sample_request',
//                     'include_granted_scopes': 'true',
//                     'response_type': 'token'
//                 };
  
//       // Add form parameters as hidden input values.
//       for (const p in params) {
//         const input = document.createElement('input');
//         input.setAttribute('type', 'hidden');
//         input.setAttribute('name', p);
//         input.setAttribute('value', params[p]);
//         form.appendChild(input);
//       }
  
//       // Add form to page and submit it to open the OAuth 2.0 endpoint.
//       document.body.appendChild(form);
//       form.submit();
//     }
  
//     return (
//         <div>
//             <button onClick={trySampleRequest}>Login with google</button>
//         </div>
//     )
// }

// export default GoogleLoginLogics;