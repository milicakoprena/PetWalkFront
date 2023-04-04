import styled from "styled-components";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../services/user.service";

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
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [messageApi, contextHolder] = message.useMessage();
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

      
      

      const onFinish = () => {
        
        signUp({
          firstName: firstname,
          lastName: lastname,
          username: username,
          password: password,
          email: email,
          phoneNumber: phonenumber,
        })
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem("korisnik", JSON.stringify(response.data));
            navigate("/menupage");
          })
          .catch((e) => {
            messageApi.open({
              type: "error",
              content: "error",
              duration: 0,
              style: { fontSize: "large" },
            });
            setTimeout(messageApi.destroy, 4000);
          });
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
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                 />
                  
                  </StyledFormItem>

                  <StyledFormItem
                    name="lastname"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/user.png')}/>} placeholder="Prezime" 
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}/>
                  
                  </StyledFormItem>
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="email"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/arroba.png')}/>} placeholder="Email adresa" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    >
                    <StyledInput type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="number"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/phone.png')}/>} placeholder="Broj telefona"
                   value={phonenumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem>
                    <SignUpButton type="submit" onClick={onFinish}>Registruj se</SignUpButton>
                  </StyledFormItem>
                </StyledForm>
                
            </Cover>
        </Page>
    );
};

export default SignUpPage;
