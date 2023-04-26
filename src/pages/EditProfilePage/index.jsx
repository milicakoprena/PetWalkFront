import React, { useState } from "react";
import { Form, Input, Select, Space, Button } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Layout, Row, Col, Card, Table } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import axios from "axios";
import pozadina from "../resources/pozadina2.jpg"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const { Content, Sider } = Layout;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Dozvoljeni su samo JPG/PNG fajlovi!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Slika mora biti manja od 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
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
  align-items: center;
  justify-content: space-around;
`;

export const StyledForm = styled(Form)`
  width:350px;
  margin-top:4%;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-top:-10px;
`;

export const StyledInput = styled(Input)`
  font-size:15px;
`;

export const StyledTextArea = styled(TextArea)`
  font-size:15px;
  width:353px;
  height:150px;
  border-radius: 5px;
  border-color: #DEDDDD;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

export const StyledSelect = styled(Select)`
  font-size:15px;
  width:360px;
`;

export const StyledUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:120px;
  width: 200px;
  height: 200px;
`;

export const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledLabel = styled.div`
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
  color: rgba(19, 19, 20, 0.704);
`;

const EditProfilePage = () => {
  const [isCalled, setIsCalled] = useState(true);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectServices, setSelectServices] = useState([]);
  const [services, setServices] = useState([]);
  const userState = useLocation();
  const user = userState.state.user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [photo, setPhoto] = useState(user.photo);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [prices, setPrices] = useState([]);
  const [uslugaId, setUslugaId] = useState('');
  const [cijena, setCijena] = useState('');
  const [imageFile, setImageFile] = useState('');
  

  const showModal2 = () => {
    for(let i = 0; i < services.length; i++){
      if(!prices.find(element => element.service === services.at(i).label)){
        console.log("ima");
        selectServices.push(services.at(i));
      }
    }
    console.log(selectServices);
    setIsModalOpen2(true);
  }

  const showPassModal = () => {
    setIsPassModalOpen(true);
  }

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel2 = () => {
    setSelectServices([]);
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsPassModalOpen(false);
  };
    
  

  const handleServiceChange = (event) => {
    setUslugaId(event);
  };

  const columns = [
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
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      width: '33%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {deletePrice(record);}}>Obriši</Button>
        </Space>
      ),
    },
  ];
    
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect( () => {
    axios.get(`http://localhost:9000/korisnici/image/${user.photo}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        responseType: 'arraybuffer',
        "Content-Type": 'image/jpeg',
      },
    })
    .then((response) => {
      if(isCalled){
        setImageUrl(`data:image/jpeg;base64,${response.data}`);
      }
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
      setPlaces(temp);
      const placeId = locations.find(element => element.korisnikId === user.id).mjestoId;
      const tempPN = places.find(element => element.value === placeId).label;
      setLocationName(tempPN);
      setLocationId(placeId);
    })
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/usluge`, {
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
      setServices(temp);
    })
    .catch((e) => console.log(e));
  }, [imageUrl, locationName, locations, places, prices, services, user.id, user.korisnikId, user.photo, user.token, isCalled]);

  const [defaultValue, setDefaultValue] = useState(locationId);

  useEffect(() => {
    setDefaultValue(locationId);
  }, [locationId])

  const changePassword = () => {
    const request = {
      password,
    };
    axios.put(`http://localhost:9000/korisnici/${user.id}/${user.username}`, request, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then(() => {
      console.log("sifra apdejtovana");
      messageApi.open({
        type: 'success',
        content: 'Lozinka uspješno promijenjena.',
      });
      setIsPassModalOpen(false);
    })
    .catch((e) => {
      messageApi.open({
        type: 'error',
        content: 'Došlo je do greške, lozinka nije promijenjena.',
      });
      console.log(e)
    });  
  };


  const showModal1 = () => {
    axios.get(`http://localhost:9000/cijene`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
    let temp = [];
      for(let i = 0; i < res.data.length; i++){
        if(res.data.at(i).korisnikId===user.id){
          temp.push({
            id: res.data.at(i).id,
            price: res.data.at(i).cijena,
            service: services.find(element => element.value === res.data.at(i).uslugaId).label,
          })
        }
        setPrices(temp);
        console.log(prices);
      }
    })
    .catch((e) => console.log(e));
    setIsModalOpen1(true);
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    await axios.post(`http://localhost:9000/korisnici/image`, formData,  {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Uspjesno");
    })
    .catch((e) => console.log(e));
  }


  const handleUpdate = async (event) => {
    event.preventDefault();
    uploadPhoto();
    try {
      const request = {
        firstName,
        lastName,
        username,
        photo,
        description,
        email,
        phoneNumber,
      };
      await axios.put(`http://localhost:9000/korisnici/${user.id}`, request, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        const locationRequest = {
          mjestoId: defaultValue,
          korisnikId: user.id,
        };
        const tempId = locations.find(element => element.korisnikId === user.id).id;
        console.log(tempId);
        console.log(locationRequest);
        axios.put(`http://localhost:9000/lokacije/${tempId}`, locationRequest, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Promjene uspješno sačuvane.',
          });
        })
        .catch((e) => {
          messageApi.open({
            type: 'error',
            content: 'Došlo je do greške, promjene nisu sačuvane.',
          });
          console.log(e)});
      })
      .catch((e) => console.log(e));
    }
    catch (error) {
      console.log(error);
    }
  };

  const addPrice = async (event) => {
    event.preventDefault();
    try
    {
      const request = {
        cijena,
        uslugaId, 
        korisnikId: user.id,
      }
      await axios.post(`http://localhost:9000/cijene`, request, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        console.log('dodano');
        setIsModalOpen2(false);
        showModal1();
      })
      .catch((e) => console.log(e));
    }
    catch (error) {
      console.log(error);
    }
  };

  const deletePrice = async (selPrice) => {
    try
    {
      await axios.delete(`http://localhost:9000/cijene/${selPrice.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        console.log('obrisano');
        setIsModalOpen1(false);
        showModal1();
      })
      .catch((e) => console.log(e));
    }
    catch (error) {
      console.log(error);
    }
  }
    
  const handleChange = (info) => {
    setIsCalled(false);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined/>}
      <div
        style={{
          marginTop: 8,
        }}>
        Postavite sliku
      </div>
    </div>
  );

  const saveFile = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setPhoto(file.name);
      setImageFile(file);
    }, 0);
  };

  const [form] = Form.useForm();
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
        <Cover style={{ maxHeight: '103vh', backgroundImage: `url(${pozadina})` }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Profilna slika" bordered={false}
                style={{ 
                  boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', 
                  marginLeft: '4%',
                  marginTop: '5%',
                  height: '400px',
                  justifyContent: 'center'
                }} 
              >
                <StyledUpload>
                  <Space style={{width: '300px', height: '300px'}} >
                  <Upload
                    name="avatar"
                    customRequest={saveFile}
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <UserPhoto src={imageUrl} alt="avatar"/>
                    ) : (
                      uploadButton
                    )} 
                  </Upload>
                  </Space>
                </StyledUpload>
              </Card>
            </Col>
            <Col >
              <Card title="Detalji naloga" bordered={false} 
                style={{ 
                  boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)',
                  marginTop: '2.7%',
                  width: '840px',
                  height: '650px'
                }} 
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <StyledForm
                      form={form}
                      size="default"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }} 
                    >
                      <StyledFormItem
                        label={ <StyledLabel>Ime</StyledLabel> }
                        name="name"
                      >
                        <StyledInput 
                          defaultValue={user.firstName}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)} />
                      </StyledFormItem>
                      <StyledFormItem
                        label={ <StyledLabel>Korisničko ime</StyledLabel> }
                        name="username"
                      >
                        <StyledInput 
                          defaultValue={user.username}
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                      </StyledFormItem>
                      <StyledFormItem
                        label={ <StyledLabel>Email</StyledLabel> }
                        name="email"
                      >
                        <StyledInput 
                          defaultValue={user.email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} />
                      </StyledFormItem>
                      
                      <StyledFormItem
                        name="description"
                        label={ <StyledLabel>Opis</StyledLabel> }
                      >
                        <StyledTextArea
                          defaultValue={user.description}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
                      </StyledFormItem>
                      {contextHolder}
                      <Space style={{ justifyContent: 'center' }} >
                        <Button style={{
                          marginTop:5, minHeight:40, backgroundColor: 'rgba(0,21,41,255)', color:'white', fontSize: '16px'
                        }}  onClick={handleUpdate} >Sačuvaj promjene</Button>
                      </Space>
                    </StyledForm>
                  </Col>
                  <Col span={8} style={{ marginLeft: '16%' }} >
                    <StyledForm
                      form={form}
                      size="default"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }} 
                    >
                      <StyledFormItem
                        label={ <StyledLabel>Prezime</StyledLabel> }
                        name="surname"
                      >
                        <StyledInput 
                          defaultValue={user.lastName}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)} />
                      </StyledFormItem>
                      <StyledFormItem
                        label={ <StyledLabel>Broj telefona</StyledLabel> }
                        name="phonenumber"
                      >
                        <StyledInput 
                          defaultValue={user.phoneNumber}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)} />
                      </StyledFormItem>
                      
                      <StyledFormItem
                        name="location"
                        label={ <StyledLabel>Lokacija: {locationName}</StyledLabel> }
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledSelect size="default"
                          allowClear
                          style={{
                            width: '100%',
                          }}
                          onChange={(selectedOption) => setDefaultValue(selectedOption)}
                          options={places}
                          value={defaultValue}
                        />
                      </StyledFormItem>
                      <StyledFormItem name="password">
                        <Button type="dashed"
                          style={{ 
                            width: '100%', 
                            marginTop:'3%', 
                            fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                            fontSize: '17px',
                            color: 'rgba(19, 19, 20, 0.704)' }}
                            onClick={showPassModal}>
                          Promijeni lozinku
                        </Button>
                        <Modal 
                          title="Nova lozinka" 
                          open={isPassModalOpen} 
                          onOk={changePassword} 
                          onCancel={handleCancel3} 
                          okText="Potvrdi"
                          cancelText="Otkaži">
                            <p>Unesite novu lozinku</p>
                            <StyledInput type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />                       
                        </Modal>
                      </StyledFormItem>
                      <StyledFormItem
                        name="service"
                      >
                        <Button type="dashed" 
                          style={{ 
                            width: '100%', 
                            marginTop:'3%', 
                            fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                            fontSize: '17px',
                            color: 'rgba(19, 19, 20, 0.704)' 
                          }}
                          onClick={showModal1}>
                          Pregledaj usluge
                        </Button>
                        <Modal 
                          title="Usluge" 
                          open={isModalOpen1} 
                          onOk={handleOk1} 
                          onCancel={handleCancel1} 
                          okText="Potvrdi"
                          cancelText="Otkaži">
                          <Table pagination={false} columns={columns} dataSource={prices} style={{ height: '80%', overflow: 'auto' }} />
                          {prices.length < services.length ? (
                          <Button type="dashed" style={{ width: '100%' }} onClick={() => {showModal2(); setIsModalOpen1(false)}}>
                            Dodaj uslugu
                          </Button>) : null}                       
                        </Modal>
                        <Modal 
                          title="Dodaj uslugu" 
                          open={isModalOpen2} 
                          onOk={addPrice}
                          onCancel={() => {handleCancel2(); setIsModalOpen1(true)}} 
                          okText="Potvrdi"
                          cancelText="Otkaži">
                            <Form
                              name="add_price"
                              style={{ width: 360, marginTop: '5%', marginLeft: '5%' }}
                              autoComplete="off"
                            >
                              <Form.Item
                                label={ <StyledLabel>Usluga</StyledLabel> }
                                name='usluga'
                                rules={[{ required: true, message: 'Nedostaje usluga' }]}
                              >
                                <Select 
                                  allowClear
                                  style={{
                                    width: 330,
                                    fontSize: '15px',
                                  }}
                                  onChange={handleServiceChange}
                                  options={selectServices} />
                              </Form.Item>
                              <Form.Item
                                label={ <StyledLabel>Cijena</StyledLabel> }
                                name='cijena'
                                rules={[{ required: true, message: 'Nedostaje cijena' }]}
                              >
                                <Input style={{ fontSize: '15px', width: 330 }} suffix="KM" onChange={(e) => {setCijena(e.target.value)}} />
                              </Form.Item>
                            </Form>
                        </Modal>
                      </StyledFormItem>
                    </StyledForm>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Cover>
      </Content>
    </Layout>
  );
};

export default EditProfilePage;