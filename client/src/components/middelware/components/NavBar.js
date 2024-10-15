import {useState } from "react";
import {useNavigate } from "react-router-dom";

const NavBar = () => {
  //const {setAuth} = useContext(ClientCtx)
  const navigate = useNavigate()
  const [showNavBar, setShowNavBar] = useState(false)
  const handeleLogout = (e) => {
    e.preventDefault()
      localStorage.removeItem("CtM1vahQToNkUFI1snRgmFwBMLf265OMXIEfR7+4b95d6rVGqx+NYzar6DDrS65Z")
    navigate("/")
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark ">
      <a class="navbar-brand text-primary" href="#"><h4>Exhange Device <span className="text-danger">🇹🇳</span></h4></a>
      <button class="navbar-toggler bg-light  " onClick={() => setShowNavBar(!showNavBar)} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon "></span>
      </button>
      <div class={`collapse navbar-collapse justify-content-end   text-center ${showNavBar && "show"}`} id="navbarNav">
        <ul class="navbar-nav ">
          <li class="nav-item active">
            <a class="nav-link text-light " onClick={() => navigate("/home")}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" onClick={() => navigate("/home/addDevice")}>Add Device</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" onClick={() => navigate("/home/wishList")}>WishList</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" onClick={() => navigate("/home/MyDevices")}>My Devices</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" onClick={handeleLogout}>LogOut</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
