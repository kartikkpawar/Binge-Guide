import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { toast, ToastContainer } from "react-toastify";

import { signInUser } from "../../app/auth";
import { auth } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";

const Signin = () => {
  const [authValues, setAuthValues] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { email, password } = authValues;
  const handlechanges = (name) => (event) => {
    setAuthValues({ ...authValues, [name]: event.target.value });
  };
  const dispatch = useDispatch();
  const notify = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const emailSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          signInUser({
            email: userAuth.user.email,
            name: userAuth.user.displayName,
            userId: userAuth.user.uid,
          })
        );
        setRedirect(true);
      })
      .catch(() => notify("Something went wrong"));
  };
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    auth
      .signInWithPopup(googleProvider)
      .then((userAuth) => {
        dispatch(
          signInUser({
            email: userAuth.user.email,
            name: userAuth.user.displayName,
            userId: userAuth.user.uid,
          })
        );
        setRedirect(true);
      })
      .catch(() => notify("Something went wrong"));
  };
  return (
    <div className="authBackground h-screen w-full flex justify-center items-center">
      {redirect && <Navigate to="/" />}
      <div className="w-max flex flex-col items-center">
        <span className="text-5xl text-white font-semibold text-center">
          Unlimited movies, TV shows to binge.
        </span>
        <span className="text-3xl text-white font-thin mt-2 text-center">
          Ready to binge, Sign In and start
        </span>
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Email"
            onChange={handlechanges("email")}
          />
          <input
            type="password"
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Password"
            onChange={handlechanges("password")}
          />
        </div>
        <span className="text-lg text-white font-thin text-center mt-2">
          New with us?{" "}
          <span className="font-semibold">
            <Link to="/signup">Sign up</Link>
          </span>
        </span>
        <button
          className="h-12 bg-proj-red rounded-xl text-lg h-max text-white px-10 mt-5"
          onClick={emailSignIn}
        >
          Sign In
        </button>
        <span className="text-xl text-white font-semibold text-center mt-2">
          OR
        </span>
        <div className="w-max mt-2">
          <GoogleLoginButton
            onClick={googleSignIn}
            text="Sign in with Google"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
