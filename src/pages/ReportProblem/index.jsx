import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Layout, Input, Button } from 'antd';
import { Page } from '../AddPetPage';
import styled from 'styled-components';

const { TextArea } = Input;

export const StyledText = styled.p`
    font-size: 18px;
    text-align: start;
    width: 650px;
    margin-top: -10px;
`;

export const Cover = styled.div`
    background-color:rgba(0, 33, 64, 0.59);
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
                        <Cover>
                            <StyledText>Opis problema:</StyledText>
                            <TextArea
                                showCount
                                maxLength={500}
                                style={{
                                    height: '500px',
                                    width: '650px',
                                    resize: 'none',
                                }}
                                placeholder="Unesite opis problema"
                            />
                            <Button type="primary" style={{
                                    backgroundColor: 'rgba(0,21,41,255)',
                                    marginTop: '15px'
                            }}>Pošalji</Button>
                        </Cover>
                    </Page>
                </Content>
        </Layout>
    );
}

export default ReportProblem;