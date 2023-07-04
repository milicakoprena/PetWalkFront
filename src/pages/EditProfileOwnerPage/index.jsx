import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Layout } from 'antd';
import EditProfile from '../../components/EditProfile';

const { Content, Sider } = Layout;

const EditProfileOwnerPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)}
        style={{
          minHeight: '103vh',
        }}>
        <MainMenu />
      </Sider>
      <Content style={{ maxHeight: '103vh' }} >
        <EditProfile />
      </Content>
    </Layout>
  );
};

export default EditProfileOwnerPage;