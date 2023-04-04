import React, { Fragment } from 'react';
import  { useState, useEffect } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks'
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
import {  Layout } from 'antd';
import MainMenu from "../../components/MainMenu";

const { Content, Sider } = Layout;

export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(224,223,223,255);  
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const customMarker = new L.icon({
    iconUrl: require('../resources/location-pin.png'),
    iconSize: [40, 52],
    iconAnchor: [20, 50],
}); 

const MyPopupMarker = ({ content, position }) => (
    <Marker position={position} icon={customMarker} >
      <Popup>{content}</Popup>
    </Marker>
)

const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
        <MyPopupMarker key={key} {...props} />
    ))
    return <Fragment>{items}</Fragment>
}


const markers = [
]





function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
  
      const searchControl = new GeoSearchControl({
        provider,
        marker: {
            icon: customMarker,
        }
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, [map]);
  
    return null;
  }

const MapPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const locations = [
        { position: [44.76656719765876, 17.20447089815072], name: "BL Vet", description: "https://bl-vet.com/" },
        { position: [44.77359478646836, 17.17559528263551], name: "Vet Centar", description: "https://vetcentar.com/" },
        { position: [44.79688441138837, 17.139584155649985], name: "VET Company", description: "Veterinarska ordinacija" },
        { position: [44.76902856745142, 17.185328467292994], name: "Frizerski salon za pse Nola", description: "https://sisanje-pasa-banja-luka-frizerski-salon-za-pse-nola.business.site/?utm_source=gmb&utm_medium=referral" },
        { position: [44.75984639714031, 17.196088413320002], name: "Frizko", description: "Salon za šišanje pasa" },
        { position: [44.776937561235734, 17.201737467293214], name: "Tea's grooming corner", description: "Šišanje pasa" },
        { position: [44.77141564544468, 17.196543509621797], name: "Kadar", description: "Pet friendly kafe bar" },
        { position: [44.76883961689355, 17.188300111471023], name: "Pet shop Draganić", description: "Prodavnica kućnih ljubimaca" }
    
    
      ];
        return (
            <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                    minHeight: '100vh',
                    minWidth: ''
                    }}>
                <MainMenu></MainMenu>
            </Sider>
            <Layout className="site-layout">
                <Content>
                <Page>
                <Cover>
                <MapContainer center={[44.772182, 17.191000]} zoom={15} style={{ height: "100%", width: "100%"}} >
                {locations.map(location => (
                        <Marker position={location.position} icon={customMarker} >
                        <Popup>
                            <h2>{location.name}</h2>
                            <p>{location.description}</p>
                        </Popup>
                        </Marker>
                    ))}
                <TileLayer
                    url={
                        "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />
              <MyMarkersList markers={markers}
               
               />
               
                <LeafletgeoSearch/>
            </MapContainer>
                </Cover>
            </Page>
                </Content>
            </Layout>
        </Layout>
            
            
        ); 
};

export default MapPage;