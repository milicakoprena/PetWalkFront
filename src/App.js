import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddPetPage from "./pages/AddPetPage";
import MapPage from "./pages/MapPage";
import EditProfilePage from "./pages/EditProfilePage";
import ReportProblem from "./pages/ReportProblem";
import WalkerListPage from "./pages/WalkerListPage";
import ReviewPage from "./pages/ReviewPage";
import ReportPage from "./pages/ReportPage";
import EditProfileOwnerPage from "./pages/EditProfileOwnerPage";
import AccountListPage from "./pages/AccountListPage";
import MyPetsList from "./pages/MyPetsList";
import ProblemView from "./pages/ProblemView";
import AdListPage from "./pages/AdListPage";
import RasporedPage from "./pages/RasporedPage";
import StatisticsPage from "./pages/StatisticsPage";
import PlacesPage from "./pages/PlacesPage";
import MyAdsPage from "./pages/MyAdsPage";
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
          <Route exact path="/editprofileownerpage" element={<EditProfileOwnerPage />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route path="/reportproblem" element={<ReportProblem />} />
          <Route path="/walkerlist" element={<WalkerListPage />} />
          <Route path="/reportpage" element={<ReportPage />} />
          <Route path="/reviewpage" element={<ReviewPage />} />
          <Route path="/reportpage" element={<ReportPage />} />
          <Route path="/accountlistpage" element={<AccountListPage />} />
          <Route exact path="/problemview" element={<ProblemView />} />
          <Route exact path="/mypetslist" element={<MyPetsList />} />
          <Route exact path="/adlist" element={<AdListPage />} />
          <Route exact path="/rasporedpage" element={<RasporedPage />} />
          <Route exact path="/statisticspage" element={<StatisticsPage />} />
          <Route exact path="/placespage" element={<PlacesPage />} />
          <Route exact path="/myadspage" element={<MyAdsPage />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;