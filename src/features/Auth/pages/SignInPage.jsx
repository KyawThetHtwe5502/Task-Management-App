import React, {  useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../../assets/google.svg"
import { Navigate, useNavigate } from "react-router-dom";
const SignInPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/tasks",
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        console.log(accessToken)
            localStorage.setItem("google_access_token", accessToken);
const expiresIn = 3600 * 100; 
const expiresAt = Date.now() + expiresIn;
localStorage.setItem("google_access_token_expires_at", expiresAt);

       navigate("/todo")
      } catch (err) {
        setError(err.message);
      }
    },
    onError: (err) => {
      setError("Login failed");
      console.error("Login Error", err);
    },
  });
    const token = localStorage.getItem("google_access_token");
    
if(token){
  Navigate("/todo")
}

  return (
    <main className="min-h-screen flex flex-col  items-center py-24">
      <h1 className="text-xl font-semibold mb-40">Hi, Welcome Back! 👋</h1>
      
         <button
           onClick={() => login()}
           className="w-80 h-12 border border-[#E5E7EB] bg-[#F9FAFB] rounded-md inline-flex  items-center gap-8 p-4"
         >
          <img src={google} alt="google" className="size-7 " />
           Sign in with Google
         </button>
      {error && (
       <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
      )}
    </main>
  );
};

export default SignInPage;
