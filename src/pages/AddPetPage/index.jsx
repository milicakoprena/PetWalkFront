import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload, message, Layout, Card, Button } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import pozadina from "../resources/pozadina2.jpg"

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
  height: 100%;
  width: 100%;
  display: flex;
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
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const AddPetButton = styled.div`
  width: 360px;
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
  margin-top:-170px;
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
  margin-top:0.5%;
  margin-left:10%;
  justify-content: center;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-top:-10px;
`;

export const StyledInput = styled(Input)`
  font-size:15px;
`;

export const StyledTextArea = styled(TextArea)`
  font-size:15px;
  width:360px;
  height:80px;
  border-radius: 5px;
  border-color: #DEDDDD;
  resize: none;
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
  margin-top:20px;
`;

export const PetPhoto = styled.img`
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


const AddPetPage = (props) => {
  const userState = useLocation();
  const user = userState.state.user;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const identificator = props.identificator;
  const [typeId, setTypeId] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const selectType = (event) => {
    console.log(event);
    setTypeId(event);
    console.log(event);
    console.log(typeId);
  };

    const addPet = async () => {
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

      let ljubimacRequest = {
        ime: name,
        opis: description, 
        slika: image,
        korisnikId: user.id,
        vrstaId: typeId,
      }
       const response = await fetch('http://localhost:9000/ljubimci', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${user.token}`,
       },
       body: JSON.stringify(ljubimacRequest),
       })
       .catch((e) =>{ 
        console.log(e);
      });
       
       if(response.ok===true){
        messageApi.open({
          type: 'success',
          content: 'Ljubimac uspješno sačuvan!',
        });
       }
       else {
        messageApi.open({
          type: 'error',
          content: 'Nedostaju obavezni podaci!',
        });
       }
       };

    useEffect( () => {
      axios.get(`http://localhost:9000/vrste`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        })
        .then((res) => {
          console.log(res.data.length);
          let temp = [];
          for(let i = 0; i < res.data.length; i++){
            temp.push({
              value: res.data.at(i).id,
              label: res.data.at(i).naziv,
            })
          }
          setTypes(temp);
          console.log(types);
        })
       .catch((e) => console.log(e));
       //console.log(assets)
   }, []);
    
    const handleChange = (info) => {
      console.log(info);
        if (info.file.status === 'uploading') {
          console.log("uploading");
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          console.log("done");
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
            console.log("IMAGE URL:",imageUrl);
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
        console.log(file);
        setImage(file.name);
        setImageFile(file);
      };
    const [form] = Form.useForm();
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
          maxHeight: '103vh',
          minWidth: ''
          }}>
          <MainMenu/>
        </Sider>
          <Content>
            <Page>
              <Cover style={{
                  maxHeight: '103vh',
                  backgroundImage: `url(${pozadina})`,
                  }} >
                <Card title="Dodaj ljubimca" bordered={false} 
                  style={{ 
                    boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)',
                    justifyContent: 'center',
                    width: '500px',
                    height: '636px',
                    marginTop: '-20px'
                  }} >
                  <StyledForm
                    form={form}
                    size="large"
                    labelCol={
                      { span: 24 }
                    }
                    wrapperCol={{ span: 24 }
                    }
                    >
                    <StyledFormItem>
                      <StyledUpload>
                        <Upload
                          name="avatar"
                          customRequest={saveFile}
                          listType="picture-circle"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                          onSelect={handleChange}
                        >
                          {imageUrl ? (
                            <PetPhoto
                              src={imageUrl}
                              alt="avatar"
                              
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </StyledUpload>
                    </StyledFormItem>
                    <StyledFormItem
                      label={ <StyledLabel>Ime</StyledLabel> }
                      name="name"
                      rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                      <StyledInput value={name} onChange={(e) => setName(e.target.value)}/>
                    </StyledFormItem>
                    <StyledFormItem
                      name="type"
                      label={ <StyledLabel>Vrsta ljubimca</StyledLabel> }
                      rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                      <StyledSelect size="large"
                        options={types}
                        defaultValue={types[0]} 
                        onChange={selectType}
                      />
                    </StyledFormItem>
                    <StyledFormItem
                      name="description"
                      label={ <StyledLabel>Opis</StyledLabel> }
                    >
                      <StyledTextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </StyledFormItem>
                    {contextHolder}
                    <Button onClick={addPet} style={{
                          marginTop:5, marginLeft:110, minHeight:40, backgroundColor: 'rgba(0,21,41,255)', color:'white', fontSize: '16px'
                        }}
                      >Dodaj ljubimca</Button>
                  </StyledForm>
                </Card>
              </Cover>
          </Page>
        </Content>
      </Layout>
    );
};

export default AddPetPage;