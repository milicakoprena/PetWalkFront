import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";
import pozadina from "../resources/pozadina2darker.jpg"
import { useLocation } from "react-router-dom";
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER } from "../../util.js/constants";
import { Page, Cover, LoginButton, Logo, Icon, StyledFormLogin, StyledFormItemLogin } from "../../components/CssComponents";


const LoginPage = () => {
  const locationIdState = useLocation();
  const [locationId, setLocationId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [imageFile, setImageFile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/login', {
        username,
        password,
      });
      const user = response.data;
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
        console.log(response2);
      }

      if(imageFile){
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
    if(locationIdState.state){
      setLocationId(locationIdState.state.locationId);
      setImageFile(locationIdState.state.imageFile);
    }
  }, [locationIdState])

  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Page style={{height: '100vh'}}>
      <Cover style={{ backgroundImage: `url(${pozadina})` }} >
        <Logo src={require('../resources/logo.png')}/>
        <StyledFormLogin
          form={form}
          size="large"
        >
          <StyledFormItemLogin
            name="username"
            rules={[{ required: true, message: "Polje je obavezno!"}]}
          >
            <Input  prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{fontSize: '20px'}}/>
          </StyledFormItemLogin>
          <StyledFormItemLogin
            name="password"
            rules={[{ required: true, message: "Polje je obavezno!" }]}
          >
            <Input type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{fontSize: '20px'}}/>
          </StyledFormItemLogin>
          <StyledFormItemLogin>
            {contextHolder}
            <LoginButton onClick={handleSubmit}>Prijavi se</LoginButton>
          </StyledFormItemLogin>
        </StyledFormLogin>   
      </Cover>
    </Page>
  );
};

export default LoginPage;
