import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../firebase";
import { signInUser } from "../../app/auth";
import { Navigate } from "react-router-dom";
const Signup = () => {
  const [authValues, setAuthValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword } = authValues;
  const handlechange = (name) => (event) => {
    setAuthValues({ ...authValues, [name]: event.target.value });
  };
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
  const validEmail = (emailId) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailId.toLowerCase());
  };

  const emailSignup = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return notify("Include all fields");
    }
    if (!validEmail(email)) {
      return notify("Enter the valid email address");
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              signInUser({
                email: userAuth.user.email,
                name: userAuth.user.displayName,
                userId: userAuth.user.uid,
              })
            );
            setRedirect(true);
          });
      })
      .catch((err) => {
        notify("Something went wrong !");
      });
  };

  return (
    <div className="authBackground h-screen w-full flex justify-center items-center">
      {redirect && <Navigate to="/" />}
      <div className="w-max flex flex-col items-center">
        <span className="text-5xl text-white font-semibold text-center">
          Unlimited movies, TV shows to binge.
        </span>
        <span className="text-3xl text-white font-thin mt-2 text-center">
          Ready to binge, SignUp and start
        </span>
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            onChange={handlechange("name")}
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Name"
            value={name}
          />
          <input
            type="email"
            onChange={handlechange("email")}
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Email"
            value={email}
          />
          <input
            type="password"
            onChange={handlechange("password")}
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Password"
            value={password}
          />{" "}
          <input
            type="password"
            onChange={handlechange("confirmPassword")}
            className="mt-5 h-10 w-2/4 rounded-md focus:outline-none p-2"
            placeholder="Confirm Password"
            value={confirmPassword}
          />
        </div>
        <span className="text-lg text-white font-thin text-center mt-2">
          Already User?{" "}
          <span className="font-semibold">
            <Link to="/signin">Sign in</Link>
          </span>
        </span>
        <button
          className="h-12 bg-proj-red rounded-xl text-lg h-max text-white px-10 mt-5"
          onClick={emailSignup}
        >
          Sign Up
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
