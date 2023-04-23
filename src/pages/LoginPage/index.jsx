import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import userService from "../../services/user.service";
import { login } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER } from "../../util.js/constants";


export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(190,174,190,255);    
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const LoginButton = styled.div`
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
    margin-bottom: 40px;
    &:hover {
        transform: scale(1.15);
    }
`;



export const Logo = styled.img`
    width: 400px;
    height: auto;
    margin: 60px 0px 0px 0px;
    position: relative;
`;


export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    width:340px;
    margin-bottom:40px;
`;

export const StyledFormItem = styled(Form.Item)`
    padding: 15px;
`;

export const StyledInput = styled(Input)`
    font-size:20px;
`;


const LoginPage = () => {
    const locationIdState = useLocation();
    const [locationId, setLocationId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [imageFile, setImageFile] = useState('');
    const handleSubmit = async (event) => {
      console.log(locationId);
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:9000/login', {
            username,
            password,
          });
          const user = response.data;
          console.log(user);
          sessionStorage.setItem('auth', user.token);
          messageApi.open({
            type: 'success',
            content: 'Prijava je uspješna!',
          });

          

          if(locationId!=='') {
            let mjestoRequest = {
              mjestoId: locationId,
              korisnikId: user.id, 
            }
             const response2 = fetch('http://localhost:9000/lokacije', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`,
             },
             body: JSON.stringify(mjestoRequest),
             })
             .catch((e) => console.log(e));
               
          }

          if(imageFile){
            console.log("IMAGEFILE",imageFile);
            const formData = new FormData();
            formData.append('file', imageFile);
            axios.post(`http://localhost:9000/korisnici/image`, formData,  {
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

          
          
          
        
          if(user.role===ROLE_ADMIN)
             navigate("/accountlistpage",
             {
               state: {user}
             });
          else if(user.role===ROLE_OWNER)
          {
            navigate("/editprofileownerpage",
             {
               state: {user}
             });
          }
          else if(user.role===ROLE_WALKER)
          {
            navigate("/editprofile",
             {
               state: {user}
             });
          }
          return {...user, token: null};
          
        } catch (error) {
          console.error(error);
          messageApi.open({
            type: 'error',
            content: 'Prijava nije uspješna!',
          });
        }
      };


      useEffect(()=>{
        console.log(locationIdState);
        if(locationIdState.state)
      	{setLocationId(locationIdState.state.locationId);
      	setImageFile(locationIdState.state.imageFile);}
      })
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { loading } = useSelector((state) => state.users);
    return (
        <Page>
            <Cover>
                <Logo src={require('../resources/logo.png')}></Logo>
                <StyledForm
                  form={form}
                  size="large"
                  >
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    >
                    <StyledInput type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                  </StyledFormItem>
                  <StyledFormItem>
                  {contextHolder}
                   <LoginButton onClick={handleSubmit}>Prijavi se</LoginButton>
                  </StyledFormItem>
                </StyledForm>
                
            </Cover>
        </Page>
    );
};

export default LoginPage;
