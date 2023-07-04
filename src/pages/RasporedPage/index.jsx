import React, { useState, useEffect } from "react";
import { Layout, Space, Button, Modal, Input } from 'antd';
import MainMenu from "../../components/MainMenu";
import { useLocation } from "react-router-dom";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"
import { Page, Cover, StyledTable } from "../../components/CssComponents";

const { TextArea } = Input;
const { Content, Sider } = Layout;

const RasporedPage = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [pets, setPets] = useState([]);
    const [rasporedi, setRasporedi] = useState([]);
   
    const [collapsed, setCollapsed] = useState(false);
    const [selectedRaspored, setSelectedRaspored] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sadrzaj, setSadrzaj] = useState('');

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
        {
            title: '',
            dataIndex: 'action',
            width: '15%',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => {
                        setSelectedRaspored(record);
                        showModal();
                    }}>Dodaj izvještaj</Button>
                </Space>
            ),
        },
    ];


    const postReport = () => {
        try {
            const request = {
                sadrzaj,
                korisnikId: user.id,
                ljubimacId: selectedRaspored.ljubimacId,
                datum: selectedRaspored.datum,
            };
            axios.post('http://localhost:9000/izvjestaji', request, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then(() => {
                    console.log("Uspjesno");
                    setIsModalOpen(false);
                })
                .catch((e) => console.log(e));
        }
        catch (error) {
            console.log(error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:9000/ljubimci`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => {
                let temp = [];
                for (let i = 0; i < res.data.length; i++) {
                    axios.get(`http://localhost:9000/ljubimci/getKorisnik/${res.data.at(i).id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    })
                        .then((response) => {
                            temp.push({
                                id: res.data.at(i).id,
                                ime: res.data.at(i).ime,
                                imeVlasnika: response.data.firstName + " " + response.data.lastName,
                            })
                        })
                        .catch((e) => console.log(e));
                }
                setPets(temp);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:9000/rasporedi`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => {
                let tempRasporedi = [];
                let tempRaspored = '';
                for (let i = 0; i < res.data.length; i++) {
                    let userId = res.data.at(i).korisnikId;

                    if (userId === user.id) {
                        tempRaspored = {
                            vlasnik: pets.find(element => element.id === res.data.at(i).ljubimacId).imeVlasnika,
                            ljubimac: pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
                            id: res.data.at(i).id,
                            datum: res.data.at(i).datum.slice(0, 10),
                            vrijeme: res.data.at(i).vrijemeCuvanja + 'h',
                            zarada: res.data.at(i).ukupnaCijena + 'KM',
                            ljubimacId: res.data.at(i).ljubimacId,
                        }
                        tempRasporedi.push(tempRaspored);
                    }
                }
                setRasporedi(tempRasporedi);
            })
            .catch((e) => console.log(e));
    }, [pets]);


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
                                style={{ height: '500px', overflow: 'auto' }}
                            />
                            <Modal title="Dodaj izvještaj" open={isModalOpen} onOk={postReport} onCancel={handleCancel} okText="Dodaj"
                                cancelText="Otkaži" bodyStyle={{ height: '200px' }}>
                                <TextArea
                                    showCount
                                    maxLength={300}
                                    style={{
                                        height: 180,
                                        resize: 'none',
                                    }}
                                    onChange={(e) => setSadrzaj(e.target.value)}
                                    value={sadrzaj}
                                    placeholder="Unesite izvještaj"
                                />
                            </Modal>

                        </Cover>
                    </Page>
                </Content>
            </Layout>
        </Layout>
    );
};

export default RasporedPage;