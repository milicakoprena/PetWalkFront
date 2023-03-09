import StartPage from "./components/startpage";
import LoginPage from "./components/loginpage";
import SignUpPage from "./components/signuppage";
import ChoicePage from "./components/choicepage";
import AddPetPage from "./components/addpetpage";
import AddWalkerPage from "./components/addwalkerpage";
import OwnerMenu from "./components/ownermenu";
import WalkerMenu from "./components/walkermenu";
import WalkerListPage from "./components/walkerlistpage";
import PetListPage from "./components/petlistpage";
import ReportProblemPage from "./components/reportproblempage";
import ReportProblemOwnerPage from "./components/reportproblemownerpage";
import ReviewPage from "./components/reviewpage";
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
          <Route path="/walkerlistpage" element={<WalkerListPage />} />
          <Route path="/petlistpage" element={<PetListPage />} />
          <Route path="/reportproblempage" element={<ReportProblemPage />} />
          <Route path="/reportproblemownerpage" element={<ReportProblemOwnerPage />} />
          <Route path="/reviewpage" element={<ReviewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;