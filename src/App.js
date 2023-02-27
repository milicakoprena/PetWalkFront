import StartPage from "./components/startpage";
import LoginPage from "./components/loginpage";
import SignUpPage from "./components/signuppage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;