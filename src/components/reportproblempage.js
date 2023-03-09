import React from "react";
import "./reportproblempage.css";
import { useNavigate } from "react-router-dom";

const ReportProblemPage = () => {
    const navigate = useNavigate();
    return (
        <div className="walkermenucover">
            <div className="walkeroptions">
                <div className="petwalkdiv">
                    <img className="petwalklogo" src={require('./resources/logo.png')} alt="img1"></img>
                    <text className="petwalklogotext">Opcije za čuvare:</text>
                </div>
                <div className="walkeroptionslist">
                <div>
                    <img src={require('./resources/editprofile.png')} alt="img2"></img>
                    <text>Uredi profil</text>
                </div>
                <div onClick={() => navigate("/petlistpage")}>
                    <img src={require('./resources/track.png')} alt="img3"></img>
                    <text>Pregled ljubimaca</text>
                </div>
                <div onClick={() => navigate("/reportproblempage")}>
                    <img src={require('./resources/caution.png')} alt="img4"></img>
                    <text>Prijava problema</text>
                </div>
                <div>
                    <img src={require('./resources/writing.png')} alt="img5"></img>
                    <text>Izvještaj</text>
                </div>
                <div>
                    <img src={require('./resources/review.png')} alt="img6"></img>
                    <text>Recenzije</text>
                </div>
                <div>
                    <img src={require('./resources/board.png')} alt="img7"></img>
                    <text>Oglasi</text>
                </div>
                <div>
                    <img src={require('./resources/placeholder.png')} alt="img8"></img>
                    <text>Pregled mape</text>
                </div>
                </div>
            </div>
            <div className="walkerprofile">
                <text>Opis problema:</text>
                <input type="text"></input>
                <div className="prijavi-btn">Prijavi</div>
            </div>
            
            
        </div>
    );
}

export default ReportProblemPage;