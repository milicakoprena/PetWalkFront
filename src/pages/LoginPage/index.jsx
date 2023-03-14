import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgb(221, 221, 221);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const LoginButton = styled.div`
    width: 20%;
    height: 2em;
    background-color: rgb(124, 127, 131);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top: -40px;
    &:hover {
        transform: scale(1.15);
    }
`;



export const Logo = styled.img`
    width: 400px;
    height: auto;
    margin: -20px 0px 0px 0px;
    position: relative;
`;

export const StyledFormItem = styled(Form.Item)`
    font-size: 20px;
    border-radius: 0.25em;
    border-color: transparent;
    height: 2.5em;
    width: 100%;
    margin:0;
    padding-left:40px;
`;


const LoginPage = () => {
    const [form] = Form.useForm();
    return (
        <Page>
            <Cover>
                <Logo src={require('../resources/logo.png')}></Logo>
                <Form
                  form={form}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 12 }}
                  labelAlign="left"
                  >
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    label={"Korisničko ime:"}
                  >
                    <Input />
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    label={"Lozinka:"}
                  >
                    <Input type="password"/>
                  </StyledFormItem>
             
                </Form>
                <LoginButton/>
            </Cover>
        </Page>
    );
};

export default LoginPage;
