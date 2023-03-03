import StartPage from "./components/startpage";
import LoginPage from "./components/loginpage";
import SignUpPage from "./components/signuppage";
import ChoicePage from "./components/choicepage";
import AddPetPage from "./components/addpetpage";
import AddWalkerPage from "./components/addwalkerpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/choicepage" element={<ChoicePage />} />
          <Route path="/addpetpage" element={<AddPetPage />} />
          <Route path="/addwalkerpage" element={<AddWalkerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;