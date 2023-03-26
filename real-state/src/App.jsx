import LoginPage from "./assets/pages/LoginPage";
import SignUpPage from "./assets/pages/SignUpPage";
import ForgotPassPage from "./assets/pages/ForgotPassPage";
import VerifyEmailNumberPage from "./assets/pages/VerifyEmailNumberPage";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import VerifyEmailNumPage from "./assets/pages/VerifyEmailNumberPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/forpass" element={<ForgotPassPage/>}/>
        <Route path="/verify" element={<VerifyEmailNumberPage/>}/>
      </Routes>
    </div>
  )
}

export default App
