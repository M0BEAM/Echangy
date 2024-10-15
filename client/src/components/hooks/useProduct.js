import axios from "axios";
import { useState } from "react";       

const UseProduct = () => {
    const [product, setProduct] = useState([])
    const [loading,setLoading ] = useState(true)
    const [APPURL] = useState(process.env.REACT_APP_APIURL)
        const fetchProduct = async () => {
            try {
                const {data} = await axios.get(APPURL+"getProduct",{
                    headers:{
                        "X-API-Key":process.env.REACT_APP_APIKEY
                    }
                })
                setProduct(data.products)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
   

    return {fetchProduct,loading,setLoading,product}
    
}
 
export default UseProduct;