import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
const Signin = () => {
  return (
    <div className="authBackground h-screen w-full flex justify-center items-center">
      <div className="w-max flex flex-col items-center">
        <span className="text-5xl text-white font-semibold text-center">
          Unlimited movies, TV shows to binge.
        </span>
        <span className="text-3xl text-white font-thin mt-2 text-center">
          Ready to binge, SignIn and start
        </span>
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Email"
          />
          <input
            type="password"
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Password"
          />
        </div>
        <button className="h-12 bg-proj-red rounded-xl text-lg h-max text-white px-10 mt-5">
          Sign In
        </button>
        <span className="text-xl text-white font-semibold text-center mt-2">
          OR
        </span>
        <div className="w-max mt-2">
          <GoogleLoginButton
            onClick={() => alert("Hello")}
            text="Sign in with Google"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
