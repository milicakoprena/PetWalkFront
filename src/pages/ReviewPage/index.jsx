import React, { useState } from "react";
import { Modal, Layout, Rate } from 'antd';

import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table } from 'antd';
import { Descriptions } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Content, Sider } = Layout;
const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];

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




const ReviewPage = () => {
  const showModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
   
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    
const columns = [
  {
      title: '',
      dataIndex: 'imageURL',
      width: '10%',
      render: theImageURL => <UserIcon alt={theImageURL} src={theImageURL} ></UserIcon>
  },
  {
    title: 'Recenziju napisao:',
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
    imageURL: require('../resources/owner.png'),
    username: `Marko ${i}`,
  });
}

    
    const [collapsed, setCollapsed] = useState(false);
    const [value, setValue] = useState(3);
    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
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
             <Modal title="Recenzija" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={530} 
             okText="OK"
             cancelText="Otkaži"
             >
             <Descriptions title="" size="default" column={2} >
               <Descriptions.Item>
                 <Avatar size={130} icon={<UserOutlined />}/>
               </Descriptions.Item>
               <Descriptions.Item label="Ime vlasnika">Marko</Descriptions.Item>
               <span style={{
              
            }}>
              <Rate tooltips={desc} onChange={setValue} value={value} />
                 {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
             </span>

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

export default ReviewPage;