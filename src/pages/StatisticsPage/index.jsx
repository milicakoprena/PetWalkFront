import pozadina from "../resources/pozadina2.jpg"
import {Layout} from "antd";
import MainMenu from "../../components/MainMenu";
import { useState } from "react";
import { Column } from '@ant-design/plots';
import { Page1 } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const StatisticsPage = () => {
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
               
                
                <Page1  style={{
                    backgroundImage: `url(${pozadina})`,
                }}>
                   <Column {...config} 
                   style={{
                    height: '80%',
                    width: '80%'
                }}>

                </Column>
                   
                </Page1>
            </Content>
        </Layout> 
    );
};

export default StatisticsPage;
