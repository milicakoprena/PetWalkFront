import React, { useState, useEffect } from "react";
import { Modal, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table } from 'antd';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"

const { Content, Sider } = Layout;

export const PetIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

export const StyledTable = styled(Table) `
    width: 70%;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%);
    background-color: white;
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

export const AddPetButton = styled.div`
    width: 360px;
    height: 2em;
    background-color: rgba(0,21,41,255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top:-30px;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Icon = styled.img`
    width:25px;
    height:25px;
`;

const MyPetsList = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState('');
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        deletePet();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
    {
        title:'',
        dataIndex: 'image',
        width: '15%',
        render: (_, record) => (
            <Space size="middle" >
                <Avatar size={74} icon={<UserOutlined />} style={{ marginRight: '75%' }} />
            </Space>
        ),
    },
    {
        title: 'Vrsta',
        dataIndex: 'vrsta',
        width: '8%',
    },
    {
        title: 'Ime',
        dataIndex: 'ime',
        width: '13%',
    },
    {
        title: 'Opis',
        dataIndex: 'opis',
        width: '49%',
    },
    {
        title: '',
        dataIndex: 'action',
        width: '15%',
        render: (_, record) => (
            <Space size="middle" >
                <Button type="link" onClick={() => 
                {
                    console.log("RECORD",record);
                    setSelectedPet(record);
                    showModal();
                }}>Obriši</Button>
            </Space>
        ),
    },
    ];

    useEffect(() => {
        axios.get(`http://localhost:9000/vrste`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let temp = [];
            for(let i = 0; i < res.data.length; i++){
                temp.push({
                    id: res.data.at(i).id,
                    naziv: res.data.at(i).naziv,
                })
            }
            setTypes(res.data);
        })
        .catch((e) => console.log(e));

        axios.get(`http://localhost:9000/ljubimci`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => {
            let tempArray = [];
            let tempPet = '';
            for(let i = 0; i < res.data.length; i++)
            {
                let userId = res.data.at(i).korisnikId;
                let typeId = res.data.at(i).vrstaId;
                axios.get(`http://localhost:9000/korisnici/image/${res.data.at(i).slika}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": 'application/octet-stream',
                    "response-type": 'blob'
                },
                })
                .then((response) =>
                {
                    const blob = new Blob([response.data], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                })
                .catch((e) => console.log(e));
                
                if(userId===user.id){
                    tempPet = {
                        image: imageUrl,
                        id: res.data.at(i).id,
                        ime: res.data.at(i).ime,
                        opis: res.data.at(i).opis,
                        vrsta: types.find(element => element.id === typeId).naziv,
                    }
                    tempArray.push(tempPet);
                }
            }
            setPets(tempArray);
        })
        .catch((e) => console.log(e));
    }, [pets, types, user.token, imageUrl, user.id]);

    const deletePet = (() => {
        axios.delete(`http://localhost:9000/ljubimci/${selectedPet.id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then(() => {
            console.log('obrisano');
            setIsModalOpen(false);
        })
        .catch((e) => console.log(e));
    });

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
                                dataSource={pets}
                                size="small"
                                pageSize={7}
                                pagination={{
                                    pageSize: 20,
                                }}
                                scroll={{
                                    y: 600,
                                }}
                            />
                            <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={350}
                                okText="Da" cancelText="Ne" style={{ minWidth: '490px' }}
                            >
                                <p>Da li ste sigurni da želite da obrišete ljubimca?</p>    
                            </Modal>
                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyPetsList;