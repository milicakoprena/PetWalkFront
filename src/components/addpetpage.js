import React from "react";
import "./addpetpage.css";

const AddPetPage = () => {
    return (
        <div className="addpetcover">
            <img className="addphoto" src={require('./resources/addpet.png')} alt="img1"></img>
            <div className="petname">
                <text>Ime:</text>
                <input type="text"></input>
            </div>
            <div className="description">
                <text>Opis:</text>
                <input type="text"></input>
            </div>
            <div className="location">
                <text>Lokacija:</text>
                <input type="text"></input>
            </div>
            <div className="note">
                <text>Napomena(opciono):</text>
                <input type="text"></input>
            </div>

            <div className="add-btn">Dodaj ljubimca</div>
        </div>
    );
}

export default AddPetPage;