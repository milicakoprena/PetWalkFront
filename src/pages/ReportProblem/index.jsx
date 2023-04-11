import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Layout, Input, Button, Card } from 'antd';
import { Page } from '../AddPetPage';
import styled from 'styled-components';
import pozadina from "../resources/pozadina2.jpg"


const { TextArea } = Input;

export const StyledText = styled.p`
    font-size: 18px;
    text-align: start;
    width: 650px;
    margin-top: -10px;
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
    justify-content: center;
`;

export const StyledButton = styled.div`
    background-color: rgba(0,21,41,255);
`;

const { Content, Sider } = Layout;

const ReportProblem = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                    maxHeight: '103vh'
                    }}>
                <MainMenu></MainMenu>
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
                                />
                                <Button type="primary" style={{
                                        backgroundColor: 'rgba(0,21,41,255)',
                                        marginTop: '30px',
                                        fontSize: '17px',
                                        marginLeft: '43%'}}>Pošalji</Button>
                            </Card>
                        </Cover>
                    </Page>
                </Content>
        </Layout>
    );
}

export default ReportProblem;