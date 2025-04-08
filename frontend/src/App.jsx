import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ProfilePage from './pages/Profile'
import RecipeDashboard from './pages/Dashboard'
import AddRecipe from "./pages/AddRecipe";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<RecipeDashboard />} />
        <Route path="/add-recipe" element={<AddRecipe />} />


      </Routes>
    </Router>
  )
}

export default App
