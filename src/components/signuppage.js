import React from "react";
import "./signuppage.css";

const SignUpPage = () => {
    return (
        <div className="signupcover">
            <div className="signupname">
                <input type="text" placeholder="Unesi ime i prezime:"></input>
                <img src={require('./resources/user.png')}></img>
            </div>
            <div className="signupusername">
                <input type="text" placeholder="Unesi korisničko ime:"></input>
                <img src={require('./resources/mail.png')}></img>
            </div>
            <div className="signuppassword">
                <input type="password" placeholder="Unesi lozinku:"></input>
                <img src={require('./resources/padlock.png')}></img>
            </div>
            <div className="signupnumber">
                <input type="text" placeholder="Unesi broj telefona:"></input>
                <img src={require('./resources/phone.png')}></img>
            </div>
            
            <div className="signup-btn">Registruj se</div>
            
        </div>
    );
}

export default SignUpPage;