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
  const [selectedWalker, setSelectedWalker] = useState('');

  const [komentar,setKomentar]=useState('');
  const [ocjena,setOcjena]=useState('');
  const [korisnikOdId,setKorisnikOdId]=useState(user.od_id);
  const [korisnikZaId,setKorisnikZaId]=useState(user.za_id);

  
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
   //{
   //  title: 'Lokacija',
   //  dataIndex: 'location',
   //  width: '20%',
   //},
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
                  console.log(selectedWalker);
                  showModal();
                }
              }>Prikaži</a>
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
         if(res.data.at(i).role === ROLE_WALKER && res.data.at(i).status === STATUS_ACTIVE)
           temp.push(res.data.at(i));
       }
          
       setWalkers(temp);
     })
     .catch((e) => console.log(e));
 }, []);
 

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
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
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(3);

  const postRecenzija = async (event) => {
    event.preventDefault();
    try {
      const request = {
        komentar,
        ocjena,
        korisnikOdId,
        korisnikZaId
      };
      await axios.post('http://localhost:9000/recenzije', request)
      .then(() => {
        
      })
      .catch((e) => console.log(e)); 
    }
    catch (error) {
      console.log(error);
    }
  };
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

             <Modal title="Informacije" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={650} 
             okText="Izaberi"
             cancelText="Otkaži"
             
             >
             <Descriptions title="" size="default" column={2}>
               <Descriptions.Item>
                 <Avatar size={130} icon={<UserOutlined />} />
               </Descriptions.Item>
               <Descriptions.Item label="Ime i prezime">{selectedWalker.firstName} {selectedWalker.lastName}</Descriptions.Item>
               <Descriptions.Item label="Broj telefona">{selectedWalker.phoneNumber}</Descriptions.Item>

             </Descriptions>
             <Button type="link" onClick={showModal1} >
                Dodaj recenziju 
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
            </Modal>
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 40, top: 19 }} onClick={showModal2} />
            <Modal title="Filtriranje" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} okText="Filtriraj" cancelText="Otkaži" >
                <Select size="middle" 
                    placeholder="Izaberite lokacije"
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                      marginBottom: '3%',
                      marginTop: '3%'
                    }}
                    onChange={handleChange1}
                    options={LocationOptions}/>
                <Select size="middle" 
                    placeholder="Izaberite usluge"
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    onChange={handleChange1}
                    options={UslugaOptions}/>
            </Modal>
            </Cover>
          </Page>
                
        </Content>
        </Layout>
    );
};

export default WalkerListPage;