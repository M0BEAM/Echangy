import { Navigate, Outlet } from "react-router-dom";

const ProtectRouters = () => {

    const auth =localStorage.getItem(process.env.REACT_APP_TOKENNAME) != null
    return ( 
     auth ? <Outlet/> : <Navigate to="/login" />
     );
}
 
export default ProtectRouters;