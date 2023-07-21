import React from "react";
import "./index.css";

export default function RegistrationPage({ goToMaps }) {
  const [show, setShow] = React.useState(false);
  const [phNo, setPhNo] = React.useState("");
  const [otp,setOTP] = React.useState("")
  function login() {
    const pattern =  /^\d+$/;
    // alert(pattern.test(phNo))
    if (phNo.length < 10 || !pattern.test(phNo)) {
      alert("Please enter valid phone number");
      return;
    }
    setShow(true)
    setTimeout(()=>{
        setOTP(1234)
    },3000)
  }
  return (
    <>
      <div className="reg-wrapper">
        <img src="https://www.trackexpress.com/img/logo.png" alt="" />
        <div className="form-wrapper">
          {!show ? (
            <>
              <span className="phno">+91 </span>
              <input
                className="input"
                maxlength="10"
                onChange={(e) => setPhNo(e.target.value)}
                value={phNo}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
             <span>{otp.length < 1 ?"Getting OTP..." :"Got OTP"}</span>
              <input className="otp-input" value={otp} maxlength="4" />
              <button onClick={() => setShow(goToMaps)}>Let's Go</button>
            </div>
          )}
        </div>
        {!show && <button onClick={login}>Login</button>}
      </div>
    </>
  );
}
