import React from "react";
import "./addwalkerpage.css";

const AddWalkerPage = () => {
    return (
        <div className="addwalkercover">
            <img className="addprofilephoto" src={require('./resources/addprofilephoto.png')} alt="img1"></img>
            <div className="ownerdescription">
                <text>Opis:</text>
                <input type="text"></input>
            </div>
            <div className="ownerlocation">
                <text>Lokacija:</text>
                <input type="text"></input>
            </div>
            <div className="price">
                <text>Cijena:</text>
                <input type="text"></input>
            </div>

            <div className="save-btn">Sačuvaj</div>
        </div>
    );
}

export default AddWalkerPage;