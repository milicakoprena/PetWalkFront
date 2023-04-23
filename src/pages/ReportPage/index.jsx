import React, { useState, useEffect } from "react";
import { Modal, Layout, Button } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Table, Avatar, Divider, List, Skeleton } from 'antd';
import { Descriptions } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import pozadina from "../resources/pozadina2.jpg"
import { UserOutlined } from '@ant-design/icons';
import axios from "axios";
import { useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

export const UserIcon = styled.img `
  heigth: 40px;
  width: 40px;
`;

export const StyledTable = styled(Table) `
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

const ReportPage = () => {
  
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedReport, setSelectedReport] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const userState = useLocation();
  const user = userState.state.user;
  const [sadrzaj, setSadrzaj]=useState('');
  const [korisnikId, setKorisnikId]=useState(user.korisnikId);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState('');
  

  const[sadrzaj,setSadrzaj]=useState('');
  const[korisnikId,setKorisnikId]=useState(user.korisnikId);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState('');
  const userState = useLocation();
  const user = userState.state.user;

  let datee=new Date();

  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      imageURL: require('../resources/walker.png'),
      username: `Marko ${i}`,
      date: datee.toLocaleDateString(),
    });
  }

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(data)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    loadMoreData();
  }, []);

  const postReport = async (event) => {
    event.preventDefault();
    try {
      const request = {
        sadrzaj,
        korisnikId
      };
      await axios.post('http://localhost:9000/izvjestaji', request, {
        headers: {
          Authorization: `Bearer ${user.token}`,
      },
      })
      .then(() => {
        console.log("Uspjesno");
      })
      .catch((e) => console.log(e)); 
    }
    catch (error) {
      console.log(error);
    }
  };
    
  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
        style={{
          maxHeight: '103vh'
        }}>
        <MainMenu/>
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
                width: '70%',
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)'
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 30}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                endMessage={<Divider plain>Nema više izvještaja 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item key={item.key}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.imageURL} />}
                        title={<a href="https://ant.design">{item.username}</a>}
                        description={item.date}
                      />
                      <div>
                        <Button type="ghost" style={{ color: 'blue' }} onClick={(postReport) => showModal()}>Prikaži</Button>
                      </div>
                      
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
              <Modal title="Izvještaj" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={450} 
              okText="OK"
              cancelText="Otkaži"
            >
              <Descriptions title="" size="default" column={2} >
                <Descriptions.Item>
                  <Avatar size={130} icon={<UserOutlined />}/>
                </Descriptions.Item>
                <Descriptions.Item label="Ime čuvara">Marko</Descriptions.Item>
                <Descriptions.Item label="Tekst">
                  blablabalbalbalablabalbalbalablabalblalablbalbalbalbalbalbzudhwfvkuzdfvlwzfvxčifvw
                </Descriptions.Item>
              </Descriptions>
            </Modal>
            </div>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default ReportPage;