import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Form, Input, Select, Space, Button } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Layout, Row, Col, Card } from 'antd';
import styled from "styled-components";
import pozadina from "../resources/pozadina2.jpg"
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';

const { Content, Sider } = Layout;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
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
  height:80px;
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

const EditProfileOwnerPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const userState = useLocation();
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);
  const user = userState.state.user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [photo, setPhoto] = useState(user.photo);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isPassModalOpen, setIsPassModalOpen] = useState('');

  const showPassModal = () => {
    setIsPassModalOpen(true);
  }
  
  const handleCancel1 = () => {
    setIsPassModalOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const selectLocation = (event) => {
    setLocationId(event);
    setLocationName(places.find(element => element.value === locationId).label);
    console.log(locationName);
  };
    
  const handleChange = (info) => {
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

  useEffect(() => {
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
    })
    .catch((e) => console.log(e));
  })

  const handleUpdate = async (event) => {
    event.preventDefault();
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
          mjestoId: locationId,
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
          console.log(e)
        });
      })
      .catch((e) => console.log(e));
    }
    catch (error) {
      console.log(error);
    }
  };

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
      setIsPassModalOpen(false);
    })
    .catch((e) => console.log(e)); 
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined/>
      }
      <div
        style={{
          marginTop: 8,
        }}
      >
        Postavite sliku
      </div>
    </div>
  );

  const saveFile = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setPhoto(file.name);
    }, 0);
  };

  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
        style={{
          minHeight: '103vh',
        }}>
        <MainMenu/>
      </Sider>
      <Content style={{ maxHeight: '103vh' }} >
        <Cover style={{  maxHeight: '103vh', backgroundImage: `url(${pozadina})`, }}>
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
            <Col>
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
                      
                      <Space style={{ justifyContent: 'center' }} >
                        {contextHolder}
                        <Button style={{
                          marginTop:40, minHeight:40, backgroundColor: 'rgba(0,21,41,255)', color:'white', fontSize: '16px'
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
                        label={ <StyledLabel>Lokacija</StyledLabel> }
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledSelect size="default" 
                          allowClear
                          style={{
                            width: '100%',
                          }}
                          onChange={selectLocation}
                          options={places}
                          defaultValue={locationName}/>
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
                          onCancel={handleCancel1} 
                          okText="Potvrdi"
                          cancelText="Otkaži"
                        >
                          <p>Unesite novu lozinku</p>
                          <StyledInput type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />                       
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

export default EditProfileOwnerPage;