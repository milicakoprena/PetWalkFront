import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input, FloatButton } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, List } from 'antd';
import axios from "axios";
import { SearchOutlined} from '@ant-design/icons';
import { useLocation } from 'react-router';
import { ROLE_OWNER, ROLE_WALKER, STATUS_ACTIVE, STATUS_BLOCKED } from '../../util.js/constants';

const { Content, Sider } = Layout;

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

const AccountListPage = () => {
  const [isCalled, setIsCalled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [usersTemp, setUsersTemp] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUsername, setSearchedUsername] = useState('');
  const [usersResult, setUsersResult] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  const columns = [
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
          <Button type="link" onClick={() => {
            setSelectedUser(record);
            setIsModalOpen2(true);
          }}>Promijeni status</Button>
          {record.role===ROLE_WALKER ? (
            <Button type="link" onClick={() => {
              setSelectedUser(record);
              showModal3(record);
            }}>Recenzije</Button>
          ) : (
            <div></div>
          )}
        </Space>
      ),
    },
  ];

  const searchByUsername = () => {
    setIsCalled(false);
    for(let i = 0; i < usersTemp.length; i++){
      if(usersTemp.at(i).username.toLowerCase().includes(searchedUsername.toLowerCase())){
        usersResult.push(usersTemp.at(i));
      }
      setUsers(usersResult);
      setUsersResult([]);
    }
    setIsModalOpen(false);    
  }

  useEffect( () => {
    axios.get(`http://localhost:9000/korisnici`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      if(isCalled && searchedUsername==='') {
        let temp = [];
        for(let i = 0; i < res.data.length; i++)
        {
          if(res.data.at(i).role === ROLE_WALKER || res.data.at(i).role === ROLE_OWNER)
            temp.push(res.data.at(i));
        }
           
        setUsers(temp);
        setUsersTemp(users);
      }
    })
    .catch((e) => console.log(e));
  }, [users, isCalled, user.token, searchedUsername]);

    
  const changeStatus = () => {
    const request = {
      status: selectedUser.status === STATUS_ACTIVE? STATUS_BLOCKED : STATUS_ACTIVE,
    };
   
    axios.patch(`http://localhost:9000/korisnici/${selectedUser.id}/status`, request, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then(() => { 
      setSelectedUser(null);
      //window.location.reload(true);
    })
    .catch((e) => console.log(e));  
  }

  const showModal3 = (selUser) => {
    axios.get(`http://localhost:9000/recenzije`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      if (res.data.length>0) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data.at(i).korisnikZaId === selUser.id) {
            reviews.push({
              korisnikOd: users.find((element) => element.id === res.data.at(i).korisnikOdId).firstName +
                " " + users.find((element) => element.id === res.data.at(i).korisnikOdId).lastName,
              korisnikZa: selUser.firstName + " " + selUser.lastName,
              ocjena: res.data.at(i).ocjena,
              komentar: res.data.at(i).komentar,
            })
          }
        }
      }
    })
    .catch((e) => console.log(e));
    setIsModalOpen3(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    changeStatus();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
    setReviews([]);
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
            <Cover>
              <StyledTable
                columns={columns}
                dataSource={users}
                pagination={false}
                style={{ height: '100%', overflow: 'auto' }}
              />
              <Modal title="Promjena statusa" open={isModalOpen2} onOk={handleOk} onCancel={handleCancel2} width={650} 
                okText="Promijeni"
                cancelText="Otkaži"
              >
                Da li stvarno želiš da promijeniš status ovog naloga?
              </Modal>
              <Modal title='Recenzije' open={isModalOpen3} onCancel={handleCancel3}
                footer={[
                  <Button key="back" onClick={handleCancel3}>
                    Izađi
                  </Button>
                ]}>
                <div style={{ height: '400px', overflow: 'auto' }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.korisnikOd}
                          description={
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                                <Rate disabled defaultValue={item.ocjena} />
                                <text>({item.ocjena})</text>
                              </div>
                              <text>{item.komentar}</text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </Modal>
            <FloatButton icon={<SearchOutlined />} type="primary" style={{ right: 40, top: 10 }} onClick={showModal} />
            <Modal title="Pretraživanje po korisničkom imenu" open={isModalOpen} onCancel={handleCancel}
              footer={[
                <Button key="1" onClick={searchByUsername} style={{ backgroundColor : "#9ac2f7"}}>Pretraži</Button>,
                <Button key="2" onClick={() => {
                  setSearchedUsername('');
                  setIsCalled(true);
                  setIsModalOpen(false);}
                } 
                style={{ backgroundColor : "#c6daf4"}}>
                  Resetuj
                </Button>,
                <Button key="3" onClick={handleCancel}>Otkaži</Button>,
              ]}>
              <Input
                placeholder="Unesi korisničko ime"
                value={searchedUsername}
                onChange={(e) => setSearchedUsername(e.target.value)}
              />
            </Modal>
          </Cover>
        </Page>     
      </Content>
    </Layout>
  );
};

export default AccountListPage;