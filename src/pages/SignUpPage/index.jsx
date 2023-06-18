import { Form, Row, Col, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload, message, Input, Button } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import pozadina from "../resources/pozadina-signup.jpg"
import logo from "../resources/logo.png"
import { Page2, CoverSignUp, StyledUploadSignUp, UserPhoto, StyledFormItem1, StyledInput2, StyledSelect2, StyledLabel2 } from "../../components/CssComponents";

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

const steps = [
  {
    key: '1',
    title: 'Prvi',
  },
  {
    key: '2',
    title: 'Drugi',
  },
  {
    key: '3',
    title: 'Posljednji',
  },
];

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const selectLocation = (event) => {
    setLocationId(event);
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

  useEffect( () => {
    axios.get(`http://localhost:9000/mjesta`)
    .then((res) => {
      let temp = [];
      for(let i = 0; i < res.data.length; i++){
        temp.push({
          value: res.data.at(i).id,
          label: res.data.at(i).naziv,
        })
      }
      setLocations(temp);
    })
    .catch((e) => console.log(e));
  }, [locations]);

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
      setImage(file.name);
      setImageFile(file);
    }, 0);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password === passwordRepeat) {
      try {
        const request = {
          firstName,
          lastName,
          username,
          password,
          email,
          phoneNumber,
          photo:image
        };
        await axios.post('http://localhost:9000/sign-up', request)
        .then(() => {
          navigate("/loginpage",
          {
            state: {locationId, imageFile}
          });
        })
        .catch((e) => console.log(e)); 
      }
      catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: 'Došlo je do greške, registracija nije moguća.',
        });
      }
    }else {
      messageApi.open({
        type: 'error',
        content: 'Lozinke se ne poklapaju, molimo Vas unesite ih ponovo.',
      });
    }
  };

  const buttonStyle = {
    fontSize: '1.4em',
    cursor: 'pointer',
    backgroundColor: '#163CB3',
    height: '2em'
  };
      
  return (
    <Page2>
      <CoverSignUp style={{ backgroundImage: `url(${pozadina})` }} >
        <Row>
          <Col style={{width: '530px'}}>
            <img src={logo} alt="logo" style={{width: '380px', height: 'auto', marginTop: '30%'}}/>
            <p style={{ 
              width: '250px',
              marginLeft: '12%',
              fontFamily:"cursive",
              fontStyle: 'oblique',
              textShadow: '1px 1px 2px darkblue',
              fontWeight: 'bold',
              fontSize: '30px',
              color: 'rgba(0, 33, 64, 0.59)',
              textAlign: 'center' }} >
              DOBRO DOŠLI!
            </p>
          </Col>
          <Col style={{width: '850px', marginTop: '80px'}}>
            <Steps current={current} items={steps} />
            <div style={{maxHeight: '420px', minHeight: '270px'}}>
              <Form
                style={{marginTop: '10px', }}
                form={form}
                size="middle"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                {current === 0 && (
                  <Row style={{justifyContent: 'space-evenly'}}>
                    <Col style={{width: '380px', marginTop: '80px'}}>
                      <StyledFormItem1
                        label={ <StyledLabel2>Ime</StyledLabel2> }
                        name="name"
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledInput2 value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}/>
                      </StyledFormItem1>
                      <StyledFormItem1
                        label={ <StyledLabel2>Prezime</StyledLabel2> }
                        name="surname"
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledInput2 value={lastName}
                          onChange={(e) => setLastName(e.target.value)}/>
                      </StyledFormItem1>
                      <StyledFormItem1
                        label={ <StyledLabel2>Broj telefona</StyledLabel2> }
                        name="phonenumber"
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledInput2 value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}/>
                      </StyledFormItem1>
                    </Col>
                    <Col style={{width: '380px', marginTop: '80px'}}>
                      <StyledFormItem1
                        label={ <StyledLabel2>Email</StyledLabel2> }
                        name="email"
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledInput2 value={email}
                          onChange={(e) => setEmail(e.target.value)}/>
                      </StyledFormItem1>
                      <StyledFormItem1
                        name="place"
                        label={ <StyledLabel2>Naselje</StyledLabel2> }
                        rules={[{ required: true, message: "Polje je obavezno!"}]}
                      >
                        <StyledSelect2 size="large" 
                          allowClear
                          style={{
                            width: '100%',
                            marginTop: '-2px'
                          }}
                          options={locations}
                          defaultValue={locations[0]} 
                          onChange={selectLocation}
                        />
                      </StyledFormItem1>
                    </Col>
                  </Row>
                )}

                {current === 1 && (
                  <div style={{width: '380px', marginTop: '80px', marginLeft: '240px'}}>
                    <StyledFormItem1
                      label={<StyledLabel2>Korisničko ime</StyledLabel2>}
                      name="username"
                      rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                      <StyledInput2 value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    </StyledFormItem1>
                    <StyledFormItem1
                      label={<StyledLabel2>Lozinka</StyledLabel2>}
                      name="password"
                      rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                      <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ fontSize: '20px' }} />
                    </StyledFormItem1>
                    <StyledFormItem1
                      label={<StyledLabel2>Ponovite lozinku</StyledLabel2>}
                      name="passwordRepeat"
                      rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                      <Input.Password
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        style={{ fontSize: '20px' }} />
                    </StyledFormItem1>
                  </div>
                )}

                {current === 2 && (
                  <StyledUploadSignUp>
                    <Upload
                      name="avatar"
                      customRequest={saveFile}
                      listType="picture-circle"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      //style={{scale: 2}}
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
                  </StyledUploadSignUp>
                )}

              </Form>
            </div>

            {contextHolder}
            <div
              style={{
                marginTop: 30,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" style={buttonStyle} onClick={() => next()}>
                  Sljedeći
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" style={buttonStyle} onClick={handleSubmit}>
                  Registruj se
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: '0 8px',
                    height: '2em',
                    fontSize: '1.4em'
                  }}
                  onClick={() => prev()}
                >
                  Prethodni
                </Button>
              )}
            </div>
          </Col>
        </Row>
        
      </CoverSignUp>
    </Page2>
  );
};

export default SignUpPage;
