import {
    EnvironmentOutlined, 
    PlusCircleOutlined, 
    UnorderedListOutlined, 
    FormOutlined, 
    EditOutlined, 
    StarOutlined, 
    ExclamationCircleOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Menu, Radio, Space } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router';
import "../util.js/constants";
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER } from '../util.js/constants';
import axios from "axios";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const ownerItems = [
    getItem('Uredi profil', "/editprofile", <EditOutlined />),
    getItem('Dodaj ljubimca', "/addpetpage", <PlusCircleOutlined />),
    getItem('Lista čuvara', "/walkerlist", <TeamOutlined />),
    getItem('Izvještaji', "/reportpage", <FormOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
]

const walkerItems = [
    getItem('Uredi profil', "/editprofile", <EditOutlined />),
    getItem('Lista ljubimaca', "/petlist", <UnorderedListOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
]

const adminItems = [
    getItem('Lista naloga', "/userlist", <UnorderedListOutlined />),
    getItem('Izvještaji', "/reportpage", <FormOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Pregled prijava problema', "/reportproblemview", <ExclamationCircleOutlined />),
]

let items = walkerItems;
let selectedValue = 1;

export const HeaderImage = styled.img`
    width: 40px;
    height: 40px;
`;

const MainMenu = () => {
    const userState = useLocation();
    const user = userState.state.user;
    let isAdmin = false;
    const role = user.role;
    if(role == ROLE_ADMIN) {
        items = adminItems;
        isAdmin = true;
    }
    else if(role == ROLE_OWNER) items = ownerItems;
    else if (role == ROLE_WALKER) items = walkerItems;
    

    if(items===walkerItems)
    {
        selectedValue=1;
    }
    else if(items===ownerItems)
    {
        selectedValue=2;
    }
    const changeRole = async (event) => {
        
      };
    

    const navigate=useNavigate();
    const [value, setValue] = useState(selectedValue);
    const onChange = async (e) => {
      //  //ovdje ustvari treba napraviti da se poziva funckija changeRole, jer sad zbog 
      //  //uloga nece da radi na prethodni nacin
      //  console.log('radio checked', e.target.value);
        setValue(e.target.value);
      //  if (e.target.value===1)
      //  {
      //      items=walkerItems;
      //  }
      //  else if(e.target.value===2)
      //  {
      //      items=ownerItems;
      //  }
      e.preventDefault();
        try {
          const role = (user.role == ROLE_WALKER? ROLE_OWNER : ROLE_WALKER);
          const id = user.id;
          const auth = user.token;
          console.log(role);
          console.log(user);
          console.log(auth);
          console.log('http://localhost:9000/korisnici/' + id + '/role');
          await axios.post('http://localhost:9000/korisnici/' + id + '/role', id, role, auth);
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div  
            style={{
                minHeight: '100vh'
            }}>
            <div
                style={{
                    height: 40,
                    margin: 16,
                    background: 'rgba(0, 0, 0, 0)',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                <HeaderImage src={require('../pages/resources/walking-the-dog.png')} />
            </div>
            <Menu theme="dark"  mode="inline" items={items} onClick={({key}) => navigate(key,
             {
             state: {user}
             })} />

            { (!isAdmin) ? (
                <Radio.Group onChange={onChange} value={value} size="middle" style={{ display: 'flex', marginLeft: '11%' }}>
                <Space direction="vertical">
                    <Radio value={1} style={{ color: '#919aa3', fontWeight: '490', padding: '5%' }} >Čuvar</Radio>
                    <Radio value={2} style={{ color: '#919aa3', fontWeight: '490', marginLeft: '5%' }} >Vlasnik</Radio>
                </Space>
            </Radio.Group> 
            ) : (
                <div></div>
            )}
            
        </div>
    );
};

export default MainMenu;
  