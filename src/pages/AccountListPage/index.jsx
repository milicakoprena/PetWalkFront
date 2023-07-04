import React, { useState, useEffect } from "react";
import {
  Modal,
  Layout,
  Button,
  Rate,
  Input,
  FloatButton,
  Avatar,
  Divider,
} from "antd";
import MainMenu from "../../components/MainMenu";
import { List, Select } from "antd";
import axios from "axios";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import {
  ROLE_OWNER,
  ROLE_WALKER,
  STATUS_ACTIVE,
  STATUS_BLOCKED,
} from "../../util.js/constants";
import { Page, Cover } from "../../components/CssComponents";

const { Content, Sider } = Layout;

const AccountListPage = () => {
  const [isCalled, setIsCalled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const userState = useLocation();
  const user = userState.state.user;
  const [users, setUsers] = useState([]);
  const [usersTemp, setUsersTemp] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [usersResult, setUsersResult] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRates, setAverageRates] = useState([]);
  const [selWalkerPhoto, setSelWalkerPhoto] = useState("");
  const [pets, setPets] = useState([]);
  const [reports, setReports] = useState([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [rolesFilter, setRolesFilter] = useState([]);
  const [roleFilterName, setRoleFilterName]=useState('');

  const searchByUsername = () => {
    setIsCalled(false);
    for (let i = 0; i < usersTemp.length; i++) {
      if (
        usersTemp
          .at(i)
          .username.toLowerCase()
          .includes(searchedUsername.toLowerCase())
      ) {
        usersResult.push(usersTemp.at(i));
      }
      setUsers(usersResult);
      setUsersResult([]);
    }
    setIsModalOpen(false);
  };

  const selectRole = (event) => {
    setRoleFilterName(event);
  };

  const filterByRole = () => {
    setIsCalled(false);
    axios.get(`http://localhost:9000/korisnici/filterByRole/${roleFilterName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      let temp = [];
      for(let i = 0; i < usersTemp.length; i++){
        for(let j = 0; j < res.data.length; j++){
          if(usersTemp.at(i).id === res.data.at(j).id)
          {
            temp.push(usersTemp.at(i));
          }
        }
      }
      setUsers(temp);
    })
    .catch((e) => console.log(e));
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/recenzije/prosjecnaOcjena`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        let temp = [];
        for (let i = 0; i < response.data.length; i++) {
          temp.push({
            id: response.data.at(i).left,
            average: response.data.at(i).right,
          });
        }
        setAverageRates(temp);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`http://localhost:9000/korisnici`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (isCalled && (searchedUsername === "" || roleFilterName===undefined)) {
          let temp = [];
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data.at(i).role === ROLE_WALKER ||
              res.data.at(i).role === ROLE_OWNER
            )
              temp.push({
                id: res.data.at(i).id,
                imageName: res.data.at(i).photo,
                image: "",
                name: res.data.at(i).firstName + " " + res.data.at(i).lastName,
                username: res.data.at(i).username,
                email: res.data.at(i).email,
                description: res.data.at(i).description,
                role: res.data.at(i).role,
                status: res.data.at(i).status,
                averageRate: averageRates?.find(
                  (element) => element.id === res.data.at(i).id
                )?.["average"],
              });
          }
          setUsers(temp);
          setUsersTemp(users);
        }
      })
      .catch((e) => console.log(e));

      axios
      .get(`http://localhost:9000/ljubimci`, {
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
          });
        }
        setPets(temp);
      })
      .catch((e) => console.log(e));
  }, [isCalled, user.token, searchedUsername, averageRates, users]);

  const changeStatus = () => {
    const request = {
      status:
        selectedUser.status === STATUS_ACTIVE ? STATUS_BLOCKED : STATUS_ACTIVE,
    };

    axios
      .patch(
        `http://localhost:9000/korisnici/${selectedUser.id}/status`,
        request,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        setSelectedUser(null);
        //window.location.reload(true);
        setIsModalOpen2(false);
      })
      .catch((e) => console.log(e));
  };

  const showModal3 = (item) => {
    axios
      .get(`http://localhost:9000/korisnici/image/${item.imageName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          responseType: "arraybuffer",
          "Content-Type": "image/jpeg",
        },
      })
      .then((response) => {
        let temp = {
          image: `data:image/jpeg;base64,${response.data}`,
          imageName: item.imageName,
          name: item.name,
        };
        setSelWalkerPhoto(temp);
      })
      .catch((response) => {
        let temp = {
          image: "",
          imageName: "",
          name: item.name,
        };
        setSelWalkerPhoto(temp);
      });

    axios
      .get(`http://localhost:9000/recenzije`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data.at(i).korisnikZaId === item.id) {
            let tempImg = users.find(
              (element) => element.id === res.data.at(i).korisnikOdId
            ).imageName;
            axios
              .get(`http://localhost:9000/korisnici/image/${tempImg}`, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  responseType: "arraybuffer",
                  "Content-Type": "image/jpeg",
                },
              })
              .then((response) => {
                temp.push({
                  rating: res.data.at(i).ocjena,
                  comment: res.data.at(i).komentar,
                  date: res.data.at(i).datum.slice(0, 10),
                  image: `data:image/jpeg;base64,${response.data}`,
                  name: users.find(
                    (element) => element.id === res.data.at(i).korisnikOdId
                  ).name,
                });
              })
              .catch((response) => {
                temp.push({
                  rating: res.data.at(i).ocjena,
                  comment: res.data.at(i).komentar,
                  date: res.data.at(i).datum,
                  image: "",
                  name: users.find(
                    (element) => element.id === res.data.at(i).korisnikOdId
                  ).name,
                });
              });
          }
        }
        setReviews(temp);
        
      });
    setIsModalOpen3(true);
  };

  const showModal4 = (item) => {
    axios
      .get(`http://localhost:9000/korisnici/image/${item.imageName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          responseType: "arraybuffer",
          "Content-Type": "image/jpeg",
        },
      })
      .then((response) => {
        let temp = {
          image: `data:image/jpeg;base64,${response.data}`,
          imageName: item.imageName,
          name: item.name,
        };
        setSelWalkerPhoto(temp);
      })
      .catch((response) => {
        let temp = {
          image: "",
          imageName: "",
          name: item.name,
        };
        setSelWalkerPhoto(temp);
      });

    axios
      .get(`http://localhost:9000/izvjestaji`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          let userId = res.data.at(i).korisnikId;
          if (item.id === pets.find((element) => element.id === res.data.at(i).ljubimacId).vlasnikId) {
            let tempImg = users.find(
              (element) => element.id === res.data.at(i).korisnikId
            ).imageName;
            axios
            .get(`http://localhost:9000/korisnici/image/${tempImg}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
                responseType: "arraybuffer",
                "Content-Type": "image/jpeg",
              },
            })
            .then((response) => {
              temp.push({
                userName: users.find((element) => element.id === userId).name,
                userPhoto: `data:image/jpeg;base64,${response.data}`,
                petName: pets.find(
                  (element) => element.id === res.data.at(i).ljubimacId
                ).ime,
                key: i,
                content: res.data.at(i).sadrzaj,
                date: res.data.at(i).datum,
              });
            })
            .catch((response) => {
              temp.push({
                userName: users.find((element) => element.id === userId).name,
                userPhoto: "",
                petName: pets.find(
                  (element) => element.id === res.data.at(i).ljubimacId
                ).ime,
                key: i,
                content: res.data.at(i).sadrzaj,
                date: res.data.at(i).datum,
              });
            });
          }
          setReports(temp);
        }
        setIsModalOpen4(true);
      })
      .catch((e) => console.log(e));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    changeStatus();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
    setReviews([]);
    setSelWalkerPhoto("");
  };

  const handleCancel4 = () => {
    setIsModalOpen4(false);
    setReports([]);
    setSelWalkerPhoto("");
  };

  const showFilterModal = () => {

    rolesFilter.push({
      value: "CUVAR",
      label: "Čuvar"
    });
    rolesFilter.push({
      value: "VLASNIK",
      label: "Vlasnik"
    });

    setIsFilterModalOpen(true);
  };

  const handleCancelFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth="100px"
        onCollapse={(value) => setCollapsed(value)}
        style={{
          maxHeight: "103vh",
        }}
      >
        <MainMenu />
      </Sider>
      <Content style={{ maxHeight: "103vh" }}>
        <Page>
          <Cover>
            <div
              style={{
                maxHeight: "96%",
                width: "100%",
                overflow: "auto",
                backgroundColor: "white",
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={users}
                pagination={false}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginRight: "20px",
                            }}
                          >
                            {item.role === ROLE_WALKER ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "baseline",
                                }}
                              >
                                <Rate
                                  disabled
                                  allowHalf
                                  value={item.averageRate}
                                  style={{ marginRight: "8px" }}
                                />
                                {item.averageRate}
                              </div>
                            ) : (
                              <div></div>
                            )}
                            <text style={{ color: "black" }}>
                              Korisničko ime: {item.username}
                            </text>
                            <text style={{ color: "black" }}>
                              E-mail: {item.email}
                            </text>
                            <text style={{ color: "black" }}>
                              Uloga: {item.role}
                            </text>
                            <text style={{ color: "black" }}>
                              Status naloga: {item.status === STATUS_ACTIVE ? 'AKTIVAN' : 'BLOKIRAN'}
                            </text>
                            <text style={{ textAlign: "justify" }}>
                              {item.description}
                            </text>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyItems: "end",
                              marginTop: "-5px",
                            }}
                          >
                            <Button
                              type="default"
                              onClick={() => {
                                setSelectedUser(item);
                                setIsModalOpen2(true);
                              }}
                            >
                              Promijeni status
                            </Button>
                            {item.role === ROLE_WALKER ? (
                              <Button
                                type="default"
                                style={{ marginTop: "8px" }}
                                onClick={() => {
                                  showModal3(item);
                                }}
                              >
                                Recenzije
                              </Button>
                            ) : (
                              <Button
                                type="default"
                                style={{ marginTop: "8px" }}
                                onClick={() => {
                                  showModal4(item);
                                }}
                              >
                                Izvještaji
                              </Button>
                            )}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>

            <Modal
              title="Promjena statusa"
              open={isModalOpen2}
              onOk={handleOk}
              onCancel={handleCancel2}
              width={650}
              okText="Promijeni"
              cancelText="Otkaži"
            >
              Da li stvarno želiš da promijeniš status ovog naloga?
            </Modal>

            <Modal
              title="Recenzije"
              open={isModalOpen3}
              onCancel={handleCancel3}
              footer={[
                <Button key="back" onClick={handleCancel3}>
                  Izađi
                </Button>,
              ]}
            >
              <div style={{ height: "400px", overflow: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <Avatar
                    src={selWalkerPhoto.image}
                    style={{
                      marginLeft: "42px",
                      marginTop: "30px",
                      marginBottom: "20px",
                      scale: "3",
                    }}
                  />
                  <p style={{ marginLeft: "62px", fontSize: "25px" }}>
                    {selWalkerPhoto.name}
                  </p>
                </div>
                <Divider />
                <List
                  itemLayout="horizontal"
                  dataSource={reviews}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={item.image}
                            style={{
                              marginTop: "22px",
                              scale: "1.4",
                              marginLeft: "10px",
                            }}
                          />
                        }
                        title={item.name}
                        description={
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "baseline",
                              }}
                            >
                              <Rate disabled value={item.rating} />
                              <text>({item.rating})</text>
                            </div>
                            <text style={{ color: "black" }}>
                              {item.comment}
                            </text>
                            <text>{item.date}</text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Modal>

            <Modal
              title="Izvještaji"
              open={isModalOpen4}
              onCancel={handleCancel4}
              footer={[
                <Button key="back" onClick={handleCancel4}>
                  Izađi
                </Button>,
              ]}
            >
              <div style={{ height: "400px", overflow: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <Avatar
                    src={selWalkerPhoto.image}
                    style={{
                      marginLeft: "42px",
                      marginTop: "30px",
                      marginBottom: "20px",
                      scale: "3",
                    }}
                  />
                  <p style={{ marginLeft: "62px", fontSize: "25px" }}>
                    {selWalkerPhoto.name}
                  </p>
                </div>
                <Divider />
                <List
                  itemLayout="horizontal"
                  dataSource={reports}
                  pagination={false}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.userName}
                        avatar={
                          <Avatar
                            src={item.userPhoto}
                            style={{
                              marginTop: "22px",
                              scale: "1.4",
                              marginLeft: "10px",
                            }}
                          />
                        }
                        description={
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
            </Modal>
            <FloatButton
              icon={<SearchOutlined />}
              type="primary"
              style={{ right: 40, top: 10 }}
              onClick={showModal}
            />
            <FloatButton icon={<FilterOutlined />} type="primary" style={{ right: 95, top: 10 }} onClick={showFilterModal} />
            <Modal
              title="Pretraživanje po korisničkom imenu"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <Button
                  key="1"
                  onClick={searchByUsername}
                  style={{ backgroundColor: "#9ac2f7" }}
                >
                  Pretraži
                </Button>,
                <Button
                  key="2"
                  onClick={() => {
                    setSearchedUsername("");
                    setIsCalled(true);
                    setIsModalOpen(false);
                  }}
                  style={{ backgroundColor: "#c6daf4" }}
                >
                  Resetuj
                </Button>,
                <Button key="3" onClick={handleCancel}>
                  Otkaži
                </Button>,
              ]}
            >
              <Input
                placeholder="Unesi korisničko ime"
                value={searchedUsername}
                onChange={(e) => setSearchedUsername(e.target.value)}
              />
            </Modal>

            <Modal title="Filtriranje" open={isFilterModalOpen} onOk={filterByRole} onCancel={handleCancelFilterModal} okText="Filtriraj" cancelText="Otkaži" >
              <Select size="middle" 
                placeholder="Izaberite ulogu"
                allowClear
                style={{
                  width: '100%',
                  marginBottom: '3%',
                  marginTop: '3%'
                }}
                options={rolesFilter}
                onChange={selectRole}/>
            </Modal>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default AccountListPage;
