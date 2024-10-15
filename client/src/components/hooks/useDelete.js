import axios from "axios";
import { useState } from "react";

const UseDelete = () => {
    const [APPURL] = useState(process.env.REACT_APP_APIURL,{
        headers:{
            "X-API-Key":process.env.REACT_APP_APIKEY
        }
    })
    const [loadingDel,setLoadingDel] = useState(null)
    const deleteProduct = async (id) => {
    await axios.delete(APPURL+"delete/"+id)
    }
    return {deleteProduct,loadingDel,setLoadingDel}
}
 
export default UseDelete;