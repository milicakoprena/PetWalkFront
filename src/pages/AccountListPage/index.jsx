import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, Layout, Button, Rate, Input } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';
import axios from "axios";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER, STATUS_ACTIVE, STATUS_BLOCKED, STATUS_REQUESTED } from '../../util.js/constants';
const { Content, Sider } = Layout;

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
    height: 99%;
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

const AccountListPage = () => {
    const userState = useLocation();
    const user = userState.state.user;
    const [assets, setAssets] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let buttonText = "";
  const columns = [
   // {
   //     title: '',
   //     dataIndex: 'imageUrl',
   //     width: '5%',
   //     render: theImageURL => <WalkerIcon alt={theImageURL} src={theImageURL} ></WalkerIcon>
   // },
    {
      title: 'Ime',
      dataIndex: 'firstName',
      width: '15%',
    },
    {
        title: 'Prezime',
        dataIndex: 'lastName',
        width: '15%',
      },
    {
      title: 'Korisničko ime',
      dataIndex: 'username',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Uloga',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
              <a onClick={() => {
            setSelectedUser(record);
            console.log(record);
            setIsModalVisible(true);
          }}>Promijeni status</a>
            </Space>
          ),
      },
  ];

  

useEffect( () => {
   axios.get(`http://localhost:9000/korisnici`, {
      headers: {
          Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++)
      {
        if(res.data.at(i).role === ROLE_WALKER || res.data.at(i).role === ROLE_OWNER)
          temp.push(res.data.at(i));
      }
         
      setAssets(temp);
    })
    .catch((e) => console.log(e));
    //console.log(assets)
}, []);

    
  const changeStatus = () => {
    console.log("USERRR:",selectedUser);
    
    const request = {
      status: selectedUser.status === STATUS_ACTIVE? STATUS_BLOCKED : STATUS_ACTIVE,
    };
   
    axios
      .patch(`http://localhost:9000/korisnici/${selectedUser.id}/status`, request, {
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
        })
      .then(() => {
        console.log(selectedUser.id)
          console.log(request); 
          setSelectedUser(null);
          window.location.reload(true);
      })
      .catch((e) => console.log(e));    
    
  }


  
  const handleOk = () => {
    changeStatus();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [collapsed, setCollapsed] = useState(false);
    const [value, setValue] = useState(3);
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
            <StyledTable
                  columns={columns}
                  dataSource={assets}
                  pageSize={7}
                  scroll={{
                    y: 600,
                  }}
             >
              
             </StyledTable>
             <Modal title="Promjena statusa" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={650} 
             okText="Promijeni"
             cancelText="Otkaži"
             >
             Da li stvarno želiš da promijeniš status ovog naloga?
            
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
    );
};

export default AccountListPage;