import StartPage from "./components/startpage";
import LoginPage from "./components/loginpage";
import SignUpPage from "./components/signuppage";
import ChoicePage from "./components/choicepage";
import AddPetPage from "./components/addpetpage";
import AddWalkerPage from "./components/addwalkerpage";
import OwnerMenu from "./components/ownermenu";
import WalkerMenu from "./components/walkermenu";
import AdminMenu from "./components/adminmenu";
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
          <Route path="/ownermenu" element={<OwnerMenu />} />
          <Route path="/walkermenu" element={<WalkerMenu />} />
          <Route path="/adminmenu" element={<AdminMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;