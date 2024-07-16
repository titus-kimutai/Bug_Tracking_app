import { Outlet } from "react-router-dom"
import './styles/style.css'
import Navbar from "../../Layouts/developer/Navbar/navbar"


const DevPage = () => {
  return (
    
    <div>
      <div className="container">
      <Navbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default DevPage
