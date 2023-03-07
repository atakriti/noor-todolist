import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ContextFun";
import "./register.scss";

import axios from "axios";

function Register({ setUserId }) {
  let [switchForms, setSwitchForms] = useState(1);
  let navigate = useNavigate();

  // ========================== Sign in handles ===================
  let { setUser } = useContext(Context);
  const [signinValue, setSigninValue] = useState({
    email: "",
    password: "",
  });
  let handleChangeSignin = (e) => {
    setSigninValue({ ...signinValue, [e.target.name]: e.target.value });
  };
  let handleSubmitSignin = (e) => {
    e.preventDefault();
    // If singin user is registerd -> Sign in -> navigate("/todo")

    const fd = new FormData();
    for (let key in signinValue) {
      fd.append(key, signinValue[key]);
    }

    fd.append("route", "login");

    axios.post("/", fd).then(({ data }) => {
      if (data) {
        setUserId(data);
        setUser(data); // set to localstorage
        navigate("/todo");
      } else {
        alert("username or password is error");
        setSigninValue({
          email: "",
          password: "",
        });
      }
    });

    // navigate("/todo");
  };

  // =============================== sign up handles =================
  let { signupValue, setSignupValue } = useContext(Context);
  let handleChangeSignup = (e) => {
    setSignupValue({ ...signupValue, [e.target.name]: e.target.value });
  };

  let handleSubmitSignup = (e) => {
    e.preventDefault();
    // Backend---------------------------- Submit the user object to DB
    let formData = new FormData();
    for (let key in signupValue) {
      formData.append(key, signupValue[key]);
    }

    formData.append("route", "signup");

    axios
      .post("/", formData)
      .then(({ data }) => {
        if (data === true) {
          setSwitchForms(1);
          setSigninValue({ ...signinValue, ...signupValue });
        } else {
          alert("this Email alrady used");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="register">
      <div className="registerContainer">
        {/* =================================== Sign in ============== */}
        {switchForms === 1 && (
          <form onSubmit={handleSubmitSignin}>
            <h1>Sign in</h1>
            <input
              name="email"
              onChange={handleChangeSignin}
              value={signinValue.email}
              placeholder="Please enter your E-Mail..."
            />
            <input
              type="password"
              name="password"
              onChange={handleChangeSignin}
              value={signinValue.password}
              placeholder="Please enter your Password..."
            />
            <button type="submit">Sign in</button>
            <h5 onClick={() => setSwitchForms(2)}>Don't have an account</h5>
          </form>
        )}
        {/* ================================ Sign up ======================== */}
        {switchForms === 2 && (
          <form onSubmit={handleSubmitSignup}>
            <h1>Sign up</h1>

            <input
              name="email"
              onChange={handleChangeSignup}
              value={signupValue.email}
              placeholder="Please enter your E-Mail..."
            />

            <input
              type="text"
              name="username"
              onChange={handleChangeSignup}
              value={signupValue.username}
              placeholder="Please enter your Username..."
            />

            <input
              type="password"
              name="password"
              onChange={handleChangeSignup}
              value={signupValue.password}
              placeholder="Please enter your Password..."
            />

            <button>Sign up</button>
            <h5 onClick={() => setSwitchForms(1)}>Already have an account</h5>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
