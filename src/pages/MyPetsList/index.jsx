import React, { useState, useEffect } from "react";
import { Modal, Layout, Descriptions } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table } from 'antd';
import { Button, List } from 'antd';
import { Avatar } from 'antd';
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"
import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';

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

const MyPetsList = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState('');
    const [types, setTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selectedPetPhoto, setSelectedPetPhoto] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        deletePet();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const columns = [
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
            dataIndex: 'show',
            width: '15%',
            render: (_, record) => (
                <Space size="middle" >
                    <Button type="link" onClick={() => 
                    {
                        axios.get(`http://localhost:9000/ljubimci/image/${record.imageName}`, {
                         headers: {
                        Authorization: `Bearer ${user.token}`,
                        responseType: 'arraybuffer',
                        "Content-Type": 'image/jpeg',
                    },
                    })
                    .then((response) =>
                    {
                        setSelectedPetPhoto({
                            image: `data:image/jpeg;base64,${response.data}`,
                        })
                    })
                    .catch((e) => console.log(e));
                    showModal2();
                    }}>Prikaži sliku</Button>
                </Space>
            ),
        },
        {
            title: '',
            dataIndex: 'action',
            width: '15%',
            render: (_, record) => (
                <Space size="middle" >
                    <Button type="link" onClick={() => 
                    {
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
                
                if(userId===user.id){
                    tempPet = {
                        imageName: res.data.at(i).slika,
                        image : '',
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
    }, [pets, types, user.token, user.id]);

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
                           <div style={{ maxHeight: '400px', width: '800px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px', 
                                boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', paddingLeft: '2%', paddingRight: '2%' }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={pets}
                                    pagination={false}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.ime}
                                            description={
                                                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <div style={{ display: "flex", flexDirection: 'column', marginRight: '20px' }}>
                                                        <text style={{color: 'black'}}>{item.vrsta}</text>
                                                        <text style={{color: 'black'}}>{item.opis}</text>
                                                    </div>
                                                    <Button icon={<PictureOutlined /> }  onClick={() => {
                                                        axios.get(`http://localhost:9000/ljubimci/image/${item.imageName}`, {
                                                        headers: {
                                                        Authorization: `Bearer ${user.token}`,
                                                        responseType: 'arraybuffer',
                                                        "Content-Type": 'image/jpeg',
                                                    },
                                                    })
                                                    .then((response) =>
                                                    {
                                                        setSelectedPetPhoto({
                                                            image: `data:image/jpeg;base64,${response.data}`,
                                                        })
                                                    })
                                                    .catch((e) => console.log(e));
                                                    showModal2();}}></Button>
                                                    <Button icon={<DeleteOutlined />} style={{marginLeft: '10px'}} onClick={() => {setSelectedPet(item); showModal()}} ></Button>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                                />
                            </div>
                            <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={350}
                                okText="Da" cancelText="Ne" style={{ minWidth: '490px' }}
                            >
                                <p>Da li ste sigurni da želite da obrišete ljubimca?</p>    
                            </Modal>
                            <Modal title="" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} width={280}
                                 
                                footer={[]}
                            >
                                <Descriptions title="" size="default" column={1}>
                                      <Descriptions.Item>
                                        <Avatar size={200}  src={selectedPetPhoto.image}
                                          style={{marginTop: '30px', marginLeft: '10px'}}/>
                                      </Descriptions.Item>
                                </Descriptions>  
                            </Modal>
                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyPetsList;