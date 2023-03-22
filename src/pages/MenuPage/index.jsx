import React from 'react';
import { useState } from 'react';
import MainMenu from '../../components/MainMenu';
import {  Layout } from 'antd';

const { Header, Content, Sider } = Layout;

const MenuPage = () => {
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
                    content
                </Content>
            </Layout>
        </Layout>
    );
}

export default MenuPage;