import React from "react";
import "./walkermenu.css";
import { useNavigate } from "react-router-dom";

const WalkerMenu = () => {
    return (
        <div className="walkermenucover">
            <div className="walkeroptions">
                <div className="petwalkdiv">
                    <img className="petwalklogo" src={require('./resources/logo.png')}></img>
                    <text className="petwalklogotext">Opcije za čuvare:</text>
                </div>
                <div className="walkeroptionslist">
                <div>
                    <img src={require('./resources/editprofile.png')}></img>
                    <text>Uredi profil</text>
                </div>
                <div>
                    <img src={require('./resources/track.png')}></img>
                    <text>Pregled ljubimaca</text>
                </div>
                <div>
                    <img src={require('./resources/caution.png')}></img>
                    <text>Prijava problema</text>
                </div>
                <div>
                    <img src={require('./resources/writing.png')}></img>
                    <text>Izvještaj</text>
                </div>
                <div>
                    <img src={require('./resources/review.png')}></img>
                    <text>Recenzije</text>
                </div>
                <div>
                    <img src={require('./resources/board.png')}></img>
                    <text>Oglasi</text>
                </div>
                <div>
                    <img src={require('./resources/placeholder.png')}></img>
                    <text>Pregled mape</text>
                </div>
                </div>
            </div>
            <div className="walkerprofile">
                <img src={require('./resources/pets.png')}></img>
                 
            </div>
            
            
        </div>
    );
}

export default WalkerMenu;