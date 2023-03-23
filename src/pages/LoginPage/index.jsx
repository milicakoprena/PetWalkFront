import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router";


export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(190,174,190,255);    
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
    background-color: rgba(0,21,41,255);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top: -20px;
    margin-bottom: 40px;
    &:hover {
        transform: scale(1.15);
    }
`;



export const Logo = styled.img`
    width: 400px;
    height: auto;
    margin: 60px 0px 0px 0px;
    position: relative;
`;


export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    width:340px;
    margin-bottom:40px;
`;

export const StyledFormItem = styled(Form.Item)`
    padding: 15px;
`;

export const StyledInput = styled(Input)`
    font-size:20px;
`;


const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    return (
        <Page>
            <Cover>
                <Logo src={require('../resources/logo.png')}></Logo>
                <StyledForm
                  form={form}
                  size="large"
                  
                  >
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" />
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    >
                    <StyledInput type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" />
                  </StyledFormItem>
             
                </StyledForm>
                <LoginButton onClick={() => navigate("/menupage")}>Prijavi se</LoginButton>
            </Cover>
        </Page>
    );
};

export default LoginPage;
