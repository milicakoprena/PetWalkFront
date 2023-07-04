import React, { useState, useEffect } from "react";
import { Layout, List } from 'antd';
import MainMenu from "../../components/MainMenu";
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Page, Cover } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const ReportPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/korisnici`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/ljubimci`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          temp.push({
            id: res.data.at(i).id,
            ime: res.data.at(i).ime,
            vlasnikId: res.data.at(i).korisnikId,
          })
        }
        setPets(temp);
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
          let ownerId = pets.find(element => element.id === res.data.at(i).ljubimacId).vlasnikId;

          if (user.id === ownerId) {
            tempReport = {
              userName: users.find(element => element.id === userId).firstName + " " + users.find(element => element.id === userId).lastName,
              ownerName: user.firstName + " " + user.lastName,
              petName: pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
              key: i,
              content: res.data.at(i).sadrzaj,
              date: res.data.at(i).datum,
            }
            temp.push(tempReport);
          }

        }

        setReports(temp);
      })
      .catch((e) => console.log(e));
  }, [pets, reports, user.firstName, user.id, user.lastName, user.role, user.token, users]);



  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} collapsedWidth="100px" onCollapse={(value) => setCollapsed(value)}
        style={{
          maxHeight: '103vh'
        }}>
        <MainMenu />
      </Sider>
      <Content style={{ maxHeight: '103vh' }}>
        <Page>
          <Cover style={{
            maxHeight: '103vh',
            backgroundImage: `url(${pozadina})`,
          }} >

            <div style={{
              maxHeight: '400px', width: '600px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px',
              boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)', paddingLeft: '2%', paddingRight: '2%'
            }}>
              <List
                itemLayout="horizontal"
                dataSource={reports}
                pagination={false}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.userName}
                      description={
                        <div style={{ display: "flex", flexDirection: 'column' }}>

                          <text>Ime ljubimca: {item.petName}</text>
                          <text>Sadržaj: {item.content}</text>
                          <text>Datum čuvanja: {item.date}</text>
                        </div>
                      }
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