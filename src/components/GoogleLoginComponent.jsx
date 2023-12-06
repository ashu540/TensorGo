import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    axios.post('http://localhost:3001/auth/google/callback', { tokenId: response.tokenId })
      .then((res) => {
        console.log(res.data);
        // Redirect or handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
