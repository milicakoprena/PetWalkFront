import styled from "styled-components";
import pozadina from "../resources/pozadina2.jpg"
import { useNavigate } from "react-router-dom";
import {Layout} from "antd";
import MainMenu from "../../components/MainMenu";
import { useState } from "react";
import { Column } from '@ant-design/plots';

 
const { Content, Sider } = Layout;
export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export const Cover = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color:rgba(143, 115, 143, 0.581);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const LoginButton = styled.div`
    width: 23%;
    height: 2em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    background-color: rgba(0,21,41,255);
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top: -70px;
    &:hover {
        transform: scale(1.15);
    }
`;


export const SignUpButton = styled.div`
    width: 23%;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    transition: 0.5s;
    font-size: 1.4em;
    text-decoration: underline;
    cursor: pointer;
    color: rgba(0,21,41,255);
    position: relative;
    border: 0pc;
    margin-top: -100px;
    background-color: transparent;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Logo = styled.img`
    width: 400px;
    height: auto;
    position: relative;
    margin-top: 50px;
`;

const StatisticsPage = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const data = [
        {
          mjeseci: 'jan',
          zarada: 38,
        },
        {
          mjeseci: 'feb',
          zarada: 52,
        },
        {
          mjeseci: 'mart',
          zarada: 61,
        },
        {
          mjeseci: 'april',
          zarada: 45,
        },
        {
          mjeseci: 'jun',
          zarada: 48,
        },
        {
          mjeseci: 'jul',
          zarada: 38,
        },
        {
          mjeseci: 'avgust',
          zarada: 38,
        },
        {
          mjeseci: 'sep',
          zarada: 38,
        },
      ];

      const config = {
        data,
        xField: 'mjeseci',
        yField: 'zarada',
        label: {
          
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          mjeseci: {
            alias: 'bla1',
          },
          zarada: {
            alias: 'bla2',
          },
          minColumnWidth: 20,
          maxColumnWidth: 20,
        },
      };

    return (
        <Layout hasSider>
            <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
                style={{
                    maxHeight: '103vh'
                }}>
                <MainMenu/>
            </Sider>
            <Content style={{ maxHeight: '103vh' }}>
               
                
                <Page  style={{
                    backgroundImage: `url(${pozadina})`,
                }}>
                   <Column {...config} 
                   style={{
                    height: '80%',
                    width: '80%'
                }}>

                </Column>
                   
                </Page>
            </Content>
        </Layout> 
    );
};

export default StatisticsPage;
