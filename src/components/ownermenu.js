import React from "react";
import "./ownermenu.css";
import { useNavigate } from "react-router-dom";

const OwnerMenu = () => {
    return (
        <div className="ownermenucover">
            <div className="owneroptions">
                <div className="petwalkdiv">
                    <img className="petwalklogo" src={require('./resources/logo.png')}></img>
                    <text className="petwalklogotext">Opcije za vlasnike:</text>
                </div>
                <div className="owneroptionslist">
                <div>
                    <img src={require('./resources/editprofile.png')}></img>
                    <text>Uredi profil</text>
                </div>
                <div>
                    <img src={require('./resources/dog-training.png')}></img>
                    <text>Pregled liste čuvara</text>
                </div>
                <div>
                    <img src={require('./resources/caution.png')}></img>
                    <text>Prijava problema</text>
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
            <div className="ownerprofile">
                <img src={require('./resources/pets.png')}></img>
                 
            </div>
            
            
        </div>
    );
}

export default OwnerMenu;