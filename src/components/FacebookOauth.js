import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { useState, useCallback } from 'react';
import axios, { AxiosHeaders } from 'axios';

function FacebookOauth() {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)
  const REDIRECT_URI = window.location.href;

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

  function callLoginApi(response) {
    axios.post("http://localhost:9191/users/oAuthLogin",
      {
        "email": response?.data?.email,
        "name": response?.data?.name,
        "provider" : response?.provider
      },
      {
        headers: AxiosHeaders,
      }
    ).then(res => {
      console.log("RESPONSE DATA", res);
    }).catch(e => {
      console.log(e.message);
    });
  }

  return (
    <>
      <LoginSocialFacebook
        appId="507876574863261"
        onLoginStart={onLoginStart}
        onResolve={(response) => {
          setProvider(response.provider)
          setProfile(response.data)
          callLoginApi(response)
          console.log(response.data, response.provider);
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
      {/* <button onClick={authWithFb}>Login with Facebook</button> */}
    </>
  )
}

export default FacebookOauth;