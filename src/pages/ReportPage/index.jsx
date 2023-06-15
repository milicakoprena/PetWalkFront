import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import MainMenu from "../../components/MainMenu";
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_ADMIN } from "../../util.js/constants";
import { Page, Cover, StyledTable } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const ReportPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [reports, setReports] = useState([]);

  const columnsAdmin = [
    {
      title: 'Čuvar',
      dataIndex: 'userName',
      width: '20%',
    },
    {
      title: 'Vlasnik',
      dataIndex: 'ownerName',
      width: '20%',
    },
    {
      title: 'Ljubimac',
      dataIndex: 'petName',
      width: '15%',
    },
    {
      title: 'Izvještaj',
      dataIndex: 'content',
      width: '45%',
    },
  ];

  const columnsOwner = [
    {
      title: 'Čuvar',
      dataIndex: 'userName',
      width: '25%',
    },
    {
      title: 'Ljubimac',
      dataIndex: 'petName',
      width: '25%',
    },
    {
      title: 'Izvještaj',
      dataIndex: 'content',
      width: '50%',
    },
  ];
  
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
      for(let i=0; i<res.data.length; i++) {
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
        
        if (user.role===ROLE_ADMIN) {
          tempReport = {
            userName: users.find(element => element.id === userId).firstName + " " + users.find(element => element.id === userId).lastName,
            ownerName: users.find(element => element.id === ownerId).firstName + " " + users.find(element => element.id === ownerId).lastName,
            petName: pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
            key: i,
            content: res.data.at(i).sadrzaj,
          }
          temp.push(tempReport);
        }
        else {
          if(user.id===ownerId){
            tempReport = {
              userName: users.find(element => element.id === userId).firstName + " " + users.find(element => element.id === userId).lastName,
              ownerName: user.firstName + " " + user.lastName,
              petName: pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
              key: i,
              content: res.data.at(i).sadrzaj,
            }
            temp.push(tempReport);
          }
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
        <MainMenu/>
      </Sider>
      <Content style={{ maxHeight: '103vh' }}>
        <Page>
          <Cover style={{
            maxHeight: '103vh',
            backgroundImage: `url(${pozadina})`,
          }} >
            {user.role===ROLE_ADMIN ? (
              <StyledTable
              columns={columnsAdmin}
              dataSource={reports}
              pagination={false}
              style={{ maxHeight: '400px', overflow: 'auto', borderRadius: '10px' }}
            />
            ) : (
              <StyledTable
              columns={columnsOwner}
              dataSource={reports}
              pagination={false}
              style={{ maxHeight: '400px', overflow: 'auto', borderRadius: '10px' }}
            />
            )}
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default ReportPage;