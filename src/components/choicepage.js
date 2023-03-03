import React from "react";
import "./choicepage.css";
import { useNavigate } from "react-router-dom";

const ChoicePage = () => {
    const navigate = useNavigate();
    return (
        <div className="choicecover">
            <img className="owner-btn" src={require('./resources/owner.png')} alt="myimage" onClick={() => navigate("/addpetpage")} />
            <div className="text1">VLASNIK</div>
            <img className="walker-btn" src={require('./resources/walker.png')} alt="myimage1" onClick={() => navigate("/addwalkerpage")} />
            <div className="text2">ČUVAR</div>
        </div>
    );
}

export default ChoicePage;