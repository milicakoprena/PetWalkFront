import React, { useState, useEffect } from "react";
import { StopOutlined } from "@ant-design/icons";
import MainMenu from "../../components/MainMenu";
import { List, Layout, Button, Modal, message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import pozadina from "../resources/pozadina2.jpg";
import { Page, Cover } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const MyAdsPage = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [kategorije, setKategorije] = useState([]);
    const [oglasi, setOglasi] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        const request = {
            sadrzaj: selectedAd.info,
            status: false,
            kategorijaId: selectedAd.categoryId,
            datum: selectedAd.date, 
            korisnikId: selectedAd.userId
        };

        console.log("req", request);

        axios.put(`http://localhost:9000/oglasi/${selectedAd.id}`, request, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then(() => {
            messageApi.open({
                type: 'success',
                content: 'Status oglasa promijenjen.',
            });
        })
        .catch((e) => {
            messageApi.open({
                type: 'error',
                content: 'Došlo je do greške, status nije promijenjen.',
            });
            console.log(e)
        });

        setIsModalOpen(false);
    };

    const showModal = (item) => {
        setSelectedAd(item);
        setIsModalOpen(true);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:9000/kategorije`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                let temp = [];
                for (let i = 0; i < res.data.length; i++) {
                temp.push({
                    value: res.data.at(i).id,
                    label: res.data.at(i).kategorija,
                });
                setKategorije(temp);
                }
            })
            .catch((e) => console.log(e));

        axios
            .get(`http://localhost:9000/oglasi`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                let temp = [];
                let status = '';
                for (let i = 0; i < res.data.length; i++) {
                    if (user.id === res.data.at(i).korisnikId ){
                        if(res.data.at(i).status === true)
                            status = "AKTIVAN";
                        else
                            status = "NEAKTIVAN"

                        temp.push({
                            id: res.data.at(i).id,
                            name: user.firstName + " " + user.lastName,
                            info: res.data.at(i).sadrzaj,
                            date: res.data.at(i).datum.slice(0, 10),
                            status: status,
                            statusBool: res.data.at(i).status,
                            categoryId: res.data.at(i).kategorijaId,
                            category: kategorije?.find(
                                (element) => element.value === res.data.at(i).kategorijaId
                            )?.["label"],
                            userId: res.data.at(i).korisnikId,
                        });
                    }
                }
                setOglasi(temp);
            })
            .catch((e) => console.log(e));
    }, [kategorije, user.firstName, user.id, user.lastName, user.token]);

    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          collapsedWidth="100px"
          onCollapse={(value) => setCollapsed(value)}
          style={{
            maxHeight: "103vh",
          }}
        >
          <MainMenu />
        </Sider>
        <Content style={{ maxHeight: "103vh" }}>
          <Page>
            <Cover
              style={{
                backgroundImage: `url(${pozadina})`,
              }}
            >
                <div
                    style={{
                        maxHeight: "500px",
                        width: "900px",
                        overflow: "auto",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)",
                        paddingLeft: "2%",
                        paddingRight: "2%",
                    }}
                >
                <List
                    itemLayout="horizontal"
                    dataSource={oglasi}
                    pagination={false}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={
                                <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                                >
                                <div
                                    style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    }}
                                >
                                    <div style={{color: 'red'}}>{item.status}</div>
                                    <text
                                        style={{
                                            textAlign: "justify",
                                            width: "95%",
                                            color: "black",
                                        }}
                                        >
                                        {item.info}
                                    </text>

                                    <text>Kategorija: {item.category}</text>
                                    <text>Datum objave: {item.date}</text>
                                </div>
                                {(item.statusBool)  ? (
                                <div style={{ marginTop: "-25px" }}>
                                    <Button
                                        icon={<StopOutlined />}
                                        onClick={() => {
                                            showModal(item);
                                        }}
                                        style={{ scale: "1.5", borderRadius: "50%" }}
                                    ></Button>
                                </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        }
                        />
                    </List.Item>
                    )}
                />
                {contextHolder}
                <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Da"
                    cancelText="Ne">
                    <p>Da li ste sigurni da želite da deaktivirate oglas?</p>
                </Modal>
                </div>
            </Cover>
          </Page>
        </Content>
      </Layout>
    );

};

export default MyAdsPage;