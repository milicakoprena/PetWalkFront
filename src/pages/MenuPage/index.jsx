import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

const MenuPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} style={{
                    minHeight: '100vh',
                    }}>
                <MainMenu></MainMenu>
            </Sider>
            <Content>
                content
            </Content>
        </Layout>
    );
}

export default MenuPage;