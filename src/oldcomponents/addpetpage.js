import React from "react";
import "./addpetpage.css";
import { useNavigate } from "react-router-dom";

const AddPetPage = () => {
    const navigate = useNavigate();
    return (
        <div className="addpetcover">
             <img className="addphoto" src={require('./resources/addpet.png')} alt="img1"></img>
            
            <div className="ownerfields">
                <div>
                    <text>Ime:</text>
                    <input type="text"></input>
                 </div>
                 <div>
                    <text>Opis:</text>
                    <input type="text"></input>
                 </div>
                 <div>
                    <text>Lokacija:</text>
                    <input type="text"></input>
                 </div>
                 <div>
                    <text>Napomena:</text>
                    <input type="text"></input>
                 </div>
             </div>
           
           
           
            <div className="add-btn" onClick={() => navigate("/ownermenu")}>Dodaj ljubimca</div>
            
            
        </div>
    );
}

export default AddPetPage;