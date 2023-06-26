import pozadina from "../resources/pozadina2.jpg"
import {Layout} from "antd";
import MainMenu from "../../components/MainMenu";
import { useState } from "react";
import { Column } from '@ant-design/plots';
import { Page1 } from "../../components/CssComponents";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const { Content, Sider } = Layout;



const StatisticsPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const userState = useLocation();
    const user = userState.state.user;
    const [data, setData] = useState([]); 
    useEffect(() => {
      axios.get(`http://localhost:9000/rasporedi/monthlyTotals/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        let dataTemp = [];
        console.log(response);
        for(let i = 0; i < response.data.length; i++){
        dataTemp.push({
          mjeseci: months[response.data.at(i).month - 1],
          zarada: response.data.at(i).totalPrice,
        });
      }
       setData(dataTemp);
      })
      .catch((e) => {
        console.log(e);
      });
    }, [data]);

    const months = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'];

    

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
            alias: 'Mjesec',
          },
          zarada: {
            alias: 'Zarada',
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
