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
import { useNavigate } from 'react-router';
  

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
    getItem('Lista vlasnika', "/ownerlist", <UnorderedListOutlined />),
    getItem('Lista čuvara', "/walkerlist", <TeamOutlined />),
    getItem('Izvještaji', "/reportpage", <FormOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Pregled prijava problema', "/reportproblemview", <ExclamationCircleOutlined />),
]

let items = walkerItems;

export const HeaderImage = styled.img`
    width: 40px;
    height: 40px;
`;

const MainMenu = () => {
    const navigate=useNavigate();
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value===1)
        {
            items=walkerItems;
        }
        else if(e.target.value===2)
        {
            items=ownerItems;
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
            <Menu theme="dark"  mode="inline" items={items} onClick={({key}) => navigate(key)} />
            <Radio.Group onChange={onChange} value={value} size="middle" style={{ display: 'flex', marginLeft: '11%' }}>
                <Space direction="vertical">
                    <Radio value={1} style={{ color: '#919aa3', fontWeight: '490', padding: '5%' }} >Čuvar</Radio>
                    <Radio value={2} style={{ color: '#919aa3', fontWeight: '490', marginLeft: '5%' }} >Vlasnik</Radio>
                </Space>
            </Radio.Group>
        </div>
    );
};

export default MainMenu;
  