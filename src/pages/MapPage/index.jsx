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
    iconSize: [56, 72],
    iconAnchor: [26, 72],
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
                <TileLayer
                    url={
                        "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />
                <MyMarkersList markers={markers} />
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