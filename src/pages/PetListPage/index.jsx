import React, { useState, useEffect } from "react";
import { Modal, Upload, message, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Header, Content, Sider } = Layout;
export const PetIcon = styled.img `
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

export const AddPetButton = styled.div`
    width: 360px;
    height: 2em;
    background-color: rgba(0,21,41,255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top:-30px;
    &:hover {
        transform: scale(1.15);
    }
`;





export const Icon = styled.img`
    width:25px;
    height:25px;
`;






const PetListPage = () => {
  const [modaldata, setmodaldata] = useState([]);
  
  const columns = [
  {
      title: '',
      dataIndex: 'imageURL',
      width: '5%',
      render: theImageURL => <PetIcon alt={theImageURL} src={theImageURL} ></PetIcon>
  },
  {
    title: 'Ime',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Lokacija',
    dataIndex: 'location',
    width: '20%',
  },
  {
    title: 'Ime vlasnika',
    dataIndex: 'username',
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
    imageURL: require('../resources/track.png'),
    key: i,
    name: `Tedi ${i}`,
    location: 'Centar',
    username: `blablabla. ${i}`,
  });
}

  
  
  const showModal = (record) => {
    setmodaldata(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
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
                 <Avatar size={130} icon={<UserOutlined />} src={require('../resources/cute-dog-headshot.jpg')}/>
               </Descriptions.Item>
               <Descriptions.Item label="Ime">{modaldata.name}</Descriptions.Item>
               <Descriptions.Item label="Ime vlasnika">{modaldata.username}</Descriptions.Item>
               <Descriptions.Item label="Lokacija">{modaldata.location}</Descriptions.Item>
               <Descriptions.Item label="Opis">blablababalbalablablablalabal</Descriptions.Item>
               <Descriptions.Item label="Napomena">
                blablabalbalbalablabalbalbalablabalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
               </Descriptions.Item>
             </Descriptions>
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};



export default PetListPage;