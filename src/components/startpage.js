import React from "react";
import "./startpage.css";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <div className="cover">
            <img className="logostart" src={require('./resources/logo.png')} />
            <p>
            <button className="start-to-login-btn" onClick={() => navigate("/loginpage")}>Prijavi se</button>
            </p>
            <p>
            <button className="start-to-signup-btn" onClick={() => navigate("/signuppage")}>Nemaš nalog? Registruj se ovdje!</button>
            </p>
            
        </div>
    );
}

export default StartPage;