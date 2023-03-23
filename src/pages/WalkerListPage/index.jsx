import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import TextArea from "rc-textarea";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, Tag } from 'antd';

const { Header, Content, Sider } = Layout;

export const PetIcon = styled.img `
    heigth: 40px;
    width: 40px;
`;

export const StyledTable = styled(Table) `
    width: 100%;
`;

const columns = [
    {
        title: '',
        dataIndex: 'imageURL',
        width: '5%',
        render: theImageURL => <PetIcon alt={theImageURL} src={theImageURL} ></PetIcon>
    },
    {
      title: 'Ime',
      dataIndex: 'firstname',
      width: '20%',
    },
    {
        title: 'Prezime',
        dataIndex: 'lastname',
        width: '20%',
      },
    {
      title: 'Lokacija',
      dataIndex: 'location',
      width: '20%',
    },
    {
      title: 'Cijena',
      dataIndex: 'price',
    },
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
              <a>Prikaži</a>
            </Space>
          ),
      },
  ];
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      imageURL: require('../resources/owner.png'),
      key: i,
      firstname: `Marko ${i}`,
      lastname: `Marković ${i}`,
      location: 'Centar',
      price: '6KM/h',
      username: `blablabla. ${i}`,
    });
  }
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
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(250,250,250,255);
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
    margin-top:-30px;
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
`;


const WalkerListPage = () => {
    
    
    const [form] = Form.useForm();
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout hasSider>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{
                minHeight: '100vh',
                minWidth: ''
                }}>
          <MainMenu></MainMenu>
        </Sider>
        <Layout className="site-layout">
          <Content>
          <Page>
            <Cover>
            <StyledTable
                  columns={columns}
                  dataSource={data}
                  pageSize={7}
                  pagination={{
                    pageSize: 20,
                  }}
                  scroll={{
                    y: 600,
                  }}
             />
            </Cover>
          </Page>
                
        </Content>
        </Layout>
        </Layout>
    );
};

export default WalkerListPage;