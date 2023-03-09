import React from "react";
import "./adminmenu.css";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div className="adminmenucover">
            <div className="adminoptions">
                <div className="petwalkdiv">
                    <img className="petwalklogo" src={require('./resources/logo.png')}></img>
                    <text className="petwalklogotext">Opcije za administratora:</text>
                </div>
                <div className="adminoptionslist">
                <div>
                    <img src={require('./resources/user.png')}></img>
                    <text>Pregled vlasnika</text>
                </div>
                <div>
                    <img src={require('./resources/dog-training.png')}></img>
                    <text>Pregled čuvara</text>
                </div>
                <div>
                    <img src={require('./resources/caution.png')}></img>
                    <text>Pregled prijavljenih problema</text>
                </div>
                
                <div>
                    <img src={require('./resources/writing.png')}></img>
                    <text>Pregled izvještaja</text>
                </div>
                <div>
                    <img src={require('./resources/review.png')}></img>
                    <text>Pregled recenzija</text>
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
            <div className="adminprofile">
                <img src={require('./resources/pets.png')}></img>
                 
            </div>
            
            
        </div>
    );
}

export default AdminMenu;