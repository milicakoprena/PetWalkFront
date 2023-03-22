import React, { useState } from "react";

import { MapContainer, TileLayer } from "react-leaflet";

import { useRef } from "react";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            
        </>
    );
};

export default MapPage;