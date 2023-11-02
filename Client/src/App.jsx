import React from "react";
import Home from "./pages/home";
import AdminPanel from "./pages/adminPanel";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/adminPanel" element={<AdminPanel />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
