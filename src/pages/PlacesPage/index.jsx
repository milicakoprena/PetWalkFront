import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, List, Button } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import Input from "rc-input";
const { Content, Sider } = Layout;

export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Cover = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const PlacesPage = () => {

    const userState = useLocation();
    const user = userState.state.user;
    const [collapsed, setCollapsed] = useState(false);
    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:9000/mjesta`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let temp = [];
            for(let i = 0; i < res.data.length; i++){
                temp.push({
                    id: res.data.at(i).id,
                    label: res.data.at(i).naziv,
                })
            }
            setPlaces(temp);
        })
        .catch((e) => console.log(e));
    });

    const addPlace = async(event) => {
        event.preventDefault();
        try {
            const request = {
                naziv: newPlace,
            }
            await axios.post(`http://localhost:9000/mjesta`, request, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(() => {
                console.log("dodano");
                setNewPlace("");
                window.location.reload(true);
            })
            .catch((e) => {
                console.log(e);
            })
        }
        catch(error){
            console.log(error);
        }
        
    };

    const deletePlace = async(id) => {
        //id.preventDefault();
        try {
            await axios.delete(`http://localhost:9000/mjesta/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(() => {
                console.log("obrisano");
                window.location.reload(true);
            })
            .catch((e) => {
                console.log(e);
            })
        }
        catch(error) {
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
                    <Cover style={{
                        maxHeight: '103vh',
                        backgroundImage: `url(${pozadina})`,
                    }} >
                        <Row gutter={16} style={{justifyContent: 'space-between'}}>
                            <Col span={8}>
                                <Card title="Lista naselja" bordered={false}
                                    style={{ 
                                        boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', 
                                        height: '400px',
                                        width: '300px',
                                        justifyContent: 'center',
                                        overflow: 'auto',
                                        marginLeft: '-100px'
                                    }} 
                                >
                                    <List
                                        pagination={false}
                                        dataSource={places}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <div style={{display: 'flex', width: '300px', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                                    <p>{item.label}</p>
                                                    <Button icon={<DeleteOutlined />} style={{justifySelf: 'end'}} onClick={() => {deletePlace(item.id)}}/>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Dodaj naselje" bordered={false} 
                                    style={{ 
                                        boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)',
                                        width: '300px',
                                        height: '400px',
                                    }} 
                                >
                                    <p>Unesite naziv naselja:</p>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <Input style={{width: '253px', height: '28px', marginBottom: '25px'}}
                                            onChange={(e) => setNewPlace(e.target.value)}
                                        />
                                        <Button type="primary" onClick={addPlace}>Dodaj</Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Cover>
                </Page>    
            </Content>
        </Layout>
    );

};

export default PlacesPage;