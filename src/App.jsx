import { Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Dash from "./Pages/Dash"
import Projects from "./Pages/Projects"
import Footer from "./Components/Footer"
import { useContext } from "react"
import { tokenAuthContext } from "./Context/AuthContext"

function App() {
  const {isAuthorised} = useContext(tokenAuthContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/register" element={<Auth insideRegister/>}/>
        <Route path="/dashboard" element={isAuthorised?<Dash/>:<Home/>}/>
        <Route path="/projects" element={isAuthorised?<Projects/>:<Home/>}/>
        <Route path="/*" element={<Navigate to={"/"}/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
