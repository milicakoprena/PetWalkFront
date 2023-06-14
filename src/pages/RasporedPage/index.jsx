import React, { useState, useEffect } from "react";
import { Modal, Layout, Descriptions } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table } from 'antd';
import { Button } from 'antd';
import { Avatar } from 'antd';
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"

const { Content, Sider } = Layout;

export const StyledTable = styled(Table) `
    width: 70%;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%);
    background-color: white;
    border-radius: 10px;
`;

export const Page = styled.div`
    height: 100vh;
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

const RasporedPage = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [pets, setPets] = useState([]);
    const [rasporedi, setRasporedi] = useState([]);
    const [types, setTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedPetPhoto, setSelectedPetPhoto] = useState('');

   
    

    const columns = [
        {
            title: 'Ime vlasnika',
            dataIndex: 'vlasnik',
        },
        {
            title: 'Ime ljubimca',
            dataIndex: 'ljubimac',
        },
        {
            title: 'Datum',
            dataIndex: 'datum',
        },
        {
            title: 'Ukupno vrijeme',
            dataIndex: 'vrijeme',
            width: '15%',
        },
        
        {
            title: 'Ukupna zarada',
            dataIndex: 'zarada',
           
        },
        
        
    ];

    useEffect(() => {
        axios.get(`http://localhost:9000/ljubimci`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let temp = [];
            for(let i = 0; i < res.data.length; i++){
                temp.push({
                    id: res.data.at(i).id,
                    ime: res.data.at(i).ime,
                })
            }
            setPets(res.data);
        })
        .catch((e) => console.log(e));

        axios.get(`http://localhost:9000/rasporedi`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let tempRasporedi = [];
            let tempRaspored = '';
            for(let i = 0; i < res.data.length; i++)
            {
                let userId = res.data.at(i).korisnikId;
                
                if(userId===user.id){
                    tempRaspored = {
                        vlasnik: 'vlasnik blabla',
                        ljubimac : pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
                        id: res.data.at(i).id,
                        datum: res.data.at(i).datum.slice(0,10),
                        vrijeme: res.data.at(i).vrijemeCuvanja + 'h',
                        zarada: res.data.at(i).ukupnaCijena + 'KM',
                    }
                    tempRasporedi.push(tempRaspored);
                }
            }
            setRasporedi(tempRasporedi);
        })
        .catch((e) => console.log(e));
    }, [pets, types, user.token, user.id, rasporedi]);


    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                    maxHeight: '103vh'
                    }}>
                <MainMenu></MainMenu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{
                    maxHeight: '103vh'
                    }}>
                    <Page>
                        <Cover style={{
                            maxHeight: '103vh',
                            backgroundImage: `url(${pozadina})`,
                        }}>
                            <StyledTable
                                columns={columns}
                                dataSource={rasporedi}
                                size="small"
                                pagination={false}
                                style={{height: '500px', overflow: 'auto'}}
                            />
                            
                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default RasporedPage;