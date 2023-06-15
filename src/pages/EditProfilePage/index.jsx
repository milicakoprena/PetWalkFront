import React, { useState } from "react";
import { Layout } from 'antd';
import MainMenu from "../../components/MainMenu";
import EditProfile from "../../components/EditProfile";

const { Content, Sider } = Layout;

const EditProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
        style={{
          maxHeight: '103vh'
        }}>
        <MainMenu/>
      </Sider>
      <Content style={{ maxHeight: '103vh' }}>
        <EditProfile/>
      </Content>
    </Layout>
  );
};

export default EditProfilePage;