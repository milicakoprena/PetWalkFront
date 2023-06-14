import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input, message } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, FloatButton, Select, Divider } from 'antd';
import { Descriptions, List } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
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

const WalkerListPage = () => {
  const userState = useLocation();
  const user = userState.state.user;
  const [walkers, setWalkers] = useState([]);
  const [walkersTemp, setWalkersTemp] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState('');
  const [selWalkerPhoto, setSelWalkerPhoto] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState('');
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placesFilter, setPlacesFilter] = useState([]);
  const [services, setServices] = useState([]);
  const [pricesPerHour, setPricesPerHour] = useState([]);
  const [pricesPerDay, setPricesPerDay] = useState([]);
  const [komentar,setKomentar]=useState('');
  const [ocjena, setOcjena]=useState('');
  const [placeFilterName, setPlaceFilterName]=useState('');
  const [isCalled, setIsCalled]=useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [averageRates, setAverageRates] = useState([]);
  
  const postRecenzija = async (event) => {
    event.preventDefault();
    let korisnikZaId=selectedWalker.id;
    try {
      const date = new Date();
      const recenzijaRequest = {
        komentar,
        ocjena,
        korisnikOdId: user.id,
        korisnikZaId,
        datum: date,
      };
      const response = await fetch('http://localhost:9000/recenzije', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(recenzijaRequest),
      })
      .catch((e) => console.log(e));
        messageApi.open({
          type: 'success',
          content: 'Recenzija uspješno sačuvana!',
        });
        setIsModalOpen1(false);
        window.location.reload();
        console.log(response);
    }
    catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Recenzija nije sačuvana!',
      });
    }
  };

  const selectPlace = (event) => {
    setPlaceFilterName(event);
  };

  const filterByPlace = () => {
    setIsCalled(false);
    axios.get(`http://localhost:9000/lokacije/trazenoMjesto/${placeFilterName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < walkersTemp.length; i++){
        for(let j = 0; j < res.data.length; j++){
          if(walkersTemp.at(i).id === res.data.at(j).id)
          {
            temp.push(walkersTemp.at(i));
          }
        }
      }
      setWalkers(temp);
    })
    .catch((e) => console.log(e));
    setIsModalOpen2(false);
  };

  useEffect( () => {
    axios.get(`http://localhost:9000/usluge`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      setServices(res.data);
    })
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/lokacije`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++){
        temp.push({
          korisnikId: res.data.at(i).korisnikId,
          mjesto: res.data.at(i).mjestoId,
        })
      }
      
      setLocations(temp);
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
          value: res.data.at(i).naziv,
          label: res.data.at(i).naziv,
        })
      }
      setPlacesFilter(temp);
      setPlaces(res.data);
    })
    .catch((e) => console.log(e));

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

    axios.get(`http://localhost:9000/cijene`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp1 = [];
      let temp2 = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data.at(i).uslugaId === 1) {
          temp1.push({
            userId: res.data.at(i).korisnikId,
            price: res.data.at(i).cijena,
            service: services.find(element => element.id === res.data.at(i).uslugaId).naziv,
          })
        }
        else if (res.data.at(i).uslugaId === 2) {
          temp2.push({
            userId: res.data.at(i).korisnikId,
            price: res.data.at(i).cijena,
            service: services.find(element => element.id === res.data.at(i).uslugaId).naziv,
          })
        }
        setPricesPerHour(temp1);
        setPricesPerDay(temp2);
      }
      console.log("po satu", pricesPerHour);
      console.log("po danu", pricesPerDay);
    })
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/korisnici`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      setAllUsers(res.data);
      if(isCalled || placeFilterName===undefined) {
        for(let i = 0; i < res.data.length; i++)
        {
          let userId = res.data.at(i).id;
          let placeId = 0;
          for(let j = 0; j < locations.length; j++)
          {
            if (locations.at(j).korisnikId === userId)
              placeId = locations.at(j).mjesto;
          }
          if(res.data.at(i).role === ROLE_WALKER && res.data.at(i).status === STATUS_ACTIVE)
          {
            temp.push({
              imageName : res.data.at(i).photo,
              image: '',
              id: res.data.at(i).id,
              firstName: res.data.at(i).firstName,
              lastName: res.data.at(i).lastName,
              name: res.data.at(i).firstName + " " + res.data.at(i).lastName,
              phoneNumber: res.data.at(i).phoneNumber,
              location: places?.find((element) => element.id === placeId)?.['naziv'],
              description: res.data.at(i).description,
              averageRate: averageRates?.find((element) => element.id === res.data.at(i).id)?.['average'],
              pricePerHour: pricesPerHour?.find((element) => element.userId === res.data.at(i).id)?.['price'],
              pricePerDay: pricesPerDay?.find((element) => element.userId === res.data.at(i).id)?.['price'],
            });
          }
        }
        setWalkers(temp);
        setWalkersTemp(walkers);
      }
      //console.log("walk", walkers);
    })
    .catch((e) => console.log(e));
  }, [averageRates, isCalled, locations, placeFilterName, places, pricesPerDay, pricesPerHour, services, user.token, walkers]);

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const showReviewModal = (item) => {
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
        name: item.firstName + " " + item.lastName,
      }
      setSelWalkerPhoto(temp);
    })
    .catch((response) => { 
      let temp = {
        image : '',
        imageName : '',
        name: item.firstName + " " + item.lastName,
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
          let tempImg = allUsers.find((element) => element.id === res.data.at(i).korisnikOdId).photo;
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
              name: allUsers.find(element => element.id === res.data.at(i).korisnikOdId).firstName + " " + allUsers.find(element => element.id === res.data.at(i).korisnikOdId).lastName,
            })
          })
          .catch((response) => {
            temp.push({
              rating: res.data.at(i).ocjena,
              comment: res.data.at(i).komentar,
              date: res.data.at(i).datum,
              image: '',
              name: allUsers.find(element => element.id === res.data.at(i).korisnikOdId).firstName + " " + allUsers.find(element => element.id === res.data.at(i).korisnikOdId).lastName,
            })
          })
        }
      }
      setReviews(temp);
      console.log(reviews);
    })

    setIsReviewModalOpen(true);
  }

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel4 = () => {
    setIsReviewModalOpen(false);
  }

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
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
            <div style={{ maxHeight: '100%', width: '100%', overflow: 'auto', backgroundColor: 'white', paddingLeft: '2%', paddingRight: '2%' }}>
              <List
                itemLayout="horizontal"
                dataSource={walkers}
                pagination={false}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name} 
                      description={
                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ display: "flex", flexDirection: 'column', marginRight: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                              <Rate disabled allowHalf value={item.averageRate} style={{marginRight: '8px'}}/>
                              {item.averageRate}
                            </div>
                            <text style={{color: 'black'}}>📍 {item.location}</text>
                            <text style={{color: 'black'}}>📞 {item.phoneNumber}</text>
                            <text style={{color: 'black'}}>💵 čuvanje po satu: {item.pricePerHour} KM</text>
                            <text style={{color: 'black'}}>💵 čuvanje po danu: {item.pricePerDay} KM</text>
                            <text style={{color: 'black', textAlign: 'justify'}}>{item.description}</text>
                          </div>
                          <div style={{ display: "flex", flexDirection: 'column' }}>
                            <Button type="primary" style={{ borderRadius: '5%', marginTop: '25px' }} onClick={() => showReviewModal(item)}>Pregledaj recenzije</Button>
                            <Button type="primary" style={{ borderRadius: '5%', marginTop: '25px' }} onClick={() => {setSelectedWalker(item); showModal1()}}>Dodaj recenziju</Button>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              <Modal title="Pregled recenzija" open={isReviewModalOpen} onOk={handleCancel4} onCancel={handleCancel4} 
              footer={[
                <Button key="back" onClick={handleCancel4}>
                  Izađi
                </Button>,
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
              {contextHolder}
              <Modal title="Dodaj recenziju" open={isModalOpen1} onOk={postRecenzija} onCancel={handleCancel1} okText="Dodaj"
                  cancelText="Otkaži">
                <TextArea
                  showCount
                  maxLength={300}
                  style={{
                    height: 120,
                    resize: 'none',
                  }}
                  placeholder="Unesite komentar (opciono)"
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                />
                <span>
                  <Rate tooltips={desc} onChange={(e) => {setOcjena(e); }} value={ocjena} />
                </span>
              </Modal>
            </div>
            
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 40, top: 10 }} onClick={showModal2} />
            <Modal title="Filtriranje" open={isModalOpen2} onOk={filterByPlace} onCancel={handleCancel2} okText="Filtriraj" cancelText="Otkaži" >
              <Select size="middle" 
                placeholder="Izaberite lokacije"
                allowClear
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '3%'
                }}
                options={placesFilter}
                onChange={selectPlace}/>
            </Modal>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default WalkerListPage;


 
           