import React, { useEffect, useState } from 'react';

const clientId = "669320546967-oki9a76uh05294if4f6h5u4ri0o8snrm.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/tasks"; // လိုအပ်တဲ့ scope ကို သတ်မှတ်ပါ

function GetAccessToken() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGoogleClient = () => {
      window.google?.accounts?.oauth2?.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (tokenResponse) => {
          if (tokenResponse?.access_token) {
            console.log("Access Token ရရှိပါပြီ:", tokenResponse.access_token);
            setAccessToken(tokenResponse.access_token);
          } else {
            console.error("Access Token ရယူရာတွင် အမှားအယွင်း:", tokenResponse);
            setError(tokenResponse);
          }
        },
      });
    };
    initializeGoogleClient()
    const requestAccessToken = () => {
      window.google?.accounts?.oauth2?.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (tokenResponse) => {
          if (tokenResponse?.access_token) {
            console.log("Access Token ရရှိပါပြီ:", tokenResponse.access_token);
            setAccessToken(tokenResponse.access_token);
          } else {
            console.error("Access Token ရယူရာတွင် အမှားအယွင်း:", tokenResponse);
            setError(tokenResponse);
          }
        },
      }).requestAccessToken();
    };

    const loadGapi = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = requestAccessToken;
        document.body.appendChild(script);
      } else {
        requestAccessToken();
      }
    };

    loadGapi();
  }, []);

  if (error) {
    return <div>Access Token ရယူရာတွင် အမှားအယွင်း- {error.error}</div>;
  }

  return (
    <div>
      {accessToken ? (
        <p>Access Token: {accessToken.substring(0, 20)}...</p>
      ) : (
        <p>Access Token ကို တောင်းဆိုနေသည်...</p>
      )}
      {/* ဒီနေရာမှာ Access Token ကို သုံးပြီး API ခေါ်ဆိုမှုတွေ လုပ်ဆောင်နိုင်ပါတယ် */}
    </div>
  );
}

export default GetAccessToken;