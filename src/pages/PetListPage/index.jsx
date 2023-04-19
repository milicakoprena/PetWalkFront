import React, { useState, useEffect, useCallback } from "react";
import { Modal, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, FloatButton, Select } from 'antd';
import { Descriptions, Button, Input } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import { Avatar, DatePicker } from 'antd';
import { LocationOptions, UslugaOptions } from "../EditProfilePage";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const { Content, Sider } = Layout;

const onChangeDate = (date, dateString) => {
  console.log(date, dateString);
};

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const handleChange1 = (value) => {
  console.log(`selected ${value}`);
};

export const PetIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

export const StyledTable = styled(Table) `
    width: 100%;
    height: 95%;
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
  const [isCalled, setIsCalled] = useState(true);
  const userState = useLocation();
  const user = userState.state.user;
  const [pets, setPets] = useState([]);
  const [petsTemp, setPetsTemp] = useState([]);
  const [selectedPet, setSelectedPet] = useState('');
  var [types, setTypes] = useState([]);
  var [users, setUsers] = useState([]);
  var [locations, setLocations] = useState([]);
  var [places, setPlaces] = useState([]);
  var [placesFilter, setPlacesFilter] = useState([]);
  var [typesFilter, setTypesFilter] = useState([]);
  var [typeFilterName, setTypeFilterName] = useState('');
  const columns = [
  {
    title: 'Ime',
    dataIndex: 'ime',
    width: '20%',
  },
  {
    title: 'Lokacija',
    dataIndex: 'lokacija',
    width: '20%',
  },
  {
    title: 'Ime vlasnika',
    dataIndex: 'imevlasnika',
  },
  {
    title: 'Vrsta',
    dataIndex: 'vrsta',
    width: '20%',
  },
  {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
          <Space size="middle">
            <a onClick={() => 
            {
                  setSelectedPet(record);
                  showModal();
            }}>Prikaži</a>
          </Space>
        ),
    },
];

const filterByType = () => {
  setIsCalled(false);
  console.log(isCalled);
  console.log("vrsta:",typeFilterName);
  axios.get(`http://localhost:9000/ljubimci/vrsteLjubimaca/${typeFilterName}`, {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
 })
 .then((res) => {
  console.log(res.data);
  let temp = [];
  for(let i = 0; i < petsTemp.length; i++){
    for(let j = 0; j < res.data.length; j++){
      if(petsTemp.at(i).id === res.data.at(j).id)
      {
        console.log(petsTemp.at(i));
        temp.push(petsTemp.at(i));
      }
    }
  }

  console.log(temp);
  setPets(temp);
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
    setUsers(res.data);
   })
   .catch((e) => console.log(e));

   axios.get(`http://localhost:9000/lokacije`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
   })
   .then((res) => {
    setLocations(res.data);
   })
   .catch((e) => console.log(e));

   axios.get(`http://localhost:9000/mjesta`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
   })
   .then((res) => {
    let temp = [];
    for(let i = 0; i < res.data.length; i++){
      temp.push({
        value: res.data.at(i).id,
        label: res.data.at(i).naziv,
      })
    }
    setPlacesFilter(temp);
    setPlaces(res.data);
   })
   .catch((e) => console.log(e));

  axios.get(`http://localhost:9000/vrste`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
   })
   .then((res) => {
    let temp = [];
    for(let i = 0; i < res.data.length; i++){
      temp.push({
        value: res.data.at(i).naziv,
        label: res.data.at(i).naziv,
      })
    }
    setTypesFilter(temp);
    setTypes(res.data);
   })
   .catch((e) => console.log(e));

  axios.get(`http://localhost:9000/ljubimci`, {
     headers: {
         Authorization: `Bearer ${user.token}`,
     },
   })
   .then((res) => {
    if(isCalled || typeFilterName===undefined){
      let tempArray = [];
      let tempPet = '';
      for(let i = 0; i < res.data.length; i++)
      {
          let userId = res.data.at(i).korisnikId;
          let typeId = res.data.at(i).vrstaId;
 
          let placeId = locations.find(element => element.korisnikId === userId).mjestoId;
          
          tempPet = {
           id: res.data.at(i).id,
           ime: res.data.at(i).ime,
           opis: res.data.at(i).opis,
           imevlasnika: users.find(element => element.id === userId).firstName + " " + 
            users.find(element => element.id === userId).lastName,
           vrsta: types.find(element => element.id === typeId).naziv,
           telefon: users.find(element => element.id === userId).phoneNumber,
           lokacija: places.find(element => element.id === placeId).naziv,
          }
          
          tempArray.push(tempPet);
      }
     setPets(tempArray);
     setPetsTemp(pets);
    } 
     
   })
   .catch((e) => console.log(e));
}, [ pets, types, isCalled]);

  
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  }
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const selectType = (event) => {
    console.log("1",event);
    setTypeFilterName(event);
    console.log("2",event);
    console.log("3",typeFilterName);
  };

  

    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                maxHeight: '103vh'
                }}>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{
                maxHeight: '103vh'
                }}>
          <Page>
            <Cover>
            <StyledTable
                  columns={columns}
                  dataSource={pets}
                  pageSize={7}
                  pagination={{
                    pageSize: 20,
                  }}
                  scroll={{
                    y: 600,
                  }}
             />
             <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={350}
             footer={[
              <Button key="back" onClick={handleCancel}>
                Otkaži
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Izaberi
              </Button>,
              <Button
                key="addreview"
                type="primary"
                onClick={showModal1}
              >
                Dodaj izvještaj 
              </Button>,
            ]}
             >
             <Descriptions title="" size="default" column={1}>
               <Descriptions.Item>
                 <Avatar size={130} icon={<UserOutlined />} src={selectedPet.slika}/>
               </Descriptions.Item>
               <Descriptions.Item label="Ime">{selectedPet.ime}</Descriptions.Item>
               <Descriptions.Item label="Vrsta">{selectedPet.vrsta}</Descriptions.Item>
               <Descriptions.Item label="Ime vlasnika">{selectedPet.imevlasnika}</Descriptions.Item>
               <Descriptions.Item label="Opis">{selectedPet.opis}</Descriptions.Item>
               <Descriptions.Item label="Lokacija">{selectedPet.lokacija}</Descriptions.Item>
               <Descriptions.Item label="Broj telefona">{selectedPet.telefon}</Descriptions.Item>
             </Descriptions>
             <Modal title="Dodaj izvještaj" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} okText="Dodaj"
                    cancelText="Otkaži">
                <TextArea
                  showCount
                  maxLength={100}
                  style={{
                  height: 120,
                  resize: 'none',
                  }}
                  onChange={onChange}
                  placeholder="Unesite izvještaj"
                />
                <DatePicker onChange={onChangeDate} style={{ marginTop: '3%' }} placeholder="Izaberite datum" />
              </Modal>
            </Modal>
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 40, top: 11 }} onClick={showModal2} />
            <Modal title="Filtriranje" open={isModalOpen2} onOk={filterByType} onCancel={handleCancel2} okText="Filtriraj" cancelText="Otkaži" >
                <Select size="middle" 
                    placeholder="Izaberite lokacije"
                    allowClear
                    style={{
                      width: '100%',
                      marginBottom: '3%',
                      marginTop: '3%'
                    }}
                    onChange={handleChange1}
                    options={placesFilter}/>
                <Select size="middle" 
                    placeholder="Izaberite vrste"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    options={typesFilter}
                    onChange={selectType}/>
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};



export default PetListPage;