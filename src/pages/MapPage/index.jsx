import React from 'react';
import  { useState, useEffect } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks'
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
import {  Layout, Modal, Input } from 'antd';
import MainMenu from "../../components/MainMenu";
import { useMapEvents } from 'react-leaflet';

const { Content, Sider } = Layout;

export const Page = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const StyledInput = styled(Input)`
  font-size:15px;
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

export const Desc = styled.div`
    display: flex;
    flex-direction: column;
`;

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
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [collapsed, setCollapsed] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      }
      
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    

    const locations = [
        { position: [44.76656719765876, 17.20447089815072], name: "BL Vet", description: <Desc>Veterinarska ambulanta<a href="https://bl-vet.com/">Link do veb stranice</a></Desc> },
        { position: [44.77359478646836, 17.17559528263551], name: "Vet Centar", description: <Desc>Veterinarska stanica<a href="https://vetcentar.com/">Link do veb stranice</a></Desc> },
        { position: [44.79688441138837, 17.139584155649985], name: "VET Company", description: <Desc>Veterinarska ordinacija <a href="https://www.facebook.com/people/Veterinarska-ambulanta-VET-Company-Banja-Luka/100066737814835/?paipv=0&eav=AfYUo2uAvctNkYCli71fSnaJSOR3ryUWKxguRFOgfVhNMcXHi-ng3KEpVvrdvasW9lc&_rdr">Link do veb stranice</a></Desc> },
        { position: [44.76902856745142, 17.185328467292994], name: "Frizerski salon za pse Nola", description: <a href="https://sisanje-pasa-banja-luka-frizerski-salon-za-pse-nola.business.site/?utm_source=gmb&utm_medium=referral">Link do veb stranice</a> },
        { position: [44.75984639714031, 17.196088413320002], name: "Frizko", description: <Desc>Salon za šišanje pasa <a href="https://www.facebook.com/sisanjepasabanjaluka">Link do veb stranice</a></Desc> },
        { position: [44.776937561235734, 17.201737467293214], name: "Tea's grooming corner", description: <Desc>Šišanje i kupanje kućnih ljubimaca <a href="https://www.facebook.com/teasgrooming/">Link do veb stranice</a> </Desc>},
        { position: [44.77141564544468, 17.196543509621797], name: "Kadar", description: <Desc>Pet friendly kafe bar <a href="https://kadarbl.business.site/">Link do veb stranice</a></Desc> },
        { position: [44.76883961689355, 17.188300111471023], name: "Pet shop Draganić", description: <Desc>Prodavnica kućnih ljubimaca <a href="https://pet-shop-draganic.business.site/">Link do veb stranice</a></Desc> }, 
        { position: [44.77387087292766, 17.18688992496436], name: "Veterinarski institut Republike Srpske Dr Vaso Butozan", description: <a href="https://virs-vb.com/" >Link do veb stranice</a> },
        { position: [44.77700396548966, 17.189865524964468], name: "MIM Coop", description: <Desc>Veterinarska ambulanta <a href="https://veterinarskaambulanta.ba/">Link do veb stranice</a></Desc> },
        { position: [44.76766712195801, 17.185520382635364], name: "Vetmedik", description: <Desc>Veterinarska ambulanta <a href="http://www.vetmedikbl.com/">Link do veb stranice</a></Desc>},
        { position: [44.76801720927072, 17.19082561332026], name: "Veterinarska apoteka", description: "Apoteka za životinje " },
        { position: [44.79718115735773, 17.210076713321243], name: "Ljubimac", description: <Desc>Veterinarska ambulanta <a href="https://www.facebook.com/vetambljubimac/">Link do veb stranice</a></Desc> },
        { position: [44.7785031850491, 17.206783494849404], name: "Park za pse", description: "Prilagođen za pse" },
        { position: [44.780187481961605, 17.206962055649416], name: "Delta Planet", description: "Pet friendly tržni centar" },
        { position: [44.77547901423748, 17.1977062133206], name: "Grooming salon Tango", description: <Desc>Šišanje i kupanje kućnih ljubimaca <a href="https://www.groomingsalontango.com/">Link do veb stranice</a> </Desc> },
        { position: [44.774359621183855, 17.20109822738237], name: "Grooming salon Alexandar", description: <Desc>Šišanje i kupanje kućnih ljubimaca <a href="https://www.facebook.com/people/Grooming-salon-Alexandar/100070751892302/">Link do veb stranice</a> </Desc> },
        { position: [44.76267350638166, 17.19699178263525], name: "Grooming salon Snupići", description: <Desc>Šišanje i kupanje kućnih ljubimaca <a href="https://www.facebook.com/salonsnupi/">Link do veb stranice</a> </Desc> },
        { position: [44.76206726581702, 17.200276253721256], name: "VrebacVET", description: "Veterinarska ordinacija" }
    ];

    function MyComponent() {
        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            setX(lat);
            setY(lng);
            console.log(x,y);
            showModal();
          }
        });
        return null;
      }

      const addLocation = () => {
        let temp = {
            position: [x, y],
            name: naziv,
            description: <Desc>{opis}</Desc>

        };
        console.log(temp);
        locations.push({
            position: [x, y],
            name: naziv,
            description: <Desc>{opis}</Desc>

        });
        console.log(locations);
        handleCancel();
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
                        </Modal>
                </Page>
            </Content>
        </Layout>   
    ); 
};

export default MapPage;