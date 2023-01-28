import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

function SignInButton() {
  const clientId =
    '83524287758-isrd4si0no52vckn2j77mr7j4026p1i6.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign-In"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
}

export default SignInButton;
