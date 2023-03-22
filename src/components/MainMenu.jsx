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
  import { Menu } from 'antd';
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
  const items = [
    getItem('Uredi profil', "/editprofile", <EditOutlined />),
    getItem('Lista ljubimaca', "/petlist", <UnorderedListOutlined />),
    getItem('Dodaj ljubimca', "/addpetpage", <PlusCircleOutlined />),
    getItem('Izvještaj', "/reportpage", <FormOutlined />),
    getItem('Mapa', "/mappage", <EnvironmentOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
    getItem('Lista čuvara', "/walkerlist", <TeamOutlined />),
  ];

  export const HeaderImage = styled.img`
  width: 40px;
  height: 40px;
`;

  const MainMenu = () => {
    const navigate=useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} 
        style={{
          minHeight: '100vh',
        }}>
        <div
          style={{
            height: 40,
            margin: 16,
            background: 'rgba(0, 0, 0, 0)',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <HeaderImage src={require('../pages/resources/walking-the-dog.png')} />
        </div>
        <Menu theme="dark"  mode="inline" items={items} onClick={({key}) => navigate(key)}/>
      </div>
    );
  };
  export default MainMenu;
  