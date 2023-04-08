import React, { useState } from "react";
import { Form, Input, Select, Space, Button, InputNumber, Cascader } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Layout, Row, Col } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import axios from "axios";

const { Header, Content, Sider } = Layout;

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

const Option = Select.Option;

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
    background-color:rgba(0, 33, 64, 0.59);
    height: 100%;
`;

export const EditProfileButton = styled.div`
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


export const DeactivateButton = styled.div`
    width: 100%;
    height: 2em;
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    padding:0;
    transition: 0.5s;
    font-size: 1.4em;
    text-decoration: underline;
    cursor: pointer;
    color:rgba(19, 19, 20, 0.704);
    position: relative;
    border: 0pc;
    margin-top: 8%;
    background-color: transparent;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    width:350px;
    margin-top:-40px;
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
    border-color: transparent;
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
   
`;

export const UserPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    
`;

export const StyledLabel = styled.div`
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

export const StyledCol = styled(Col)`
    height: 100%;
    width: 33.33%;
    padding: 4%;
    margin-top:10.5%;
    align-content: center;
`;

export const StyledCol1 = styled(Col)`
    height: 100%;
    width: 33.33%;
    padding: 4%;
    margin-top:10.3%;
    align-content: center;
`;

function getOption(label, value) {
  return {
      label,
      value,
  };
}

export const LocationOptions = [
  getOption('Mejdan', 'mejdan'),
  getOption('Borik', 'borik'),
  getOption('Starčevica', 'starcevica'),
  getOption('Budžak', 'budzak'),
]

export const UslugaOptions = [
  getOption('Šetanje', 'setanje'),
  getOption('Čuvanje', 'cuvanje'),
  getOption('Uređivanje', 'uredjivanje'),
]

const handleChange1 = (value) => {
  console.log(`selected ${value}`);
};

//const response = axios.get('http://localhost:9000/usluge');
//const usluge = response.data;

//let UslugaOptions;

//for(let i=1; i<=usluge.size; i++) {
  //UslugaOptions[i]=getOption(usluge[i].naziv, i)
//}


const EditProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Promjene uspješno sačuvane.',
    });
  };
    
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
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
            Upload
          </div>
        </div>
      );
      const saveFile = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
    const [form] = Form.useForm();
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                maxHeight: '103vh'
                }}>
          <MainMenu/>
        </Sider>
          <Content style={{
                maxHeight: '103vh'
                }} >
            <Cover>
              <Row>
                <StyledCol>
                <StyledForm
                  form={form}
                  size="large"
                  labelCol={
                    { span: 24 }
                  }
                  wrapperCol={{ span: 24 }
                  }
                  
                  >
                  <StyledUpload>
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
                <UserPhoto
                  src={imageUrl}
                  alt="avatar"
                  
                />
              ) : (
                uploadButton
              )} 
            </Upload>
                  </StyledUpload>
                 
                  <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Ime</StyledLabel> }
                    name="name"
                    >
                  
                  <StyledInput/>
                  </StyledFormItem>
                  <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Prezime</StyledLabel> }
                    name="surname"
                    >
                  
                  <StyledInput/>
                  </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Email</StyledLabel> }
                    name="email"
                    >
                      <StyledInput/>
                    </StyledFormItem>

                  </StyledForm>
                </StyledCol>
                <StyledCol1>
                  <StyledForm form={form}
                    size="large"
                    labelCol={
                      { span: 24 }
                    }
                    wrapperCol={{ span: 24 }
                    }>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Korisničko ime</StyledLabel> }
                    name="username"
                    >
                      <StyledInput/>
                    </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Broj telefona</StyledLabel> }
                    name="phonenumber"
                    >
                      <StyledInput/>
                    </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Lozinka</StyledLabel> }
                    name="password"
                    >
                      <StyledInput type="password"/>
                    </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Cijena</StyledLabel> }
                    name="price"
                    >
                  <StyledInput addonBefore={<Select placeholder="usluga"  style={{ width: 100 }} options={UslugaOptions} />}  style={{ fontSize: '15px' }} suffix="KM" />
                  </StyledFormItem>
                  {contextHolder}
                  <Space style={{ justifyContent: 'center', marginLeft:80 }} >
                    <Button  style={{
                      marginTop:60, minHeight:40, backgroundColor: 'rgba(0,21,41,255)', color:'white'
                    }} onClick={success} >Sačuvaj promjene</Button>
                
                  </Space>
                  </StyledForm>
                </StyledCol1>
                <StyledCol1>
                  <StyledForm form={form}
                    size="large"
                    labelCol={
                      { span: 24 }
                    }
                    wrapperCol={{ span: 24 }
                    }>
                    <StyledFormItem
                    name="description"
                    label={ <StyledLabel style={{fontSize:"18px"}}>Opis</StyledLabel> }
                    >
                  <StyledTextArea/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="location"
                    label={ <StyledLabel style={{fontSize:"18px"}}>Lokacija</StyledLabel> }
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledSelect size="large" 
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    onChange={handleChange1}
                    options={LocationOptions}>
                  </StyledSelect>
                  </StyledFormItem>
                  
                  <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Usluga</StyledLabel> }
                    name="service"
                    >
                  <StyledSelect mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    onChange={handleChange1}
                    options={UslugaOptions} />
                  </StyledFormItem>
                  
                  </StyledForm>
                  <>
                    <DeactivateButton type="primary" onClick={showModal}>
                      Deaktiviraj nalog
                    </DeactivateButton>
                    <Modal title="Deaktiviraj nalog" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Potvrdi"
                      cancelText="Otkaži">
                    
                      <p>Da li ste sigurni da želite da deaktivirate Vaš nalog</p>
                      
                    </Modal>
                  </>
                </StyledCol1>
              </Row>
            </Cover>
        </Content>
        </Layout>
    );
};

export default EditProfilePage;