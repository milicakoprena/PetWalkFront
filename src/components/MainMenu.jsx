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
import { Menu, Radio, Space, Popconfirm, Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router';
import "../util.js/constants";
import { ROLE_ADMIN, ROLE_OWNER, ROLE_WALKER } from '../util.js/constants';
import axios from "axios";
import base from "../services/base.service";



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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        onChange();
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
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



    const navigate=useNavigate();
    const [value, setValue] = useState(selectedValue);

    

    const onChange = async () => {
      
       
      const request = {
        id: user.id,
        role: user.role === ROLE_OWNER ? ROLE_WALKER : ROLE_OWNER,
      };
     
      console.log(request);
      console.log(user.token);
      return await axios
        .patch(`http://localhost:9000/korisnici/${user.id}/role`, request, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
          })
        .then(() => {
            console.log(request);
            navigate("/loginpage",
          {
            state: {user}
          }); 
        })
        .catch((e) => console.log(e));
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
               <Radio.Group onChange={showModal} value={value} size="middle" style={{ display: 'flex', marginLeft: '11%' }}>
               <Space direction="vertical">
                   <Radio value={1} style={{ color: '#919aa3', fontWeight: '490', padding: '5%' }} >Čuvar</Radio>
                   <Radio value={2} style={{ color: '#919aa3', fontWeight: '490', marginLeft: '5%' }} >Vlasnik</Radio>
               </Space>
               <Modal title="Promjeni ulogu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Potvrdi"
                      cancelText="Otkaži">
                    
                      <p>Da li ste sigurni da želite da promjenite ulogu?
                        Pri promjeni uloge potrebno je ponovo se prijaviti na nalog.
                      </p>
                      
                    </Modal>
               </Radio.Group> 
              
              
           ) : (
               <div>
                
               </div>
           )}
            
        </div>
    );
};

export default MainMenu;
  