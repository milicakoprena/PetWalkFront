import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddPetPage from "./pages/AddPetPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/addpetpage" element={<AddPetPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;