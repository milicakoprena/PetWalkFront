import styled from "styled-components";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";

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

export const SignUpButton = styled.div`
    width: 100%;
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
    margin-top: -20px;
    margin-bottom: 100px;
    &:hover {
        transform: scale(1.15);
    }
`;





export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    margin-top:-50px;
    width:400px;
    margin-bottom: 0px;
`;

export const StyledFormItem = styled(Form.Item)`
    padding: 10px;
`;

export const StyledInput = styled(Input)`
    font-size:20px;
`;


const SignUpPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const { buttonloading } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, SetPhoneNumber] = useState('');
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
   
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handlePhoneNumber = (e) => {
    SetPhoneNumber(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname === '' || lastname === '' || username === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
      
      const signUpUser = (firstname,lastname,username,password,
        email,phoneNumber) => {
        userService
          .signUp(firstname,lastname,username,password,
            email,phoneNumber)
          .then(() => {
            message.success("user.signUpSuccess");
          })
          .catch((err) => {
            console.error(err);
            if (err.response.status === 409)
              message.error("user.usernameExists");
            else message.error("user.signUpFail");
          });
      };

      const signUpNavigate = (firstname,lastname,username,password,
        email,phoneNumber) => {
        signUpUser(firstname,lastname,username,password,
          email,phoneNumber);
        navigate("/menupage")
      }

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
    return (
        <Page>
            <Cover>
                <StyledForm 
                  form={form}
                  size="large"
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
                    name="firstname"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/user.png')}/>} placeholder="Ime"
                  onChange={handleFirstName}
                  value={firstname}/>
                  
                  </StyledFormItem>

                  <StyledFormItem
                    name="lastname"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/user.png')}/>} placeholder="Prezime" 
                  onChange={handleLastName}
                  value={lastname}/>
                  
                  </StyledFormItem>
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" 
                  onChange={handleUsername}
                  value={username}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="email"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/arroba.png')}/>} placeholder="Email adresa" 
                  onChange={handleEmail}
                  value={email}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    >
                    <StyledInput type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" 
                    onChange={handlePassword}
                    value={password}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="number"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/phone.png')}/>} placeholder="Broj telefona"
                  onChange={handlePhoneNumber}
                  value={phoneNumber} />
                  </StyledFormItem>
                  <StyledFormItem>
                    <SignUpButton loading={buttonloading} onClick={() => signUpNavigate(firstname,lastname,username,password,
                      email,phoneNumber)}>Registruj se</SignUpButton>
                  </StyledFormItem>
                </StyledForm>
                
            </Cover>
        </Page>
    );
};

export default SignUpPage;
