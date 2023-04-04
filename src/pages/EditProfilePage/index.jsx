import React, { useState } from "react";
import { Form, Input, Select, Space, Button } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";

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

const Option = Select.Option;

export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(0, 33, 64, 0.59);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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
    width: 23%;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    transition: 0.5s;
    font-size: 1.4em;
    text-decoration: underline;
    cursor: pointer;
    color:rgba(19, 19, 20, 0.704);
    position: relative;
    border: 0pc;
    margin-top: -100px;
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
    width:360px;
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
    height:60px;
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
                minHeight: '100vh'
                }}>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Content>
          <Page>
            <Cover>
           
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
                    label={ <StyledLabel style={{fontSize:"18px"}}>Lozinka</StyledLabel> }
                    name="password"
                    >
                  
                  <StyledInput/>
                  </StyledFormItem>
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
                  
                  <StyledSelect size="large">
                     <Option value="mejdan">Mejdan</Option>
                     <Option value="borik">Borik</Option>
                  </StyledSelect>
                  </StyledFormItem>
                  <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Cijena</StyledLabel> }
                    name="price"
                    >
                  
                  <StyledInput/>
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
            </Cover>
            
            {contextHolder}
            <Space >
        <Button  style={{
          top: 310, left: 400, minHeight:40, backgroundColor: 'rgba(0,21,41,255)', color:'white'
        }} onClick={success} >Sačuvaj promjene</Button>
     
           </Space>
   
        </Page>
        </Content>
        </Layout>
        </Layout>
    );
};

export default EditProfilePage;