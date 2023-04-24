import React, { useState, useEffect } from "react";
import { Modal, Layout, Rate, Descriptions, Space, Table, Avatar } from 'antd';
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { UserOutlined } from '@ant-design/icons';
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ROLE_ADMIN } from "../../util.js/constants";
const { Content, Sider } = Layout;

const desc = ['užasno', 'loše', 'normalno', 'dobro', 'odlično'];

export const UserIcon = styled.img `
  heigth: 40px;
  width: 40px;
`;

export const StyledTable = styled(Table) `
  width: 50%;
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

const ReviewPage = () => {
  
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tempReviews, setTempReviews] = useState([]);  
  const columns = [
    {
      title: 'Recenziju napisao',
      dataIndex: 'korisnikOd',
      width: '20%',
    },
    {
      title: 'Čuvar',
      dataIndex: 'korisnikZa',
      width: '20%',
    },
    {
      title: 'Ocjena',
      dataIndex: 'ocjena',
      width: '10%',
    },
    {
      title: 'Komentar',
      dataIndex: 'komentar',
    },
    
  ];

  

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReviews = await axios.get(`http://localhost:9000/recenzije`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const resUsers = await axios.get(`http://localhost:9000/korisnici`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const tempReviews = resReviews.data;
        const users = resUsers.data;
  
        let temp = [];
        let korisnikOd;
        let korisnikZa;
        let ocjena;
        let komentar;
        for (let i = 0; i < tempReviews.length; i++) {
          if (user.role === ROLE_ADMIN) {
            korisnikOd =
              users.find((element) => element.id === tempReviews.at(i).korisnikOdId)
                .firstName +
              " " +
              users.find((element) => element.id === tempReviews.at(i).korisnikOdId)
                .lastName;
  
            korisnikZa =
              users.find((element) => element.id === tempReviews.at(i).korisnikZaId)
                .firstName +
              " " +
              users.find((element) => element.id === tempReviews.at(i).korisnikZaId)
                .lastName;
            ocjena = tempReviews.at(i).ocjena;
            komentar = tempReviews.at(i).komentar;
            temp.push({
              korisnikOd,
              korisnikZa,
              ocjena,
              komentar,
            });
          } else {
            if (user.id === tempReviews.at(i).korisnikZaId) {
              korisnikOd =
                users.find((element) => element.id === tempReviews.at(i).korisnikOdId)
                  .firstName +
                " " +
                users.find((element) => element.id === tempReviews.at(i).korisnikOdId)
                  .lastName;
              korisnikZa = user.firstName + " " + user.lastName;
              ocjena = tempReviews.at(i).ocjena;
              komentar = tempReviews.at(i).komentar;
  
              temp.push({
                korisnikOd,
                korisnikZa,
                ocjena,
                komentar,
              });
            }
          }
          setReviews(temp);
        }
      }
      catch (e) {
        console.log(e);
      }
    }

    fetchData();
  },[reviews, users, tempReviews]);

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
            <StyledTable
              columns={columns}
              dataSource={reviews}
              pagination={false}
              style={{ height: '300px', overflow: 'auto', backgroundColor: 'white', borderRadius: '10px' }}  
            />
          </Cover>
        </Page>    
      </Content>
    </Layout>
  );
};

export default ReviewPage;