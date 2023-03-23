import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddPetPage from "./pages/AddPetPage";
import MenuPage from "./pages/MenuPage";
import MapPage from "./pages/MapPage";
import ChoicePage from "./pages/ChoicePage";
import EditProfilePage from "./pages/EditProfilePage";
import ReportProblem from "./pages/ReportProblem";
import PetListPage from "./pages/PetListPage";
import WalkerListPage from "./pages/WalkerListPage";
import ReviewPage from "./pages/ReviewPage";
import ReportPage from "./pages/ReportPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route exact path="/loginpage" element={<LoginPage />} />
          <Route exact path="/signuppage" element={<SignUpPage />} />
          <Route exact path="/addpetpage" element={<AddPetPage />} />
          <Route exact path="/menupage" element={<MenuPage />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route path="/reportproblem" element={<ReportProblem />} />
          <Route path="/petlist" element={<PetListPage />} />
          <Route path="/walkerlist" element={<WalkerListPage />} />
          <Route path="/choicepage" element={<ChoicePage />} />
          <Route path="/reportpage" element={<ReportPage />} />
          <Route path="/reviewpage" element={<ReviewPage />} />
          <Route path="/reportpage" element={<ReportPage />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;