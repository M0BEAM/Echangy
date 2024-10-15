
import {  Outlet } from "react-router-dom"
import NavBar from "../../tailwind/navBar"



const Home = () => {

  return (
    <div className="home">
      <NavBar />
      <Outlet />
   
    </div>
  );
}

export default Home;