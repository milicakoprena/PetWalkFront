import pozadina from "../resources/pozadina2.jpg"
import { Layout } from "antd";
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

  const months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  useEffect(() => {
    let tempData = [];
    for (let i = 0; i < currentMonth; i++) {
      tempData.push({
        mjesec: months[i],
        zarada: i + 4,
        vrijeme: i + 2,
      });
    }
    setData(tempData);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:9000/rasporedi/monthlyTotals/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setData(prevData => {
          const updatedData = [...prevData];
          for (let i = 0; i < response.data.length; i++) {
            updatedData[response.data.at(i).month - 1].zarada = response.data.at(i).totalPrice;
            updatedData[response.data.at(i).month - 1].vrijeme = response.data.at(i).totalTime;
          }
          return updatedData;
        });
        console.log("data ", data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [data]);



  const config = {
    data,
    isGroup: true,
    xField: 'mjesec',
    yField: ['zarada', 'vrijeme'],
    seriesField: 'name',
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
      mjesec: {
        alias: 'Mjesec',
      },
      zarada: {
        alias: 'Zarada',
      },
      vrijeme: {
        alias: 'Vrijeme rada',
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
        <MainMenu />
      </Sider>
      <Content style={{ maxHeight: '103vh' }}>
        <Page1 style={{
          backgroundImage: `url(${pozadina})`,
        }}>
          <Column {...config}
            style={{
              height: '80%',
              width: '80%'
            }}/>
        </Page1>
      </Content>
    </Layout>
  );
};

export default StatisticsPage;
