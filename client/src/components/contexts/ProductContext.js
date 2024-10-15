import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductCtx = createContext({})


const ProductContextProvider =  ({children}) => {
    const [APPURL] = useState(process.env.REACT_APP_APIURL)
    const [product, setProduct] = useState([])
    const [loading,setLoading ] = useState(true)
    useEffect(()=>{
        const fetchData = async () => {
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
        fetchData()
    },[product])

   return <ProductCtx.Provider value={{product,loading,setLoading,setProduct}}>
        {children}
    </ProductCtx.Provider>

}
export default ProductContextProvider;