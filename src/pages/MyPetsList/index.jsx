import React, { useState, useEffect } from "react";
import { Modal, Layout, Image } from 'antd';
import MainMenu from "../../components/MainMenu";
import { Button, List } from 'antd';
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"
import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { Page, Cover } from "../../components/CssComponents";

const { Content, Sider } = Layout;

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
                                                    <div>
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
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                                />
                            </div>
                            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={350}
                                okText="Da" cancelText="Ne" style={{ minWidth: '490px' }}
                            >
                                <p>Da li ste sigurni da želite da obrišete ljubimca?</p>    
                            </Modal>
                            <Modal title="" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} width={550}
                                footer={[]}
                            >
                                <Image
                                    width={500}
                                    src={selectedPetPhoto.image}
                                    preview={false}
                                    style={{marginTop: '17px'}}
                                /> 
                            </Modal>
                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyPetsList;