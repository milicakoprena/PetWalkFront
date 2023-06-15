import React, { useState, useEffect } from "react";
import { Layout, Rate, List } from 'antd';
import MainMenu from "../../components/MainMenu";
import pozadina from "../resources/pozadina2.jpg"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Page, Cover } from "../../components/CssComponents";
const { Content, Sider } = Layout;

const ReviewPage = () => {
  
  const userState = useLocation();
  const user = userState.state.user;
  const [reviews, setReviews] = useState([]);
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
          if (user.id === tempReviews.at(i).korisnikZaId) {
            korisnikOd =
              users.find((element) => element.id === tempReviews.at(i).korisnikOdId).firstName 
              + " " +
              users.find((element) => element.id === tempReviews.at(i).korisnikOdId).lastName;
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
      catch (e) {
        console.log(e);
      }
    }
    fetchData();
  },[reviews, user.token, user.role, user.id, user.firstName, user.lastName]);

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
                  dataSource={reviews}
                  pagination={false}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.korisnikOd}
                        description={
                          <div style={{ display: "flex", flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }} >
                              <Rate disabled defaultValue={item.ocjena} />
                              <text>({item.ocjena})</text>
                            </div>
                            <text>{item.komentar}</text>
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

export default ReviewPage;