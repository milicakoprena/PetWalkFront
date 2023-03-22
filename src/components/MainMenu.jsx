import {
    EnvironmentOutlined, 
    NotificationOutlined, 
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
    getItem('Dodaj ljubimca', "/addpetpage", <NotificationOutlined />),
    getItem('Izvještaj', "/reportpage", <FormOutlined />),
    getItem('Mapa', "/map", <EnvironmentOutlined />),
    getItem('Recenzije', "/reviewpage", <StarOutlined />),
    getItem('Prijava problema', "/reportproblem", <ExclamationCircleOutlined />),
    getItem('Lista čuvara', "/walkerlist", <TeamOutlined />),
  ];

  export const HeaderImage = styled.img`
  width: 40px;
  height: 40px;
`;

  const MainMenu = () => {
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
          <HeaderImage src={require('C:/Users/Korisnik/Desktop/petwalk/PetWalkFront/src/pages/resources/walking-the-dog.png')} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["/editprofile"]} mode="inline" items={items} />
      </div>
    );
  };
  export default MainMenu;
  