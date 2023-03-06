import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ContextFun";
import "./register.scss";
function Register() {
    let [switchForms, setSwitchForms] = useState(1);
    let navigate = useNavigate()
  // ========================== Sign in handles ===================
    let {signinValue, setSigninValue} = useContext(Context)
  let handleChangeSignin = (e) => {
    setSigninValue({ ...signinValue, [e.target.name]: e.target.value });
  };
  let handleSubmitSignin = (e) => {
      e.preventDefault();
      // If singin user is registerd -> Sign in -> navigate("/todo")
      navigate("/todo")
  };
  // =============================== sign up handles =================
  let {signupValue, setSignupValue} = useContext(Context)
  let handleChangeSignup = (e) => {
    setSignupValue({ ...signupValue, [e.target.name]: e.target.value });
  };
  let handleSubmitSignup = (e) => {
      e.preventDefault();
      // Backend---------------------------- Submit the user object to DB
      setSigninValue({...signinValue,email:signupValue.email,password:signupValue.password})
      setSwitchForms(1)
  };
  return (
    <div className="register">
      <div className="registerContainer">
        {/* =================================== Sign in ============== */}
        {switchForms === 1 && (
          <form onChange={handleChangeSignin} onSubmit={handleSubmitSignin}>
            <h1>Sign in</h1>
            <input
              type="email"
              name="email"
              id=""
              value={signinValue.email}
              placeholder="Please enter your E-Mail..."
            />
            <input
              type="password"
              name="password"
              value={signinValue.password}
              id=""
              placeholder="Please enter your Password..."
            />
            <button>Sign in</button>
            <h5 onClick={() => setSwitchForms(2)}>Don't have an account</h5>
          </form>
        )}
        {/* ================================ Sign up ======================== */}
        {switchForms === 2 && (
          <form onChange={handleChangeSignup} onSubmit={handleSubmitSignup}>
            <h1>Sign up</h1>

            <input
              type="email"
              name="email"
              id=""
              value={signupValue.email}
              placeholder="Please enter your E-Mail..."
            />
            <input
              type="text"
              name="username"
              id=""
              value={signupValue.username}
              placeholder="Please enter your Username..."
            />
            <input
              type="password"
              name="password"
              id=""
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
