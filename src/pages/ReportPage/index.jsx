import React, { useState, useEffect } from "react";
import { Modal, Upload, message, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Header, Content, Sider } = Layout;

export const UserIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

export const StyledTable = styled(Table) `
    width: 70%;
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
    background-color:rgba(101,120,139,255);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;








const ReportPage = () => {
    
const columns = [
  {
      title: '',
      dataIndex: 'imageURL',
      width: '10%',
      render: theImageURL => <UserIcon alt={theImageURL} src={theImageURL} ></UserIcon>
  },
  {
    title: 'Izvještaj napisao:',
    dataIndex: 'username',
    width: '20%',
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
    key: i,
    imageURL: require('../resources/walker.png'),
    username: `Marko ${i}`,
  });
}
    
  const showModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
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
                    y: 500,
                  }}
             />
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
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};

export default ReportPage;