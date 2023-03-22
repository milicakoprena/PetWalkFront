import React from "react";
import "./signuppage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    return (
        <div className="signupcover">
            <div>
                <input type="text" placeholder="Unesi ime i prezime:"></input>
                <img src={require('./resources/user.png')} alt="img1"></img>
            </div>
            <div>
                <input type="text" placeholder="Unesi korisničko ime:"></input>
                <img src={require('./resources/mail.png')} alt="img2"></img>
            </div>
            <div>
                <input type="text" placeholder="Unesi email adresu:"></input>
                <img src={require('./resources/arroba.png')} alt="img5"></img>
            </div>
            <div>
                <input type="password" placeholder="Unesi lozinku:"></input>
                <img src={require('./resources/padlock.png')} alt="img3"></img>
            </div>
            <div>
                <input type="text" placeholder="Unesi broj telefona:"></input>
                <img src={require('./resources/phone.png')} alt="img4"></img>
            </div>
            
            <div className="signup-btn" onClick={() => navigate("/choicepage")}>Registruj se</div>
            
        </div>
    );
}

export default SignUpPage;