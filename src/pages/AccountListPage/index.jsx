import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input, FloatButton, Avatar, Divider } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { List } from 'antd';
import axios from "axios";
import { SearchOutlined} from '@ant-design/icons';
import { useLocation } from 'react-router';
import { ROLE_OWNER, ROLE_WALKER, STATUS_ACTIVE, STATUS_BLOCKED } from '../../util.js/constants';

const { Content, Sider } = Layout;

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
  const [averageRates, setAverageRates] = useState([]);
  const [selWalkerPhoto, setSelWalkerPhoto] = useState('');
  
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
    axios.get(`http://localhost:9000/recenzije/prosjecnaOcjena`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      let temp = [];
      for(let i = 0; i < response.data.length; i++)
      {
        temp.push({
          id: response.data.at(i).left,
          average: response.data.at(i).right,
        });
      }
      setAverageRates(temp);
    })
    .catch((e) => {
      console.log(e);
    });

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
            temp.push({
              id: res.data.at(i).id,
              imageName: res.data.at(i).photo,
              image: '',
              name: res.data.at(i).firstName + " " + res.data.at(i).lastName,
              username: res.data.at(i).username,
              email: res.data.at(i).email,
              description: res.data.at(i).description,
              role: res.data.at(i).role,
              status: res.data.at(i).status,
              averageRate: averageRates?.find((element) => element.id === res.data.at(i).id)?.['average'],
            });
        }
           
        setUsers(temp);
        setUsersTemp(users);
      }
    })
    .catch((e) => console.log(e));
  }, [users, isCalled, user.token, searchedUsername, averageRates]);

    
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
      setIsModalOpen2(false);
    })
    .catch((e) => console.log(e));  
  }

  const showModal3 = (item) => {
    axios.get(`http://localhost:9000/korisnici/image/${item.imageName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        responseType: 'arraybuffer',
        "Content-Type": 'image/jpeg',
      },
    })
    .then((response) => { 
      let temp = {
        image : `data:image/jpeg;base64,${response.data}`,
        imageName : item.imageName,
        name: item.name,
      }
      setSelWalkerPhoto(temp);
    })
    .catch((response) => { 
      let temp = {
        image : '',
        imageName : '',
        name: item.name,
      }
      setSelWalkerPhoto(temp);
    })

    axios.get(`http://localhost:9000/recenzije`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      console.log(res);
      for(let i = 0; i < res.data.length; i++){
        if(res.data.at(i).korisnikZaId===item.id){
          let tempImg = users.find((element) => element.id === res.data.at(i).korisnikOdId).imageName;
          axios.get(`http://localhost:9000/korisnici/image/${tempImg}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              responseType: 'arraybuffer',
              "Content-Type": 'image/jpeg',
            },
          })
          .then((response) => { 
            temp.push({
              rating: res.data.at(i).ocjena,
              comment: res.data.at(i).komentar,
              date: res.data.at(i).datum,
              image: `data:image/jpeg;base64,${response.data}`,
              name: users.find(element => element.id === res.data.at(i).korisnikOdId).name,
            })
          })
          .catch((response) => {
            temp.push({
              rating: res.data.at(i).ocjena,
              comment: res.data.at(i).komentar,
              date: res.data.at(i).datum,
              image: '',
              name: users.find(element => element.id === res.data.at(i).korisnikOdId).name,
            })
          })
        }
      }
      setReviews(temp);
      console.log("Temp ", temp);
      console.log(reviews);
    })
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
            <div style={{ maxHeight: '96%', width: '100%', overflow: 'auto', backgroundColor: 'white', paddingLeft: '2%', paddingRight: '2%' }}>
            <List
                itemLayout="horizontal"
                dataSource={users}
                pagination={false}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={
                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ display: "flex", flexDirection: 'column', marginRight: '20px' }}>
                            {item.role===ROLE_WALKER ? (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                              <Rate disabled allowHalf value={item.averageRate} style={{marginRight: '8px'}}/>
                              {item.averageRate}
                            </div>
                            ) : (
                              <div></div>
                            )}
                            <text style={{color: 'black'}}>Korisničko ime: {item.username}</text>
                            <text style={{color: 'black'}}>E-mail: {item.email}</text>
                            <text style={{color: 'black'}}>Uloga: {item.role}</text>
                            <text style={{color: 'black'}}>Status naloga: {item.status}</text>
                            <text style={{textAlign: 'justify'}}>{item.description}</text>
                          </div>
                          <div style={{ display: "flex", flexDirection: 'column', justifyItems: 'end', marginTop: '-5px' }}>
                            <Button type="default" onClick={() => {
                              setSelectedUser(item);
                              setIsModalOpen2(true);
                            }}>Promijeni status</Button>
                            {item.role===ROLE_WALKER ? (
                              <Button type="default" style={{marginTop: '8px'}} onClick={() => {
                                setSelectedUser(item);
                                showModal3(item);
                              }}>Recenzije</Button>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              </div>
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
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                    <Avatar src={selWalkerPhoto.image} style={{ marginLeft: '42px', marginTop: '30px', marginBottom: '20px', scale: '3'}} />
                    <p style={{marginLeft: '62px', fontSize: '25px' }}>{selWalkerPhoto.name}</p>
                  </div>
                  <Divider />
                  <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.image} style={{ marginTop: '22px', scale: '1.4', marginLeft: '10px'}} />}
                          title={item.name}
                          description={
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                                <Rate disabled value={item.rating} />
                                <text>({item.rating})</text>
                              </div>
                              <text style={{color: 'black'}}>{item.comment}</text>
                              <text>{item.date}</text>
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