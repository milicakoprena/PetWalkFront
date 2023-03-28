import React, { useState, useEffect } from "react";
import { Modal, message, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const { Header, Content, Sider } = Layout;

export const WalkerIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

export const StyledTable = styled(Table) `
    width: 100%;
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
    background-color:rgba(250,250,250,255);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;



const WalkerListPage = () => {
  const columns = [
    {
        title: '',
        dataIndex: 'imageURL',
        width: '5%',
        render: theImageURL => <WalkerIcon alt={theImageURL} src={theImageURL} ></WalkerIcon>
    },
    {
      title: 'Ime',
      dataIndex: 'firstname',
      width: '20%',
    },
    {
        title: 'Prezime',
        dataIndex: 'lastname',
        width: '20%',
      },
    {
      title: 'Lokacija',
      dataIndex: 'location',
      width: '20%',
    },
    {
      title: 'Cijena',
      dataIndex: 'price',
    },
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
              <a onClick={() => showModal(record)}>Prikaži</a>
            </Space>
          ),
      },
  ];
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      imageURL: require('../resources/owner.png'),
      key: i,
      firstname: `Marko ${i}`,
      lastname: `Marković ${i}`,
      location: 'Centar',
      price: '6KM/h',
      username: `blablabla. ${i}`,
    });
  }

  
  const showModal = (walker) => {
    setSelectedWalker(walker);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWalker, setSelectedWalker] = useState(null);
    
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
                minHeight: '100vh',
                minWidth: ''
                }}>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Content>
          <Page>
            <Cover>
            <StyledTable
                  columns={columns}
                  dataSource={data}
                  pageSize={7}
                  pagination={{
                    pageSize: 20,
                  }}
                  scroll={{
                    y: 600,
                  }}
             />
             <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={650} 
             okText="Izaberi"
             cancelText="Otkaži"
             >
             <Descriptions title="" size="default" column={2}>
               <Descriptions.Item>
                 <Avatar size={130} icon={<UserOutlined />} />
               </Descriptions.Item>
               <Descriptions.Item label="Ime i prezime">Marko Marković</Descriptions.Item>
               <Descriptions.Item label="Lokacija">Centar</Descriptions.Item>
               <Descriptions.Item label="Broj telefona">065/123-456</Descriptions.Item>
               <Descriptions.Item label="Opis">blablababalbalablablablalabal</Descriptions.Item>
               <Descriptions.Item label="Cijena">6KM/h</Descriptions.Item>
             </Descriptions>
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};

export default WalkerListPage;