import { Form, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import pozadina from "../resources/pozadina-signup.jpg"
import { Page2, CoverSignUp, StyledUploadSignUp, UserPhoto, SignUpButton, StyledCol, StyledCol1, StyledFormItemLogin, StyledInput2, StyledSelect2, StyledLabel2 } from "../../components/CssComponents";

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

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    }
  };
      
  return (
    <Page2>
      <CoverSignUp style={{ backgroundImage: `url(${pozadina})` }} >
        <Row>
          <Col>
            <img src={require('../resources/logo.png')} alt="logo" style={{width: '380px', height: 'auto', marginTop: '30%'}}/>
            <p style={{ 
              width: '250px',
              marginLeft: '16%',
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
          <StyledCol>
            <Form
              style={{marginTop: '-10px', width: '380px'}}
              form={form}
              size="middle"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
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

              <StyledFormItemLogin
                label={ <StyledLabel2>Ime</StyledLabel2> }
                name="name"
              >
                <StyledInput2 value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}/>
              </StyledFormItemLogin>
              <StyledFormItemLogin
                label={ <StyledLabel2>Prezime</StyledLabel2> }
                name="surname"
              >
                <StyledInput2 value={lastName}
                  onChange={(e) => setLastName(e.target.value)}/>
              </StyledFormItemLogin>
              <StyledFormItemLogin
                label={ <StyledLabel2>Email</StyledLabel2> }
                name="email"
              >
                <StyledInput2 value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </StyledFormItemLogin>
            </Form>
          </StyledCol>
          <StyledCol1>
            <Form 
              style={{width: '380px'}}
              form={form}
              size='middle'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <StyledFormItemLogin
                name="place"
                label={ <StyledLabel2>Naselje</StyledLabel2> }
                rules={[{ required: true, message: "Polje je obavezno!"}]}
              >
                <StyledSelect2 size="large" 
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  options={locations}
                  defaultValue={locations[0]} 
                  onChange={selectLocation}
                />
              </StyledFormItemLogin>
              <StyledFormItemLogin
                label={ <StyledLabel2>Broj telefona</StyledLabel2> }
                name="phonenumber"
              >
                <StyledInput2 value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}/>
              </StyledFormItemLogin>
              <StyledFormItemLogin
                label={ <StyledLabel2>Korisničko ime</StyledLabel2> }
                name="username"
              >
                <StyledInput2 value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </StyledFormItemLogin>
              <StyledFormItemLogin
                label={ <StyledLabel2>Lozinka</StyledLabel2> }
                name="password"
              >
                <StyledInput2 type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </StyledFormItemLogin>
            </Form>
          </StyledCol1>
        </Row>
        <SignUpButton onClick={handleSubmit}>Registruj se</SignUpButton>
      </CoverSignUp>
    </Page2>
  );
};

export default SignUpPage;
