import React, { useState, useEffect } from "react";
import { Modal, Layout, Button } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Divider, List, Skeleton } from 'antd';
import { Descriptions } from 'antd';
import { Avatar } from 'antd';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import pozadina from "../resources/pozadina2.jpg"
import { useLocation } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

export const UserIcon = styled.img`
  heigth: 40px;
  width: 40px;
`;

export const StyledTable = styled(Table)`
    width: 70%;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%);
`;



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

const ProblemView = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState('');
    const [loading, setLoading] = useState(false);
    var [users, setUsers] = useState([]);

    const loadAllProblems = () => {
        axios.get(`http://localhost:9000/korisnici`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => {
                console.log("users", res.data);
                setUsers(res.data);
            })
            .catch((e) => console.log(e));

        axios.get(`http://localhost:9000/problemi`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => {
                console.log("problems", res.data);
                let temp = [];
                let tempProblem = '';
                for (let i = 0; i < res.data.length; i++) {
                    let userId = res.data.at(i).korisnikId;
                    console.log(users);
                    console.log(userId);

                    tempProblem = {
                        firstName: users.find(element => element.id === userId).firstName,
                        lastName: users.find(element => element.id === userId).lastName,
                        key: i,
                        imageURL: require('../resources/user.png'),
                        username: users.find(element => element.id === userId).username,
                        sadrzaj: res.data.at(i).sadrzaj,
                    }

                    temp.push(tempProblem);
                    console.log("TEMP", tempProblem);
                }

                setProblems(temp);
                console.log("PROBLEMS",problems);
            })
            .catch((e) => console.log(e));
    }

    const loadMoreData = () => {
        loadAllProblems();
        if (loading) {
            return;
        }
        setLoading(true);
        fetch(problems)
            .then((res) => res.json())
            .then((body) => {
                setProblems([...problems, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, [users]);



    const showModal = (problem) => {
        setSelectedProblem(problem);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        console.log("OK", selectedProblem);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)}
                style={{
                    maxHeight: '103vh'
                }}>
                <MainMenu />
            </Sider>
            <Content style={{ maxHeight: '103vh' }}>
                <Page>
                    <Cover style={{
                        maxHeight: '103vh',
                        backgroundImage: `url(${pozadina})`,
                    }} >
                        <div
                            id="scrollableDiv"
                            style={{
                                height: 400,
                                width: '50%',
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)'
                            }}
                        >
                            <InfiniteScroll
                                dataLength={problems.length}
                                next={loadMoreData}
                                hasMore={problems.length < 10}
                                loader={
                                    <Skeleton
                                        avatar
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        active
                                    />
                                }
                                endMessage={<Divider plain>Nema više problema 😊</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={problems}
                                    renderItem={(item) => (
                                        <List.Item key={item.key}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.imageURL} />}
                                                title={<a >{item.username}</a>}
                                            />
                                            <div>
                                                <Button type="ghost" style={{ color: 'blue' }} onClick={() => showModal(item)}>Prikaži</Button>
                                            </div>

                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                            <Modal title="Problem" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={400}
                                okText="OK"
                                cancelText="Otkaži"
                            >
                                <Descriptions title="" size="default" column={1} >
                                    <Descriptions.Item>
                                        <Avatar size={130} icon={<UserOutlined />} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ime i prezime">{selectedProblem.firstName} {selectedProblem.lastName}</Descriptions.Item>
                                    <Descriptions.Item label="Tekst">{selectedProblem.sadrzaj}</Descriptions.Item>
                                </Descriptions>
                            </Modal>
                        </div>
                    </Cover>
                </Page>
            </Content>
        </Layout>
    );
};

export default ProblemView;