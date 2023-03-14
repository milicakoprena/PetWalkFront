/*
import StartPage from "./components/startpage";
import LoginPage from "./components/loginpage";
import SignUpPage from "./components/signuppage";
import ChoicePage from "./components/choicepage";
import AddPetPage from "./components/addpetpage";
import AddWalkerPage from "./components/addwalkerpage";
import OwnerMenu from "./components/ownermenu";
import WalkerMenu from "./components/walkermenu";
import AdminMenu from "./components/adminmenu";
import WalkerListPage from "./components/walkerlistpage";
import PetListPage from "./components/petlistpage";
import ReportProblemPage from "./components/reportproblempage";
import ReportProblemOwnerPage from "./components/reportproblemownerpage";
import ReviewPage from "./components/reviewpage";
*/
import StartPage from "./pages/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <StartPage/>
    </div>
  );
}

export default App;