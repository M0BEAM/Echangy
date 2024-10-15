import { Route, Routes } from "react-router-dom";
import "./App.css"
import Index from "./components";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AddProduct from "./components/middelware/components/addProduct";
import Home from "./components/middelware/components/home";
import ProtectRouters from "./components/middelware/protectRouters";

import WishList from "./components/middelware/components/wishList";
import ClientContextProvider from "./components/contexts/ClientContext";
import ListProducts from "./components/middelware/components/listProducts";
import ExChange from "./components/middelware/components/ExChange";
import MyProduct from "./components/middelware/components/myProduct";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import CodeConf from "./components/auth/CodeConf";
import ERP from "./components/tailwind/emailResetPassword";
import UpdatePassword from "./components/tailwind/updatePassword";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import PNF from "./components/middelware/components/pageNotFound";
import Learn from "./components/middelware/components/learn";

function App() {
  useEffect(() => {
    // Function to handle the "resize" event
    const handleResize = () => {
      console.log('Window resized!');
    };

    // Add the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (

    <div className="App">
      <Helmet>
      <title>Echangy</title>
      <link rel="icon" href="/logo/echangy-favicon-color.png" />
      </Helmet>
      <ClientContextProvider>
       
        <Routes>

          <Route element={<ProtectRouters />}>
            <Route path="/home" element={<Home />}>
              <Route path="/home" element={<ListProducts />} />
              <Route path="wishList" element={<WishList />} />
              <Route path="addDevice" element={<AddProduct />} />
              <Route path="MyDevices" element={<MyProduct />} />
              <Route path="device/:id" element={<ExChange />} />
            </Route>
          </Route>

          <Route path="/" element={<Index />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/CodeConfirmation/:idClient" element={<CodeConf />} />
          <Route path="/forgotPassword/email" element={<ERP />} />
          <Route path="/resetPassword/:id/:token" element={<UpdatePassword />} />
          <Route path="/learnMore" element={<Learn />} />
          <Route path="*" element={<PNF />} />
        </Routes>

      </ClientContextProvider>
    </div>

  );
}
export default App;