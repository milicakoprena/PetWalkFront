import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload, message, Layout, Card, Button } from "antd";
import MainMenu from "../../components/MainMenu";
import axios from "axios";
import { useLocation } from "react-router-dom";
import pozadina from "../resources/pozadina2.jpg";
import {
  Cover,
  Page,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledLabel,
  StyledSelect,
  StyledTextArea,
  StyledUpload,
  PetPhoto,
} from "../../components/CssComponents";

const { Content, Sider } = Layout;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddPetPage = (props) => {
  const userState = useLocation();
  const user = userState.state.user;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const selectType = (event) => {
    setTypeId(event);
  };

  const addPet = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    axios
      .post(`http://localhost:9000/ljubimci/image`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Uspjesno");
      })
      .catch((e) => console.log(e));

    let ljubimacRequest = {
      ime: name,
      opis: description,
      slika: image,
      korisnikId: user.id,
      vrstaId: typeId,
    };

    const response = await fetch("http://localhost:9000/ljubimci", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(ljubimacRequest),
    }).catch((e) => {
      console.log(e);
    });

    if (response.ok === true) {
      messageApi.open({
        type: "success",
        content: "Ljubimac uspješno sačuvan!",
      });
      window.location.reload();
    } else {
      messageApi.open({
        type: "error",
        content: "Nedostaju obavezni podaci!",
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/vrste`, {
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
        setTypes(temp);
      })
      .catch((e) => console.log(e));
  }, [types, user.token]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Postavi sliku
      </div>
    </div>
  );

  const saveFile = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setImage(file.name);
      setImageFile(file);
    }, 0);
  };
  const [form] = Form.useForm();
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
          minWidth: "",
        }}
      >
        <MainMenu />
      </Sider>
      <Content>
        <Page>
          <Cover
            style={{ maxHeight: "103vh", backgroundImage: `url(${pozadina})` }}
          >
            <Card
              title="Dodaj ljubimca"
              bordered={false}
              style={{
                boxShadow: "0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%)",
                justifyContent: "center",
                width: "500px",
                height: "636px",
                marginTop: "-20px",
              }}
            >
              <StyledForm
                form={form}
                size="large"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <StyledFormItem>
                  <StyledUpload>
                    <Upload
                      name="avatar"
                      customRequest={saveFile}
                      listType="picture-circle"
                      className="avatar-uploader"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <PetPhoto src={imageUrl} alt="avatar" />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </StyledUpload>
                </StyledFormItem>
                <StyledFormItem
                  label={<StyledLabel>Ime</StyledLabel>}
                  name="name"
                  rules={[{ required: true, message: "Polje je obavezno!" }]}
                >
                  <StyledInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </StyledFormItem>
                <StyledFormItem
                  name="type"
                  label={<StyledLabel>Vrsta ljubimca</StyledLabel>}
                  rules={[{ required: true, message: "Polje je obavezno!" }]}
                >
                  <StyledSelect
                    size="large"
                    options={types}
                    //defaultValue={types[0]}
                    onChange={selectType}
                  />
                </StyledFormItem>
                <StyledFormItem
                  name="description"
                  label={<StyledLabel>Opis</StyledLabel>}
                >
                  <StyledTextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </StyledFormItem>
                {contextHolder}
                <Button
                  onClick={addPet}
                  style={{
                    marginTop: 5,
                    marginLeft: 110,
                    minHeight: 40,
                    backgroundColor: "rgba(0,21,41,255)",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Dodaj ljubimca
                </Button>
              </StyledForm>
            </Card>
          </Cover>
        </Page>
      </Content>
    </Layout>
  );
};

export default AddPetPage;
