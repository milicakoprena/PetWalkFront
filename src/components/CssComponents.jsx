import styled from 'styled-components';
import { Form, Input, Select, Table, Col } from "antd";
import TextArea from "rc-textarea";

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

export const Page1 = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export const Page2 = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CoverSignUp = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%
`;

export const CoverEditPage = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-around;
`;

export const HeaderImage = styled.img`
    width: 40px;
    height: 40px;
`;

export const StyledForm = styled(Form)`
  width:360px;
  margin-top:0.5%;
  margin-left:10%;
  justify-content: center;
`;

export const StyledFormLogin = styled(Form)`
  width:340px;
  margin-bottom:40px;
`;

export const StyledEditForm = styled(Form)`
    width:350px;
    margin-top:4%;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-top:-10px;
`;

export const StyledFormItemLogin = styled(Form.Item)`
  padding: 15px;
`;

export const StyledFormItem1 = styled(Form.Item)`
  padding: 10px;
`;

export const StyledInput = styled(Input)`
  font-size:15px;
`;

export const StyledInput2 = styled(Input)`
  font-size:18px;
`;

export const StyledTextArea = styled(TextArea)`
  font-size:15px;
  width:360px;
  height:80px;
  border-radius: 5px;
  border-color: #DEDDDD;
  resize: none;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

export const StyledTextAreaEdit = styled(TextArea)`
    font-size:15px;
    width:353px;
    height:150px;
    border-radius: 5px;
    border-color: #DEDDDD;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

export const StyledSelect = styled(Select)`
  font-size:15px;
  width:360px;
`;

export const StyledSelect2 = styled(Select)`
  margin-top:15px;
  font-size:18px;
  width:360px;
  heigth:150px;
`;

export const StyledUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:120px;
  margin-top:20px;
`;

export const StyledUploadSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:370px;
  margin-top:160px;
`;

export const StyledUploadEdit = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:120px;
    width: 200px;
    height: 200px;
`;

export const PetPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
`;

export const StyledLabel = styled.div`
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
  color: rgba(19, 19, 20, 0.704);
`;

export const StyledLabel2 = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 18px;
`;

export const LoginButton = styled.div`
  width: 100%;
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

export const StartLoginButton = styled.div`
    width: 23%;
    height: 2em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:0;
    background-color: rgba(0,21,41,255);
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
  width: 30%;
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
  &:hover {
      transform: scale(1.15);
  }
  margin-left: 48%;
`;

export const StartSignUpButton = styled.div`
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
    color: rgba(0,21,41,255);
    position: relative;
    border: 0pc;
    margin-top: -100px;
    background-color: transparent;
    &:hover {
        transform: scale(1.15);
    }
`;

export const StartLogo = styled.img`
    width: 400px;
    height: auto;
    position: relative;
    margin-top: 50px;
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

export const Desc = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledTable = styled(Table) `
    width: 70%;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 35%);
    background-color: white;
    border-radius: 10px;
`;

export const StyledCol = styled(Col)`
  align-content: center;
  margin-left:170px;
  margin-top: -120px;
`;

export const StyledCol1 = styled(Col)`
  align-content: center;
  margin-left:100px;
  margin-top: 72px;
`;
