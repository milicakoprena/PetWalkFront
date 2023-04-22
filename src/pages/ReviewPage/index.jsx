import React, { useState, useEffect } from "react";
import { Modal, Layout, Rate, Descriptions, Space, Table, Avatar } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { UserOutlined } from '@ant-design/icons';
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
const { Content, Sider } = Layout;

const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];

export const UserIcon = styled.img `
  heigth: 40px;
  width: 40px;
`;

export const StyledTable = styled(Table) `
  width: 50%;
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
   

  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tempReviews, setTempReviews] = useState([]);
  var [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
   const [selectedPet, setSelectedPet] = useState('');
   const [selectedWalker, setSelectedWalker] = useState('');   
  const columns = [
    {
      title: 'Recenziju napisao',
      dataIndex: 'korisnikOd',
      width: '30%',
    },
    {
      title: 'Čuvar',
      dataIndex: 'korisnikZa',
      width: '30%',
    },
    {
      title: 'Ocjena',
      dataIndex: 'ocjena',
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

  

  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(3);

useEffect( () => {
axios.get(`http://localhost:9000/recenzije`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
   })
   .then((res) => {
    setTempReviews(res.data);
    console.log("temp",tempReviews);
   })
   .catch((e) => console.log(e));
  
  axios.get(`http://localhost:9000/korisnici`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
   })
   .then((res) => {
    setUsers(res.data);
   })
   .catch((e) => console.log(e));
   console.log("USERS",tempReviews.length);
   let temp = [];
   for(let i = 0; i < tempReviews.length; i++){
    
    let korisnikOd = users.find(element => element.id === tempReviews.at(i).korisnikOdId).firstName + " " +
      users.find(element => element.id === tempReviews.at(i).korisnikOdId).lastName;
    console.log(korisnikOd);
    let korisnikZa = users.find(element => element.id === tempReviews.at(i).korisnikZaId).firstName + " " +
      users.find(element => element.id === tempReviews.at(i).korisnikZaId).lastName;
    let ocjena = tempReviews.at(i).ocjena;
    temp.push({
      korisnikOd,
      korisnikZa,
      ocjena,
    });
    
   }
   console.log("T",temp);
   setReviews(temp);
   



  }, [reviews, users, tempReviews]);

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
            <StyledTable
              columns={columns}
              dataSource={reviews}
              pagination={false}
              style={{ height: '300px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px' }}  
            />

            <Modal title="Recenzija" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={530} 
              okText="OK"
              cancelText="Otkaži"
            >
              <Descriptions title="" size="default" column={2} >
                <Descriptions.Item>
                  <Avatar size={130} icon={<UserOutlined />}/>
                </Descriptions.Item>
                <Descriptions.Item label="Ime vlasnika">{selectedWalker.ime}</Descriptions.Item>
                <span style={{ }}>
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                </span>
                <Descriptions.Item label="Tekst">
                {selectedWalker.recenzija}
                </Descriptions.Item>
              </Descriptions>
            </Modal>
          </Cover>
        </Page>    
      </Content>
    </Layout>
  );
};

export default ReviewPage;