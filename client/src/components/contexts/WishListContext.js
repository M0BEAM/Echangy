import { useState } from "react";
import { createContext } from "react";

export const WishListCtx = createContext()

const WishListProvider = ( {children}) => {
 const [wishList,setWishList]= useState([])
   return <WishListCtx.Provider value={{wishList,setWishList}}>
        {children}
    </WishListCtx.Provider>
}

export default WishListProvider;