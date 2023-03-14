import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Cover = styled.div`
    background-color:rgba(143, 115, 143, 0.581);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const LoginButton = styled.div`
    width: 23%;
    height: 2em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    background-color: rgb(124, 127, 131);
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    color: aliceblue;
    font-size: 1.7em;
    margin-top: -70px;
    &:hover {
        transform: scale(1.15);
    }
`;


export const SignUpButton = styled.div`
    width: 23%;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    transition: 0.5s;
    font-size: 1.4em;
    text-decoration: underline;
    cursor: pointer;
    color:rgba(19, 19, 20, 0.704);
    position: relative;
    border: 0pc;
    margin-top: -100px;
    background-color: transparent;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Logo = styled.img`
    width: 400px;
    height: auto;
    position: relative;
    margin-top: 50px;
`;

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Cover>
                <Logo src={require('../resources/logo.png')}></Logo>
                <LoginButton onClick={() => navigate("/loginpage")}>Prijavi se</LoginButton>
                <SignUpButton onClick={() => navigate("/signuppage")}>Nemaš nalog? Registruj se ovdje!</SignUpButton>
            </Cover>
        </Page>
    );
};

export default StartPage;
