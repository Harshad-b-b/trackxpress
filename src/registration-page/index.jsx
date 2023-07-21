import React from "react";
import "./index.css"

export default function RegistrationPage({goToMaps}) {
    const [show,setShow] = React.useState(false)
    return(
        <>
        <div className="reg-wrapper">
        <img src="https://www.trackexpress.com/img/logo.png" alt="" />
        <div className="form-wrapper">
        
       {!show ?<>
        <span className="phno">+91  </span>
        <input className="input" maxlength="10"/>
       </>:
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
   <span>Getting OTP...</span>
       <input className="otp-input" maxlength="4"/>
       <button onClick={()=>setShow(goToMaps)}>Let's Go</button>
           </div>}
        </div>
        {!show && <button onClick={()=>setShow(!show)}>Login</button>}
        </div>
        </>
    )
}