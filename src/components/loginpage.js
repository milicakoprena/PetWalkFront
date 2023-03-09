import React from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="logincover">
            <img className="loginlogo" src={require('./resources/logo.png')} />
            <div className="loginusername">
                <input type="text" placeholder="Unesi korisničko ime:"></input>
                <img src={require('./resources/mail.png')} className="mail"></img>
            </div>
            <div className="loginpassword">
                <input type="password" placeholder="Unesi lozinku:"></input>
                <img src={require('./resources/padlock.png')} className="lock"></img>
            </div>
           
            <div className="login-btn" onClick={() => navigate("/adminmenu")}>Prijavi se</div>
            
        </div>
    );
}

export default LoginPage;