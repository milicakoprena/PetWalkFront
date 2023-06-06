import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input, message, Divider } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, FloatButton, Select } from 'antd';
import { Descriptions, List } from 'antd';
import { UserOutlined, FilterOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CATEGORY_NUDIM } from '../../util.js/constants';
import pozadina from "../resources/pozadina2.jpg"

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


export const StyledSelect = styled(Select)`
    font-size:15px;
    width:360px;
`;

const AdListPage = () => {
  const userState = useLocation();
  const user = userState.state.user;
  
 
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
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
  const [kategorijeSelect, setKategorijeSelect] = useState([]);
  const [kategorija, setKategorija] = useState('');
  const [kategorijaFilter, setKategorijaFilter] = useState(''); 

  const [allAds, setAllAds] = useState([]);
  const [allAdsTemp, setAllAdsTemp] = useState([]);
  const [categoryFilterName, setCategoryFilterName]=useState('');
  const [selectedAd, setSelectedAd] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  

  const filterByCategory = () => {
    setIsCalled(false);
    axios.get(`http://localhost:9000/oglasi/kategorija/${kategorijaFilter}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      console.log(res);
      let temp = [];
      for(let i = 0; i < allAdsTemp.length; i++){
        for(let j = 0; j < res.data.length; j++){
          if(allAdsTemp.at(i).id === res.data.at(j).id)
          {
            temp.push(allAdsTemp.at(i));
          }
        }
      }
      setAllAds(temp);
      setIsFilterModalOpen(false);
     })
    .catch((e) => console.log(e));
  };
  

  
  

  useEffect( () => {

    axios.get(`http://localhost:9000/kategorije`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
    for(let i = 0; i < res.data.length; i++){
      temp.push({
        value: res.data.at(i).id,
        label: res.data.at(i).kategorija,
      });
      setKategorije(temp);
    }
      }
    )
    .catch((e) => console.log(e));

    if(isCalled || kategorijaFilter===undefined)
    {
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
              categoryId: res.data.at(i).kategorijaId,
              category: kategorije.find(element => element.value === res.data.at(i).kategorijaId).label,
              userId: res.data.at(i).korisnikId,
            });
        
       
      }
      setAllAds(temp);
      setAllAdsTemp(temp);
    })
    .catch((e) => console.log(e));
  }
  }, [allAds, places, placeFilterName, user.token, isCalled, allUsers, kategorije]);
  
  const showModal = (item) => {
    let temp =  allUsers.find(element => element.id ===  item.userId);
              console.log(item);
              let locationId = 0;
              axios.get(`http://localhost:9000/lokacije`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              })
              .then((response) => {
                locationId = response.data.find(element => element.korisnikId ===temp.id).mjestoId;
                
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
                  role: temp.role,
                  category: item.category,
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
                
    setIsModalOpen(true);
  };

 

  const showAdModal = () => {
    console.log(kategorijeSelect);
    setIsAdModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const showFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCancelFilterModal = () => {
    setIsFilterModalOpen(false);
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
        kategorijaId: kategorija,
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
          <Cover style={{
            backgroundImage: `url(${pozadina})`,
          }}>
          <div style={{ maxHeight: '500px', width: '900px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px', 
              boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', paddingLeft: '2%', paddingRight: '2%' }}>
            <List
                  itemLayout="horizontal"
                  dataSource={allAds}
                  pagination={false}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        //avatar={<Avatar src={`url(${pozadina})`} />}
                        title={item.name}
                        description={
                          <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ display: "flex", flexDirection: 'column' }}>
                              <text style={{ textAlign: 'justify', width: '95%', color: 'black' }}>{item.info}</text>
                              
                              <text >Kategorija: {item.category}</text>
                            <text>Datum objave: {item.date}</text>
                          </div>
                          <div >
                              <Button icon={<UserOutlined />} onClick={() => {
                                showModal(item);
                              }}
                              style={{ scale: '1.5', borderRadius: '50%' }}></Button>
                          </div>
                          
                          </div>
                        }
                      />
                    </List.Item>
                    )}
                    />
                    </div>
            <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={450} 
              
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
              {(selectedUser.category == CATEGORY_NUDIM) ? (<Button>Izaberi čuvara</Button>) : (<div></div>)}
             
              </Modal>
                 <Modal title="Dodaj oglas" open={isAdModalOpen} onOk={dodajOglas} onCancel={handleCancelAdModal} 
              >
                <TextArea
                  showCount
                  maxLength={2000}
                  style={{
                    height: 120,
                    resize: 'none',
                    textAlign: 'justify'
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
                
             
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 30, top: 8 }}  onClick={showFilterModal}/>
            <FloatButton icon={<PlusCircleOutlined />} type="primary" style={{ right: 90, top: 8 }} onClick={showAdModal} />
            <Modal title="Filtriranje po kategorijama" open={isFilterModalOpen} onCancel={handleCancelFilterModal} onOk={filterByCategory}  okText="Filtriraj" cancelText="Otkaži" >
              <Select size="middle" 
                placeholder="Izaberite kategoriju"
                allowClear
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '3%'
                }}
                onChange={(selectedOption) => {
                  setKategorijaFilter(selectedOption);
                  console.log(kategorijaFilter);
                }}
                options={kategorije}
                value={kategorijaFilter}/>
            </Modal>
            
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default AdListPage;


 
           