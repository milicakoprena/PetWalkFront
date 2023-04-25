import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Table } from 'antd';
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_ADMIN } from "../../util.js/constants";

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
      console.log("users", res.data);
      setUsers(res.data);
      console.log("korisnici", users);
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
      console.log("pets", pets);
    })
    .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/izvjestaji`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      console.log("res", res.data);

      let temp = [];
      let tempReport = '';
      for (let i = 0; i < res.data.length; i++) {
        let userId = res.data.at(i).korisnikId;
        let ownerId = pets.find(element => element.id === res.data.at(i).ljubimacId).vlasnikId;
        console.log(ownerId);
        
        if (user.role===ROLE_ADMIN) {
          tempReport = {
            userName: users.find(element => element.id === userId).firstName + " " + users.find(element => element.id === userId).lastName,
            ownerName: users.find(element => element.id === ownerId).firstName + " " + users.find(element => element.id === ownerId).lastName,
            petName: pets.find(element => element.id === res.data.at(i).ljubimacId).ime,
            key: i,
            content: res.data.at(i).sadrzaj,
          }
          temp.push(tempReport);
          console.log("TEMP", tempReport);
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
            console.log("TEMP", tempReport);
          }
        }
      }

      setReports(temp);
      console.log("REPORTS",reports);
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