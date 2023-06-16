import React, { useState, useEffect } from "react";
import {
  Modal,
  Layout,
  Button,
  Rate,
  Input,
  message,
  InputNumber,
  DatePicker,
} from "antd";
import styled from "styled-components";
import MainMenu from "../../components/MainMenu";
import { Space, Table, FloatButton, Select } from "antd";
import { Descriptions, List } from "antd";
import {
  UserOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Avatar } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CATEGORY_NUDIM, CATEGORY_TRAZIM, ROLE_ADMIN } from "../../util.js/constants";
import pozadina from "../resources/pozadina2.jpg";
import dayjs from "dayjs";
import { Page, Cover, StyledSelect } from "../../components/CssComponents";

const { Content, Sider } = Layout;
const desc = ["užasno", "loše", "normalno", "dobro", "odlično"];
const { TextArea } = Input;

const AdListPage = () => {
  const userState = useLocation();
  const user = userState.state.user;

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [prices, setPrices] = useState([]);
  const [placesFilter, setPlacesFilter] = useState([]);

  const [placeFilterName, setPlaceFilterName] = useState("");
  const [isCalled, setIsCalled] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [sadrzaj, setSadrzaj] = useState("");
  const [kategorije, setKategorije] = useState([]);
  const [kategorijeSelect, setKategorijeSelect] = useState([]);
  const [kategorija, setKategorija] = useState("");
  const [kategorijaFilter, setKategorijaFilter] = useState("");

  const [allAds, setAllAds] = useState([]);
  const [allAdsTemp, setAllAdsTemp] = useState([]);
  const [categoryFilterName, setCategoryFilterName] = useState("");
  const [selectedAd, setSelectedAd] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isWalkerModalOpen, setIsWalkerModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState(1);
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [dateWalker, setDateWalker] = useState("");
  const [pets, setPets] = useState([]);
  const [money, setMoney] = useState("");
  const [pet, setPet] = useState("");

  const [userPets, setUserPets] = useState([]);
  const [types, setTypes] = useState([]);

  const [isPetsModalOpen, setIsPetsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filterByCategory = () => {
    setIsCalled(false);
    axios
      .get(`http://localhost:9000/oglasi/kategorija/${kategorijaFilter}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let temp = [];
        for (let i = 0; i < allAdsTemp.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (allAdsTemp.at(i).id === res.data.at(j).id) {
              temp.push(allAdsTemp.at(i));
            }
          }
        }
        setAllAds(temp);
        setIsFilterModalOpen(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/kategorije`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          temp.push({
            value: res.data.at(i).id,
            label: res.data.at(i).kategorija,
          });
          setKategorije(temp);
        }
      })
      .catch((e) => console.log(e));

    if (isCalled || kategorijaFilter === undefined) {
      axios
        .get(`http://localhost:9000/korisnici`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch((e) => console.log(e));

      axios
        .get(`http://localhost:9000/oglasi`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          let temp = [];

          for (let i = 0; i < res.data.length; i++) {
            if (user.id != res.data.at(i).korisnikId) {
              let adId = res.data.at(i).id;
              let userName =
                allUsers?.find(
                  (element) => element.id === res.data.at(i).korisnikId
                )?.["firstName"] +
                " " +
                allUsers?.find(
                  (element) => element.id === res.data.at(i).korisnikId
                )?.["lastName"];
              if (res.data.at(i).status === true)
                temp.push({
                  id: adId,
                  name: userName,
                  info: res.data.at(i).sadrzaj,
                  date: res.data.at(i).datum.slice(0, 10),
                  categoryId: res.data.at(i).kategorijaId,
                  category: kategorije?.find(
                    (element) => element.value === res.data.at(i).kategorijaId
                  )?.["label"],
                  userId: res.data.at(i).korisnikId,
                });
            }

          }
          setAllAds(temp);
          setAllAdsTemp(temp);
        })
        .catch((e) => console.log(e));
    }
  }, [allAds, allUsers]);

  const showModal = async (item) => {
    try {
      let temp = allUsers.find((element) => element.id === item.userId);
      console.log(item);
      let locationId = 0;
      await axios
        .get(`http://localhost:9000/lokacije`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          locationId = response.data?.find(
            (element) => element.korisnikId === temp.id
          )?.["mjestoId"];
        })
        .catch((error) => {
          console.log(error);
        });

      let location = "";
      await axios
        .get(`http://localhost:9000/mjesta`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          location = response.data?.find(
            (element) => element.id === locationId
          )?.["naziv"];
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`http://localhost:9000/korisnici/image/${temp.photo}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            responseType: "arraybuffer",
            "Content-Type": "image/jpeg",
          },
        })
        .then((response) => {
          let temp2 = {
            image: `data:image/jpeg;base64,${response.data}`,
            imageName: temp.imageName,
            id: temp.id,
            firstName: temp.firstName,
            lastName: temp.lastName,
            phoneNumber: temp.phoneNumber,
            location: location,
            description: temp.description,
            role: temp.role,
            category: item.category,
          };
          setSelectedUser(temp2);
        })
        .catch((response) => {
          let temp2 = {
            image: "",
            imageName: "",
            id: temp.id,
            firstName: temp.firstName,
            lastName: temp.lastName,
            phoneNumber: temp.phoneNumber,
            location: location,
            description: temp.description,
          };
          setSelectedUser(temp2);
        });
    } catch (e) {
      console.log(e);
    }

    setIsModalOpen(true);
  };

  const showAdModal = () => {
    console.log(kategorijeSelect);
    setIsAdModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteModal = (item) => {
    setIsDeleteModalOpen(true);
  }

  const deleteAd = async () => {
    console.log(selectedAd);
    try {
      await axios.delete(`http://localhost:9000/oglasi/${selectedAd.id}`, {
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
      })
      .then(() => {
          console.log("obrisano");
          //window.location.reload(true);
      })
      .catch((e) => {
          console.log(e);
      })
      setIsDeleteModalOpen(false);
  }
  catch(error) {
      console.log(error);
  }
  }

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const showFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCancelFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleCancelAdModal = () => {
    setIsAdModalOpen(false);
  };

  const showPetsModal = async () => {
    console.log(selectedUser);

    axios.get(`http://localhost:9000/vrste`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          temp.push({
            id: res.data.at(i).id,
            naziv: res.data.at(i).naziv,
          })
        }
        setTypes(res.data);
      })
      .catch((e) => console.log(e));

    axios.get(`http://localhost:9000/ljubimci`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        let tempArray = [];
        let tempPet = '';

        for (let i = 0; i < res.data.length; i++) {

          let image = '';
          axios.get(`http://localhost:9000/ljubimci/image/${res.data.at(i).slika}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              responseType: 'arraybuffer',
              "Content-Type": 'image/jpeg',
            }
          })
            .then((response) => {

              image = `data:image/jpeg;base64,${response.data}`;
              console.log("IMAGE", image);
              let userId = res.data.at(i).korisnikId;
              let typeId = res.data.at(i).vrstaId;

              if (userId === selectedUser.id) {
                tempPet = {
                  imageName: res.data.at(i).slika,
                  image: image,
                  id: res.data.at(i).id,
                  ime: res.data.at(i).ime,
                  opis: res.data.at(i).opis,
                  vrsta: types?.find(element => element.id === typeId)?.['naziv'],
                }
                tempArray.push(tempPet);
              }
            })
            .catch((response) => {
              console.log(response);
              let userId = res.data.at(i).korisnikId;
              let typeId = res.data.at(i).vrstaId;

              if (userId === selectedUser.id) {
                tempPet = {
                  imageName: res.data.at(i).slika,
                  image: '',
                  id: res.data.at(i).id,
                  ime: res.data.at(i).ime,
                  opis: res.data.at(i).opis,
                  vrsta: types?.find(element => element.id === typeId)?.['naziv'],
                }
                tempArray.push(tempPet);
              }
            });


        }
        setUserPets(tempArray);
        console.log(userPets);
      })
      .catch((e) => console.log(e));

    setIsPetsModalOpen(true);
  }

  const handleCancelPetsModal = () => {
    setIsPetsModalOpen(false);
  };

  const showWalkerModal = async () => {
    const response = await axios.get(`http://localhost:9000/cijene`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("USER", selectedUser);
    let temp3 = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].korisnikId === selectedUser.id) {
        temp3.push(response.data[i]);
      }
    }
    console.log(temp3);
    setPrices(temp3);

    axios
      .get(`http://localhost:9000/usluge`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          temp.push({
            value: res.data.at(i).id,
            label: res.data.at(i).naziv,
          });
        }
        setServices(temp);
      })
      .catch((e) => console.log(e));
    axios
      .get(`http://localhost:9000/ljubimci`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let tempArray = [];
        let tempPet = "";
        for (let i = 0; i < res.data.length; i++) {
          let userId = res.data.at(i).korisnikId;

          if (userId === user.id) {
            tempPet = {
              value: res.data.at(i).id,
              label: res.data.at(i).ime,
            };
            console.log(tempPet);
            tempArray.push(tempPet);
          }
        }
        setPets(tempArray);
        console.log(pets);
      })
      .catch((e) => console.log(e));

    setIsWalkerModalOpen(true);
  };

  const handleCancelWalkerModal = () => {
    setIsWalkerModalOpen(false);
  };

  const onChange = (date, dateString) => {
    const dateObject = dayjs(dateString, "DD/MM/YY");
    setDateWalker(dateObject);
  };

  const dodajOglas = async (event) => {
    event.preventDefault();
    try {
      const datum = new Date();
      const oglasRequest = {
        id: 1,
        sadrzaj: sadrzaj,
        status: true,
        kategorijaId: kategorija,
        datum: datum,
        korisnikId: user.id,
      };
      const response = await fetch("http://localhost:9000/oglasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(oglasRequest),
      }).catch((e) => console.log(e));
      messageApi.open({
        type: "success",
        content: "Oglas uspješno sačuvan!",
      });
      setIsAdModalOpen(false);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Oglas nije sačuvan!",
      });
    }
  };

  const dodajCuvanje = async (event) => {
    event.preventDefault();
    try {
      let m = prices?.find((element) => element.uslugaId === service)?.[
        "cijena"
      ];

      const rasporedRequest = {
        vrijemeCuvanja: service === 1 ? hours : days * 24,
        ukupnaCijena: service === 1 ? m * hours : m * days,
        datum: dateWalker,
        korisnikId: selectedUser.id,
        ljubimacId: pet,
      };

      const response = await fetch("http://localhost:9000/rasporedi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(rasporedRequest),
      }).catch((e) => console.log(e));

      setIsWalkerModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

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
          <Cover
            style={{
              backgroundImage: `url(${pozadina})`,
            }}
          >
            <div
              style={{
                maxHeight: "500px",
                width: "900px",
                overflow: "auto",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)",
                paddingLeft: "2%",
                paddingRight: "2%",
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={allAds}
                pagination={false}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      //avatar={<Avatar src={`url(${pozadina})`} />}
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
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <text
                              style={{
                                textAlign: "justify",
                                width: "95%",
                                color: "black",
                              }}
                            >
                              {item.info}
                            </text>

                            <text>Kategorija: {item.category}</text>
                            <text>Datum objave: {item.date}</text>
                          </div>
                          <div style={{ marginTop: "-25px", display: "flex", flexDirection: "column" }}>
                            <Button
                              icon={<UserOutlined />}
                              onClick={() => {
                                showModal(item);
                              }}
                              style={{ scale: "1.5", borderRadius: "50%" }}
                            ></Button>
                            {(user.role === ROLE_ADMIN) ? (
                              <Button
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  setSelectedAd(item);
                                  showDeleteModal(item);
                                }}
                                style={{ scale: "1.5", borderRadius: "50%", marginTop: "30px" }}
                              ></Button>
                            ) : (
                              <div></div>
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
                            open={isDeleteModalOpen}
                            onOk={deleteAd}
                            onCancel={handleCancelDeleteModal}
                            width={"350px"}
                          >
                            <p>Da li ste sigurni da želite da izbrišete oglas?</p>
                          </Modal>
            <Modal
              title="Informacije"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={550}
              centered
              style={{ maxHeight: "500px", overflow: "auto" }}
            >
              <Descriptions title="" size="default" column={1}>
                <Descriptions.Item>
                  <Avatar
                    size={130}
                    icon={<UserOutlined />}
                    src={selectedUser.image}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Ime i prezime">
                  {selectedUser.firstName} {selectedUser.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Broj telefona">
                  {selectedUser.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Lokacija">
                  {selectedUser.location}
                </Descriptions.Item>
                <Descriptions.Item label="Opis">
                  {selectedUser.description}
                </Descriptions.Item>
              </Descriptions>
              {(selectedUser.category == CATEGORY_NUDIM && user.role != ROLE_ADMIN) ? (
                <Button onClick={showWalkerModal}>Izaberi čuvara</Button>
              ) : (
                <div></div>
              )}
              {(selectedUser.category == CATEGORY_TRAZIM && user.role != ROLE_ADMIN) ? (
                <Button onClick={showPetsModal}>Pregled ljubimaca</Button>
              ) : (
                <div></div>
              )}
            </Modal>
            <Modal
              title="Pregled ljubimaca"
              open={isPetsModalOpen}
              onOk={handleCancelPetsModal}
              onCancel={handleCancelPetsModal}
              width={"400px"}
            >
              <List
                itemLayout="horizontal"
                dataSource={userPets}
                pagination={false}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta

                      avatar={
                        <Avatar

                          src={item.image}
                          style={{
                            marginTop: "22px",
                            scale: "1.8",
                            marginLeft: "10px",
                          }}
                        />
                      }
                      title={item.ime}
                      description={
                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                          <div style={{ display: "flex", flexDirection: 'column', marginRight: '20px' }}>
                            <text style={{ color: 'black' }}>{item.vrsta}</text>
                            <text style={{ color: 'black' }}>{item.opis}</text>
                          </div>

                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Modal>
            <Modal
              title="Dodaj oglas"
              open={isAdModalOpen}
              onOk={dodajOglas}
              onCancel={handleCancelAdModal}
            >
              <TextArea
                showCount
                maxLength={2000}
                style={{
                  height: 120,
                  resize: "none",
                  textAlign: "justify",
                }}
                placeholder="Unesite komentar (opciono)"
                value={sadrzaj}
                onChange={(e) => setSadrzaj(e.target.value)}
              />
              <p>Unesite kategoriju</p>
              <StyledSelect
                size="default"
                allowClear
                style={{
                  width: "100%",
                }}
                onChange={(selectedOption) => setKategorija(selectedOption)}
                options={kategorije}
                value={kategorija}
              />
            </Modal>

            <FloatButton
              icon={<FilterOutlined />}
              type="primary"
              style={{ right: 30, top: 8 }}
              onClick={showFilterModal}
            />
            {user.role == ROLE_ADMIN ? (
              <div></div>
            ) : (
              <FloatButton
                icon={<PlusCircleOutlined />}
                type="primary"
                style={{ right: 90, top: 8 }}
                onClick={showAdModal}
              />
            )}

            <Modal
              title="Filtriranje po kategorijama"
              open={isFilterModalOpen}
              onCancel={handleCancelFilterModal}
              onOk={filterByCategory}
              okText="Filtriraj"
              cancelText="Otkaži"
            >
              <Select
                size="middle"
                placeholder="Izaberite kategoriju"
                allowClear
                style={{
                  width: "100%",
                  marginBottom: "3%",
                  marginTop: "3%",
                }}
                onChange={(selectedOption) => {
                  setKategorijaFilter(selectedOption);
                  console.log(kategorijaFilter);
                }}
                options={kategorije}
                value={kategorijaFilter}
              />
            </Modal>
            <Modal
              title="Izaberi čuvara"
              open={isWalkerModalOpen}
              onOk={dodajCuvanje}
              onCancel={handleCancelWalkerModal}
              width={450}
            >
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
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    Izaberite uslugu: (
                    {
                      prices?.find((element) => element.uslugaId === service)?.[
                      "cijena"
                      ]
                    }{" "}
                    KM)
                  </p>
                  <StyledSelect
                    size="default"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    onChange={(selectedOption) => {
                      setService(selectedOption);
                      console.log(service);
                    }}
                    options={services}
                    value={service}
                  />
                </div>
                {service === 1 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Unesite broj sati čuvanja:</p>
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={1}
                      onChange={(e) => {
                        setHours(e);
                        console.log(service);

                        console.log("A", money);
                      }}
                      addonAfter="h"
                      style={{
                        width: "30%",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Unesite broj dana čuvanja:</p>
                    <InputNumber
                      min={1}
                      max={30}
                      defaultValue={1}
                      onChange={(e) => {
                        setDays(e);
                        console.log(days);
                      }}
                      addonAfter="d"
                      style={{
                        width: "30%",
                      }}
                    />
                  </div>
                )}
              </div>
              <DatePicker
                format={"DD/MM/YY"}
                onChange={onChange}
                style={{
                  marginTop: "20px",
                  width: "80%",
                }}
                placeholder="Unesite datum"
                value={dateWalker}
              />
              <p>Izaberite svog ljubimca:</p>
              <StyledSelect
                onChange={(selectedOption) => {
                  setPet(selectedOption);
                  console.log(pet);
                }}
                options={pets}
                value={pet}
              ></StyledSelect>
            </Modal>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default AdListPage;
