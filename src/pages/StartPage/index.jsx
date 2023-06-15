import pozadina from "../resources/pozadina2.jpg"
import { useNavigate } from "react-router-dom";
import { Cover, StartLoginButton, StartSignUpButton, StartLogo, Page2 } from "../../components/CssComponents";

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <Page2 >
            <Cover style={{ backgroundImage: `url(${pozadina})` }} >
                <StartLogo src={require('../resources/logo.png')}/>
                <StartLoginButton onClick={() => navigate("/loginpage")}>Prijavi se</StartLoginButton>
                <StartSignUpButton onClick={() => navigate("/signuppage")}>Nemaš nalog? Registruj se ovdje!</StartSignUpButton>
            </Cover>
        </Page2>
    );
};

export default StartPage;
