import styled from "styled-components";
import { Form, Input, Select } from "antd";
import TextArea from "rc-textarea";
const Option = Select.Option;

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

export const AddPetButton = styled.div`
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
    margin-top:-30px;
    &:hover {
        transform: scale(1.15);
    }
`;





export const Icon = styled.img`
    width:25px;
    height:25px;
`;

export const StyledForm = styled(Form)`
    width:360px;
    margin-top:-40px;
`;

export const StyledFormItem = styled(Form.Item)`
    margin-top:-10px;
`;

export const StyledInput = styled(Input)`
    font-size:15px;
`;

export const StyledTextArea = styled(TextArea)`
    font-size:15px;
    width:353px;
    height:60px;
    border-radius: 5px;
    border-color: transparent;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

`;

export const StyledSelect = styled(Select)`
    font-size:15px;
    width:360px;
`;

export const PetPhoto = styled.img`
    width: 190px;
    height: 190px;
    margin-top:-20px;
    position: relative;
    &:hover {
        transform: scale(1.15);
    }
    transition:0.5s;
`;

export const StyledLabel = styled.div`
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;


const AddPetPage = () => {
    const [form] = Form.useForm();
    return (
        <Page>
            <Cover>
                <PetPhoto src={require('../resources/addpet.png')}></PetPhoto>
                <StyledForm
                  form={form}
                  size="large"
                  labelCol={
                    { span: 24 }
                  }
                  wrapperCol={{ span: 24 }
                  }
                  >
                  <StyledFormItem
                    label={ <StyledLabel style={{fontSize:"18px"}}>Ime</StyledLabel> }
                    name="name"
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledInput/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="description"
                    label={ <StyledLabel style={{fontSize:"18px"}}>Opis</StyledLabel> }
                    >
                  <StyledTextArea/>
                  </StyledFormItem>
                  <StyledFormItem
                    name="location"
                    label={ <StyledLabel style={{fontSize:"18px"}}>Lokacija</StyledLabel> }
                    rules={[{ required: true, message: "Polje je obavezno!"}]}
                    >
                  
                  <StyledSelect size="large">
                     <Option value="mejdan">Mejdan</Option>
                     <Option value="borik">Borik</Option>
                  </StyledSelect>
                  </StyledFormItem>
                  <StyledFormItem
                    name="note"
                    label={ <StyledLabel style={{fontSize:"18px"}}>Napomena</StyledLabel> }
                    >
                  <StyledTextArea/>
                  </StyledFormItem>
                  
             
                </StyledForm>
                <AddPetButton>Dodaj ljubimca</AddPetButton>
            </Cover>
        </Page>
    );
};

export default AddPetPage;
