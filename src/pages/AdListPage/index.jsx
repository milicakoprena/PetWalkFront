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
  const [walkers, setWalkers] = useState([]);
  const [walkersTemp, setWalkersTemp] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState('');
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placesFilter, setPlacesFilter] = useState([]);
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [komentar,setKomentar]=useState('');
  const [ocjena, setOcjena]=useState('');
  const [placeFilterName, setPlaceFilterName]=useState('');
  const [isCalled, setIsCalled]=useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [sadrzaj,setSadrzaj]=useState('');
  const [kategorije, setKategorije] = useState([]);
  const [kategorija, setKategorija] = useState('');
  
  const columns = [
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
      title: 'Broj telefona',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Lokacija',
      dataIndex: 'location',
      width: '20%',
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => 
            {
              axios.get(`http://localhost:9000/korisnici/image/${record.imageName}`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  responseType: 'arraybuffer',
                  "Content-Type": 'image/jpeg',
                },
              })
              .then((response) => { 
                let temp = {
                  image : `data:image/jpeg;base64,${response.data}`,
                  imageName : record.imageName,
                  id : record.id,
                  firstName : record.firstName,
                  lastName : record.lastName,
                  phoneNumber : record.phoneNumber,
                  location : record.location,
                  description : record.description,
                }
                setSelectedWalker(temp);
              })
              .catch((response) => { 
                let temp = {
                  image : '',
                  imageName : '',
                  id : record.id,
                  firstName : record.firstName,
                  lastName : record.lastName,
                  phoneNumber : record.phoneNumber,
                  location : record.location,
                  description : record.description,
                }
                setSelectedWalker(temp);
              })
                   
              showModal();
            }
          }>Prikaži</Button>
        </Space>
      ),
    },
  ];

  const postRecenzija = async (event) => {
    event.preventDefault();
    let korisnikZaId=selectedWalker.id;
    try {
      const recenzijaRequest = {
        komentar,
        ocjena,
        korisnikOdId: user.id,
        korisnikZaId
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
  

  const columnsServices = [
    {
      title: 'Usluga',
      dataIndex: 'service',
      key: 'service',
      width: '33%',
    },
    {
      title: 'Cijena po satu (KM)',
      dataIndex: 'price',
      key: 'price',
      width: '33%',
    },
  ];
  

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
            temp.push({
              imageName : res.data.at(i).photo,
              image: '',
              id: res.data.at(i).id,
              firstName: res.data.at(i).firstName,
              lastName: res.data.at(i).lastName,
              phoneNumber: res.data.at(i).phoneNumber,
              location: places.find(element => element.id === placeId).naziv,
              description: res.data.at(i).description,
            });
        }
        setWalkers(temp);
        setWalkersTemp(walkers);
      }
    })
    .catch((e) => console.log(e));
  }, [walkers, places, services, placeFilterName, user.token, isCalled, locations]);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const showAdModal = () => {
    setIsAdModalOpen(true);
  };

  const showModal3 =  () => {
    axios.get(`http://localhost:9000/cijene`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data.at(i).korisnikId===selectedWalker.id){
          temp.push({
            id: res.data.at(i).id,
            price: res.data.at(i).cijena,
            service: services.find(element => element.id === res.data.at(i).uslugaId).naziv,
          })
        }
        setPrices(temp);
      }
    })
    .catch((e) => console.log(e));
    setIsModalOpen3(true);
  };

  const showReviewModal = () => {
    axios.get(`http://localhost:9000/recenzije`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data.at(i).korisnikZaId===selectedWalker.id){
          temp.push({
            rating: res.data.at(i).ocjena,
            comment: res.data.at(i).komentar,
            name: allUsers.find(element => element.id === res.data.at(i).korisnikOdId).firstName + " " + allUsers.find(element => element.id === res.data.at(i).korisnikOdId).lastName,
          })
        }
      }
      setReviews(temp);
    })

    setIsReviewModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };

  const handleCancel4 = () => {
    setIsReviewModalOpen(false);
  }

  const handleCancelAdModal = () => {
    setIsAdModalOpen(false);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
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
              dataSource={walkers}
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
                  <Avatar size={130} icon={<UserOutlined />} src={selectedWalker.image}/>
                </Descriptions.Item>
                <Descriptions.Item label="Ime i prezime">{selectedWalker.firstName} {selectedWalker.lastName}</Descriptions.Item>
                <Descriptions.Item label="Broj telefona">{selectedWalker.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Lokacija">{selectedWalker.location}</Descriptions.Item>
                <Descriptions.Item label="Opis">{selectedWalker.description}</Descriptions.Item>
              </Descriptions>
              <Button type="link" onClick={showModal1} >
                Dodaj recenziju 
              </Button>
              <Button type="link" onClick={showModal3} >
                Pregled usluga
              </Button>
              <Button type="link" onClick={showReviewModal} >
                Pregled recenzija
              </Button>
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
              <Modal title="Pregled usluga" open={isModalOpen3} onOk={handleCancel3} onCancel={handleCancel3} 
                footer={[
                  <Button key="back" onClick={handleCancel3}>
                    Izađi
                  </Button>,
              ]}>
                <Table columns={columnsServices} dataSource={prices} pagination={false} style={{ height: '80%', overflow: 'auto' }} />
              </Modal>
              <Modal title="Pregled recenzija" open={isReviewModalOpen} onOk={handleCancel4} onCancel={handleCancel4} 
              footer={[
                <Button key="back" onClick={handleCancel4}>
                  Izađi
                </Button>,
              ]}>
                <Modal title="Dodaj oglas" open={isAdModalOpen} onOk={handleCancelAdModal} onCancel={handleCancelAdModal} 
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
                <div style={{ height: '400px', overflow: 'auto' }}>
                  <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.name}
                          description={
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                                <Rate disabled value={item.rating} />
                                <text>({item.rating})</text>
                              </div>
                              <text>{item.comment}</text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </Modal>
            </Modal>
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 30, top: 8 }} onClick={showModal2} />
            <FloatButton icon={<PlusCircleOutlined />} type="primary" style={{ right: 90, top: 8 }} onClick={showAdModal} />
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

export default AdListPage;


 
           