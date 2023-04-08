import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';
import { Descriptions } from 'antd';
import axios from "axios";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate, useLocation } from 'react-router';
const { Content, Sider } = Layout;

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
    
    
    const [selectedWalker, setSelectedWalker] = useState(null);
  const columns = [
   // {
   //     title: '',
   //     dataIndex: 'imageURL',
   //     width: '5%',
   //     render: theImageURL => <WalkerIcon alt={theImageURL} src={theImageURL} ></WalkerIcon>
   // },
    {
      title: 'Ime',
      dataIndex: 'firstName',
      width: '20%',
    },
    {
        title: 'Prezime',
        dataIndex: 'lastName',
        width: '20%',
      },
    {
      title: 'Korisničko ime',
      dataIndex: 'username',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
              <a onClick={() => showModal(record)}>Deaktiviraj</a>
            </Space>
          ),
      },
  ];

  const getData = async () => {
    let data =[];
    await axios.get(`http://localhost:9000/korisnici`, {
      headers: {
          Authorization: `Bearer ${user.token}`,
      },
    }).then((resp) => {console.log("success")
        
        data.push(resp.data);
        //console.log(data);
    })
      .catch((e) => {
        console.log(user.token);
        console.log(data);
      });
      return data;
  };

  const getSource = () => {
    let dataPromise = [];
    dataPromise = getData();
    let dataSource='';
      Promise.resolve(dataPromise).then(value=>{
      //console.log('value:',value)
      dataSource=value;
      //console.log(dataSource.at(0).length);
      }) 
    return dataSource;
  }

  const setData = (data) => {
    let dataPromise = [];
    dataPromise = getData();
    let dataSource='';
      Promise.resolve(dataPromise).then(value=>{
      console.log('value:',value)
      dataSource=value;
      console.log(dataSource.at(0).length);
      console.log(dataSource);
    for (let i = 0; i < dataSource.at(0).length; i++) {
      
      data.push({
        //imageURL: require('../resources/owner.png'),
        key: dataSource.at(0).at(i).id,
        firstName: dataSource.at(0).at(i).firstName,
        lastName: dataSource.at(0).at(i).lastName,
        username: dataSource.at(0).at(i).username,
        email: dataSource.at(0).at(i).email,
        
      });
      console.log(data.at(i));
    }
      }) 
    
    
  }

  let data = [];
  setData(data);

  console.log(data);

  



  
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
                  dataSource={data}
                  columns={columns}
                  pageSize={7}
                  pagination={{
                    pageSize: 20,
                  }}
                  scroll={{
                    y: 600,
                  }}
             >
              
             </StyledTable>
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
    );
};

export default AccountListPage;