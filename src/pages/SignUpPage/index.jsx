import styled from "styled-components";
import { Form, Input } from "antd";
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
    background-color:rgb(221, 221, 221);
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const SignUpButton = styled.div`
    width: 360px;
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
    margin-top: -20px;
    margin-bottom: 40px;
    &:hover {
        transform: scale(1.15);
    }
`;





export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    margin-top:60px;
    width:400px;
    margin-bottom:40px;
`;

export const StyledFormItem = styled(Form.Item)`
    padding: 15px;
`;

export const StyledInput = styled(Input)`
    font-size:20px;
`;


const SignUpPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    return (
        <Page>
            <Cover>
                <StyledForm
                  form={form}
                  size="large"
                  
                  >
                  <StyledFormItem
                    name="name"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/user.png')}/>} placeholder="Ime i prezime" />
                  </StyledFormItem>
                  <StyledFormItem
                    name="username"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/mail.png')}/>} placeholder="Korisničko ime" />
                  </StyledFormItem>
                  <StyledFormItem
                    name="email"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/arroba.png')}/>} placeholder="Email adresa" />
                  </StyledFormItem>
                  <StyledFormItem
                    name="password"
                    rules={[{ required: true, message: "Polje je obavezno!" }]}
                    >
                    <StyledInput type="password" prefix={<Icon  src={require('../resources/padlock.png')}/>} placeholder="Lozinka" />
                  </StyledFormItem>
                  <StyledFormItem
                    name="number"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput prefix={<Icon  src={require('../resources/phone.png')}/>} placeholder="Broj telefona" />
                  </StyledFormItem>
             
                </StyledForm>
                <SignUpButton onClick={() => navigate("/menupage")}>Registruj se</SignUpButton>
            </Cover>
        </Page>
    );
};

export default SignUpPage;
