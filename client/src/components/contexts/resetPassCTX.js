import { useState } from "react";
import { createContext } from "react";

export const ResetPassCtx = createContext()

const ResetPassProvider = ( {children}) => {
 const [email,setemail]= useState()
   return <ResetPassCtx.Provider value={{email,setemail}}>
        {children}
    </ResetPassCtx.Provider>
}

export default ResetPassProvider;