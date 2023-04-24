import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Table, List } from 'antd';
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

export const UserIcon = styled.img `
  heigth: 40px;
  width: 40px;
`;

export const StyledTable = styled(Table) `
  width: 70%;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%);
`;

export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Cover = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ReportPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:9000/korisnici`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
    .then((res) => {
        console.log("users", res.data);
        setUsers(res.data);
        console.log("korisnici", users);
    })
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/izvjestaji`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => {
                let temp = [];
                let tempReport = '';
                for (let i = 0; i < res.data.length; i++) {
                    let userId = res.data.at(i).korisnikId;
                    console.log(userId);

                    tempReport = {
                        name: users.find(element => element.id === userId).firstName + " " + users.find(element => element.id === userId).lastName,
                        key: i,
                        content: res.data.at(i).sadrzaj,
                    }

                    temp.push(tempReport);
                    console.log("TEMP", tempReport);
                }

                setReports(temp);
                console.log("REPORTS",reports);
            })
            .catch((e) => console.log(e));
  }, [reports, user.token, users]);

  
    
  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)} 
        style={{
          maxHeight: '103vh'
        }}>
        <MainMenu/>
      </Sider>
      <Content style={{ maxHeight: '103vh' }}>
        <Page>
          <Cover style={{
            maxHeight: '103vh',
            backgroundImage: `url(${pozadina})`,
          }} >
            <div style={{ maxHeight: '400px', width: '800px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px', 
              boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', paddingLeft: '2%', paddingRight: '2%' }}>
              <List
                itemLayout="horizontal"
                dataSource={reports}
                pagination={false}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default ReportPage;