import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Layout, Input, Button, Card , message} from 'antd';
import { Page, Cover } from '../../components/CssComponents';
import pozadina from "../resources/pozadina2.jpg"
import { useLocation } from 'react-router-dom';
import axios from "axios";

const { TextArea } = Input;

const { Content, Sider } = Layout;

const ReportProblem = () => {
    const [collapsed, setCollapsed] = useState(false);
    const userState = useLocation();
    const user = userState.state.user;
    const [sadrzaj, setSadrzaj] = useState('');
    const [messageApi, contextHolder] = message.useMessage();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const problemRequest = {
                sadrzaj,
                korisnikId: user.id,
            };
            await axios.post('http://localhost:9000/problemi', problemRequest, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(() => {
                console.log("Uspjesno");
                messageApi.open({
                    type: 'success',
                    content: 'Problem uspješno prijavljen!',
                });
                setSadrzaj('');
            })
            .catch((e) => {console.log(e);
                messageApi.open({
                    type: 'error',
                    content: 'Problem nije uspješno prijavljen!',
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                maxHeight: '103vh'
            }}>
                <MainMenu/>
            </Sider>
            <Content style={{
                maxHeight: '103vh'
            }}>
                <Page>
                    <Cover style={{
                        maxHeight: '103vh',
                        backgroundImage: `url(${pozadina})`,
                    }}>
                        <Card title="Prijava problema" bordered={false}
                            style={{
                                boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)',
                                justifyContent: 'center',
                                width: '750px',
                                height: '630px',
                                marginTop: '-20px'
                            }} >
                            <TextArea
                                showCount
                                maxLength={500}
                                style={{
                                    height: '460px',
                                    width: '650px',
                                    resize: 'none',
                                    marginLeft: '3.5%',
                                }}
                                placeholder="Unesite opis problema"
                                value={sadrzaj}
                                onChange={(e) => setSadrzaj(e.target.value)}
                            />
                            {contextHolder}
                            <Button type="primary" 
                                style={{
                                    backgroundColor: 'rgba(0,21,41,255)',
                                    marginTop: '30px',
                                    fontSize: '17px',
                                    marginLeft: '43%'
                                }} 
                                onClick={handleSubmit}
                            >Pošalji</Button>
                        </Card>
                    </Cover>
                </Page>
            </Content>
        </Layout>
    );
}


export default ReportProblem;