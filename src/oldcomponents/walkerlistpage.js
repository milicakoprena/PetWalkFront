import React from "react";
import "./walkerlistpage.css";
import { useNavigate } from "react-router-dom";

const WalkerListPage = () => {
    const navigate = useNavigate();
    return (
        <div className="ownermenucover">
            <div className="owneroptions">
                <div className="petwalkdiv">
                    <img className="petwalklogo" src={require('./resources/logo.png')} alt="img1" ></img>
                    <text className="petwalklogotext">Opcije za vlasnike:</text>
                </div>
                <div className="owneroptionslist">
                <div>
                    <img src={require('./resources/editprofile.png')} alt="img2"></img>
                    <text>Uredi profil</text>
                </div>
                <div onClick={() => navigate("/walkerlistpage")}>
                    <img src={require('./resources/dog-training.png')} alt="img3"></img>
                    <text>Pregled liste čuvara</text>
                </div>
                <div onClick={() => navigate("/reportproblemownerpage")}>
                    <img src={require('./resources/caution.png')} alt="img4"></img>
                    <text>Prijava problema</text>
                </div>
                <div onClick={() => navigate("/reviewpage")}>
                    <img src={require('./resources/review.png')} alt="img5"></img>
                    <text>Recenzije</text>
                </div>
                <div>
                    <img src={require('./resources/board.png')} alt="img6"></img>
                    <text>Oglasi</text>
                </div>
                <div>
                    <img src={require('./resources/placeholder.png')} alt="img7"></img>
                    <text>Pregled mape</text>
                </div>
                </div>
            </div>
            <div className="ownerprofile">
                 
            </div>
            
            
        </div>
    );
}

export default WalkerListPage;