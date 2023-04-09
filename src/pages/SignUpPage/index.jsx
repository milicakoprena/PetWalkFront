import styled from "styled-components";
import { Form, Input, Select, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService, { signUp } from "../../services/user.service";
import axios from "axios";

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

export const StyledUpload = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:140px;
    margin-top:160px;
`;

export const UserPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

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
height: 100%;
width: 100%
`;

export const SignUpButton = styled.div`
    width: 30%;
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
    &:hover {
        transform: scale(1.15);
    }
    margin-left: 35%;
`;

export const StyledCol = styled(Col)`
    align-content: center;
    margin-left:270px;
    margin-top: -50px;
`;

export const StyledCol1 = styled(Col)`
    align-content: center;
    margin-left:180px;
    margin-top: 73px;
`;



export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    margin-top:-10px;
    width:400px;
    
`;

export const StyledFormItem = styled(Form.Item)`
    padding: 10px;
`;

export const StyledInput = styled(Input)`
    font-size:20px;
`;

export const StyledSelect = styled(Select)`
    margin-top:15px;
    font-size:18px;
    width:360px;
    heigth:150px;
`;

export const StyledLabel = styled.div`
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;


const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    
    const dispatch = useDispatch();

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

      
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const user = {
            firstName,
            lastName,
            username,
            password,
            email,
            phoneNumber,
          };
          await axios.post('http://localhost:9000/sign-up', user);
          messageApi.open({
            type: 'success',
            content: 'Korisnik uspješno registrovan!',
          });
          navigate("/editprofile");
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <Page>
            
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
                    name="place"
                    label={ <StyledLabel style={{fontSize:"18px", marginTop:"25px"}}>Naselje</StyledLabel> }
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledSelect size="large" 
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    >
                  </StyledSelect>
                  </StyledFormItem>
                    
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Broj telefona</StyledLabel> }
                    name="phonenumber"
                    >
                      <StyledInput/>
                    </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Korisničko ime</StyledLabel> }
                    name="username"
                    >
                      <StyledInput/>
                    </StyledFormItem>
                    <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Lozinka</StyledLabel> }
                    name="password"
                    >
                      <StyledInput type="password"/>
                    </StyledFormItem>
                    
                  
                  </StyledForm>
                
                  <StyledForm form={form}
                    size="large"
                    labelCol={
                      { span: 24 }
                    }
                    wrapperCol={{ span: 24 }
                    }>
                   
                  
                  
                  </StyledForm>
                  <>
                   
                  </>
                </StyledCol1>
                
              </Row>
              <SignUpButton>Registruj se</SignUpButton>
            </Cover>
        
        </Page>
    );
};

export default SignUpPage;
