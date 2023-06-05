import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input, message } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, FloatButton, Select } from 'antd';
import { Descriptions, List } from 'antd';
import { UserOutlined, FilterOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_WALKER, STATUS_ACTIVE } from '../../util.js/constants';

const { Content, Sider } = Layout;
const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];
const { TextArea } = Input;

export const StyledTable = styled(Table) `
  width: 100%;
  height: 95%;
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


export const StyledSelect = styled(Select)`
    font-size:15px;
    width:360px;
`;

const AdListPage = () => {
  const userState = useLocation();
  const user = userState.state.user;
  
 
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placesFilter, setPlacesFilter] = useState([]);
  const [prices, setPrices] = useState([]);
  
  const [placeFilterName, setPlaceFilterName]=useState('');
  const [isCalled, setIsCalled]=useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [sadrzaj,setSadrzaj]=useState('');
  const [kategorije, setKategorije] = useState([]);
  const [kategorija, setKategorija] = useState('');

  const [allAds, setAllAds] = useState([]);
  const [categoryFilterName, setCategoryFilterName]=useState('');
  const [selectedAd, setSelectedAd] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  
  const columns = [
    {
      title: 'Ime i prezime',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'Kategorija',
      dataIndex: 'category',
      width: '20%',
    },
    {
      title: 'Datum',
      dataIndex: 'date',
    },
    {
      title: '',
      dataIndex: 'oglas',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => 
            {
              setSelectedAd(record);
              showInfoModal();
            }
          }>Prikaži oglas</Button>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => 
            { let temp =  allUsers.find(element => element.id ===  record.userId);
              console.log(temp);
              let locationId = 0;
              axios.get(`http://localhost:9000/lokacije`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              })
              .then((response) => {
                locationId = response.data.find(element => element.korisnikId ===temp.id).mjestoId;
                console.log(locationId);
              })
              .catch((error) =>
                {
                  console.log(error);
                }
              )
              let location = '';
              axios.get(`http://localhost:9000/mjesta`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              })
              .then((response) => {
                location = response.data.find(element => element.id === locationId).naziv;
                
              })
              .catch((error) =>
                {
                  console.log(error);
                }
              )

              axios.get(`http://localhost:9000/korisnici/image/${temp.photo}`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  responseType: 'arraybuffer',
                  "Content-Type": 'image/jpeg',
                },
              })
              .then((response) => { 
                let temp2 = {
                  image : `data:image/jpeg;base64,${response.data}`,
                  imageName : temp.imageName,
                  id : temp.id,
                  firstName : temp.firstName,
                  lastName : temp.lastName,
                  phoneNumber : temp.phoneNumber,
                  location : location,
                  description : temp.description,
                }
                setSelectedUser(temp2);
              })
              .catch((response) => { 
                let temp2 = {
                  image : '',
                  imageName : '',
                  id : temp.id,
                  firstName : temp.firstName,
                  lastName : temp.lastName,
                  phoneNumber : temp.phoneNumber,
                  location : location,
                  description : temp.description,
                }
                setSelectedUser(temp2);
              })
                
              showModal();
          }
          }>Prikaži nalog</Button>
        </Space>
      ),
    },
  ];

  

  const filterByPlace = () => {
    setIsCalled(false);
    axios.get(`http://localhost:9000/lokacije/trazenoMjesto/${placeFilterName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {

     })
    .catch((e) => console.log(e));
  };
  

  
  

  useEffect( () => {
    
    axios.get(`http://localhost:9000/korisnici`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      setAllUsers(res.data);
      }
    )
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/oglasi`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      
        for(let i = 0; i < res.data.length; i++)
        {
          let adId = res.data.at(i).id;
          let userName = allUsers.find(element => element.id ===  res.data.at(i).korisnikId).firstName +
           ' ' + allUsers.find(element => element.id ===  res.data.at(i).korisnikId).lastName;
          if(res.data.at(i).status === true)
            temp.push({
              id : adId,
              name: userName,
              info: res.data.at(i).sadrzaj,
              date: res.data.at(i).datum.slice(0,10),
              category: 'bla',
              userId: res.data.at(i).korisnikId,
            });
        
       
      }
      setAllAds(temp);
    })
    .catch((e) => console.log(e));
  }, [allAds, places, placeFilterName, user.token, isCalled, kategorije, allUsers]);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

 

  const showAdModal = () => {
    kategorije.push({ value: 1, label: 'Vlasnici' });
    kategorije.push({ value: 2, label: 'Čuvari' });
    setIsAdModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const handleCancelInfoModal = () => {
    setIsInfoModalOpen(false);
  }

  

  const handleCancelAdModal = () => {
    setIsAdModalOpen(false);
  }

  const dodajOglas = async (event) => {
    event.preventDefault();
    try {
      const datum = new Date();
      const oglasRequest = {
        id: 1,
        sadrzaj: sadrzaj,
        status: true,
        kategorija: kategorija,
        datum: datum,
        korisnikId: user.id,
      };
      const response = await fetch('http://localhost:9000/oglasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(oglasRequest),
      })
      .catch((e) => console.log(e));
      messageApi.open({
        type: 'success',
        content: 'Oglas uspješno sačuvan!',
      });
      setIsAdModalOpen(false);
    }
    catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Oglas nije sačuvan!',
      });
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [collapsed, setCollapsed] = useState(false);
  
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
              dataSource={allAds}
              pagination={false}
              style={{height: '100%', overflow: 'auto'}}
            />
            <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={450} 
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Otkaži
                </Button>,
              ]}
            >
              <Descriptions title="" size="default" column={1}>
                <Descriptions.Item>
                  <Avatar size={130} icon={<UserOutlined />} src={selectedUser.image}/>
                </Descriptions.Item>
                <Descriptions.Item label="Ime i prezime">{selectedUser.firstName} {selectedUser.lastName}</Descriptions.Item>
                <Descriptions.Item label="Broj telefona">{selectedUser.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Lokacija">{selectedUser.location}</Descriptions.Item>
                <Descriptions.Item label="Opis">{selectedUser.description}</Descriptions.Item>
              </Descriptions>
              
              </Modal>
                 <Modal title="Dodaj oglas" open={isAdModalOpen} onOk={dodajOglas} onCancel={handleCancelAdModal} 
              >
                <TextArea
                  showCount
                  maxLength={300}
                  style={{
                    height: 120,
                    resize: 'none',
                  }}
                  placeholder="Unesite komentar (opciono)"
                  value={sadrzaj}
                  onChange={(e) => setSadrzaj(e.target.value)}
                />
                <p>Unesite kategoriju</p>
                <StyledSelect size="default"
                          allowClear
                          style={{
                            width: '100%',
                          }}
                          onChange={(selectedOption) => setKategorija(selectedOption)}
                          options={kategorije}
                          value={kategorija}
                        />
              </Modal>
                
             
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 30, top: 8 }}  />
            <FloatButton icon={<PlusCircleOutlined />} type="primary" style={{ right: 90, top: 8 }} onClick={showAdModal} />
            <Modal title="Filtriranje"  onOk={filterByPlace}  okText="Filtriraj" cancelText="Otkaži" >
              <Select size="middle" 
                placeholder="Izaberite lokacije"
                allowClear
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '3%'
                }}
                options={placesFilter}/>
            </Modal>
            <Modal title="Sadržaj oglasa"  okText="OK" cancelText="Otkaži" 
              open={isInfoModalOpen} onOk={handleCancelInfoModal} onCancel={handleCancelInfoModal} >
              <p>{selectedAd.info}</p>
            </Modal>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default AdListPage;


 
           