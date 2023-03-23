import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../AddPetPage";
import styled from "styled-components";

export const Cover = styled.div`
    background-color:rgba(0, 33, 64, 0.59);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const Ownerbtn = styled.img`
    width: 190px;
    height: 190px;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    margin-left: 10%;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Text1 = styled.div`
    position: absolute;
    right: 80%;
    left: 27%;
    bottom: 29%;
    font: bold 1.2em "Fira Sans", cursive;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 2px rgb(224, 180, 228);
`;

export const Walkerbtn = styled.img`
    width: 190px;
    height: 190px;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 0.25em;
    cursor: pointer;
    transition: 0.5s;
    margin-right: 10%;
    &:hover {
        transform: scale(1.15);
    }
`;

export const Text2 = styled.div`
    position: absolute;
    right: 22%;
    left: 68%;
    bottom: 29%;
    font: bold 1.2em "Fira Sans", cursive;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 2px rgb(224, 180, 228);
`;

const ChoicePage = () => {
    const navigate = useNavigate();
    return (
        <Page>
            <Cover>
                <Ownerbtn src={require('../resources/owner.png')} onClick={() => navigate("/menupage")} />
                <Text1>VLASNIK</Text1>
                <Walkerbtn src={require('../resources/walker.png')} onClick={() => navigate("/menupage")} />
                <Text2>ČUVAR</Text2>
            </Cover>
        </Page>
    );
}

export default ChoicePage;