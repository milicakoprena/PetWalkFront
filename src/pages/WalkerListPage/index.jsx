import React, { useState, useEffect } from "react";
import { Modal, Layout, Button, Rate, Input } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag, FloatButton, Select } from 'antd';
import { Descriptions } from 'antd';
import { UserOutlined, FilterOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { LocationOptions, UslugaOptions } from "../EditProfilePage";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_WALKER, STATUS_ACTIVE } from '../../util.js/constants';

const { Content, Sider } = Layout;
const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];
const { TextArea } = Input;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const handleChange1 = (value) => {
  console.log(`selected ${value}`);
};

export const WalkerIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

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

const WalkerListPage = () => {
  const userState = useLocation();
  const user = userState.state.user;
  const [walkers, setWalkers] = useState([]);
  const [walkersTemp, setWalkersTemp] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState('');

  

  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placesFilter, setPlacesFilter] = useState([]);
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [komentar,setKomentar]=useState('');
  const [ocjena,setOcjena]=useState('');
  const [korisnikOdId,setKorisnikOdId]=useState(user.id);
  //const [korisnikZaId,setKorisnikZaId]=useState('');
  const [placeFilterName,setPlaceFilterName]=useState('');
  const [isCalled,setIsCalled]=useState(true);
  const [locationId, setLocationId] = useState('');
   
  
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
    //{
    //  title: 'Cijena',
    //  dataIndex: 'price',
    //},
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
              <a onClick={() => 
                {
                  setSelectedWalker(record);
                  showModal();
                }
              }>Prikaži</a>
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
        ocjena : 4,
        korisnikOdId,
        korisnikZaId
      };
      console.log("REQ",recenzijaRequest);
      const response = await fetch('http://localhost:9000/recenzije', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${user.token}`,
       },
       body: JSON.stringify(recenzijaRequest),
       })
       .catch((e) => console.log(e));
       
       console.log(response);
      
    }catch (error) {
      console.log(error);
    }
  };

  const selectPlace = (event) => {
    console.log(event);
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
    console.log("RES",placeFilterName);
    console.log("RES",res.data);
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
      title: 'Cijena (KM)',
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
 }, [walkers, places, services, postRecenzija, placeFilterName]);
 

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
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
  const handleOk = () => {
    console.log("OK",selectedWalker);
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
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
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
                  dataSource={walkers}
                  pageSize={7}
                  pagination={{
                    pageSize: 20,
                  }}
                  scroll={{
                    y: 600,
                  }}
             />

             <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={450} 
             okText="Izaberi"
             cancelText="Otkaži"
             
             >
             <Descriptions title="" size="default" column={1}>
               <Descriptions.Item>
                 <Avatar size={130} icon={<UserOutlined />} />
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
              <Button type="link"  >
                Pregled recenzija
              </Button>
              <Modal title="Dodaj recenziju" open={isModalOpen1} onOk={postRecenzija} onCancel={handleCancel1} okText="Dodaj"
                    cancelText="Otkaži">
                     
                
                <TextArea
                  showCount
                  maxLength={100}
                  style={{
                    height: 120,
                    resize: 'none',
                  }}
                  //onChange={onChange}
                  placeholder="Unesite komentar (opciono)"
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                />
                <span>
               <Rate tooltips={desc} onChange={(e) => setOcjena(e.target.value)} value={ocjena} />
                 {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
             </span>
              </Modal>
              <Modal title="Pregled usluga" open={isModalOpen3} onOk={handleCancel3} onCancel={handleCancel3} okText="OK"
                    cancelText="Zatvori">
                     <Table columns={columnsServices} dataSource={prices}/>
              </Modal>
            </Modal>
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 40, top: 19 }} onClick={showModal2} />
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


 
           