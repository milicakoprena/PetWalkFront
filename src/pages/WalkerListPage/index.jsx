import React, { useState, useEffect } from "react";
import { Modal, message, Layout, Button, Rate, Input } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const { Header, Content, Sider } = Layout;
const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];
const { TextArea } = Input;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

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

export const AddReviewButton = styled.div`
    width: 300px;
    height: 2em;
    background-color: rgba(0,21,41,255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.4em;
    margin-top:640px;
    margin-left:780px;
    &:hover {
        transform: scale(1.15);
    }
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
  const showModal1 = (walker) => {
    setSelectedWalker(walker);
    setIsModalOpen1(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null);
    
    const [collapsed, setCollapsed] = useState(false);
    const [value, setValue] = useState(3);
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
             <Button type="link" onClick={showModal1} >
                Dodaj recenziju 
              </Button>
              <Modal title="Dodaj recenziju" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} okText="Dodaj"
                    cancelText="Otkaži">
                     
                
                <TextArea
                  showCount
                  maxLength={100}
                  style={{
                    height: 120,
                    resize: 'none',
                  }}
                  onChange={onChange}
                  placeholder="Unesite komentar (opciono)"
                />
                <span>
               <Rate tooltips={desc} onChange={setValue} value={value} />
                 {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
             </span>
              </Modal>
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};

export default WalkerListPage;