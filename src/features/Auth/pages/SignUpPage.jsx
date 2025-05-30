import React from "react";

const SignUpPage = () => {
  return (
    <main className="min-h-screen flex flex-col  items-center py-24">
      <h1 className="text-xl font-semibold mb-40">Hi, Welcome Back! 👋</h1>
      <GoogleRegister
        onSuccess={(res) => console.log("Success", res)}
        onError={() => console.log("Login Failed")}
      />
      <p className="mt-24 flex justify-end items-end text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Sign up
        </a>
      </p>
    </main>
  );
};

export default SignUpPage;
