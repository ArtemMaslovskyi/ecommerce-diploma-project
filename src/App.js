import axios from 'axios'
import React, { useEffect } from "react"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { AuthProvider } from "./AuthContext"
import Layout from "./Layout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import EditProfile from "./pages/EditProfile"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
axios.defaults.baseURL = process.env.baseURL



function App() {

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/EditProfile" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
