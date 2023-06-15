import React from 'react';
import  { useState, useEffect } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks'
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import {  Layout, Modal } from 'antd';
import MainMenu from "../../components/MainMenu";
import { useMapEvents } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { ROLE_ADMIN } from "../../util.js/constants";
import axios from 'axios';
import { Page, StyledInput, Desc } from '../../components/CssComponents';

const { Content, Sider } = Layout;

const customMarker = new L.icon({
    iconUrl: require('../resources/location-pin.png'),
    iconSize: [40, 40],
    iconAnchor: [20, 50],
}); 

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
    const [isModalOpen, setIsModalOpen] = useState('');
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [putanja, setPutanja] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const userState = useLocation();

    const showModal = () => {
        setIsModalOpen(true);
      }
      
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const [markers, setMarkers] = useState([]);

     

    function MyComponent() {
        const map = useMapEvents({
          click: (e) => {
            if(userState.state.user.role == ROLE_ADMIN) {
                const { lat, lng } = e.latlng;
                setX(lat);
                setY(lng);
                console.log(x,y);
                showModal();
            }
            
          }
        });
        return null;
      }

      useEffect( () => {
        axios.get(`http://localhost:9000/mape`, {
          headers: {
            Authorization: `Bearer ${userState.state.user.token}`,
          },
        })
        .then((res) => {
            let temp = [];
            for(let i = 0; i < res.data.length; i++)
            {
              temp.push({
                position: [res.data.at(i).koordinataX, res.data.at(i).koordinataY],
                name: res.data.at(i).nazivObjekta,
                description: <Desc>{res.data.at(i).opisObjekta}<a href={res.data.at(i).putanja}>Link do veb stranice</a></Desc>,
              })
            }
               
            console.log("temp",temp);
            setMarkers(temp);
          
        })
        .catch((e) => console.log(e));
      }, [markers]);
    

      const addLocation = async () => {
        try {
            let mapaRequest={
                koordinataX: x,
                koordinataY: y,
                nazivObjekta: naziv,
                opisObjekta: opis,
                putanja: putanja,
            };
            const response = await fetch('http://localhost:9000/mape', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userState.state.user.token}`,
              },
              body: JSON.stringify(mapaRequest),
            })
            .catch((e) => console.log(e));
            
            setIsModalOpen(false);
          }
          catch (error) {
            console.log(error);
            
          }
      };

    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
                style={{
                    maxHeight: '103vh'
                }}>
                <MainMenu/>
            </Sider>
            <Content style={{ maxHeight: '103vh' }}>
                <Page>
                    <MapContainer center={[44.772182, 17.191000]} zoom={15} style={{ height: "100%", width: "100%"}} 
                        >
                        {markers.map(marker => (
                            <Marker position={marker.position} icon={customMarker} >
                                <Popup>
                                    <h2>{marker.name}</h2>
                                    <p>{marker.description}</p>
                                </Popup>
                            </Marker>
                        ))}
                        <TileLayer
                            url={
                                "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                        />
                        <LeafletgeoSearch/>
                        <MyComponent />
                    </MapContainer>
                    <Modal 
                          title="Dodaj lokaciju" 
                          open={isModalOpen} 
                          onOk={addLocation} 
                          onCancel={handleCancel} 
                          okText="Potvrdi"
                          cancelText="Otkaži"
                        >
                          <p>Unesite naziv lokacije</p>
                          <StyledInput 
                            value={naziv}
                            onChange={(e) => setNaziv(e.target.value)} />  
                          <p>Unesite opis lokacije</p>
                          <StyledInput 
                            value={opis}
                            onChange={(e) => setOpis(e.target.value)} />
                          <p>Unesite putanju do web sajta</p>
                          <StyledInput 
                            value={putanja}
                            onChange={(e) => setPutanja(e.target.value)} />                       
                        </Modal>
                </Page>
            </Content>
        </Layout>   
    ); 
};

export default MapPage;