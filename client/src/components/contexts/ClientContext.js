import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ClientCtx = createContext()

export const authorization = async (token) => {

  const { data } = await axios.get(process.env.REACT_APP_APIURL + "private", {
    headers: { authorization: `Bearer ${token}`, "X-API-KEY":process.env.REACT_APP_APIKEY }
  })
  return data.client
}

const ClientContextProvider = ({ children }) => {

  const [authClient, setAuthClient] = useState({
    client: null
  })
  useEffect(() => {
    const loadAuth = async () => {
      if (localStorage.getItem(process.env.REACT_APP_TOKENNAME) )
        setAuthClient({ client: await authorization(localStorage.getItem(process.env.REACT_APP_TOKENNAME))})
    }
    loadAuth()
  }, [])
  return <ClientCtx.Provider value={{ ...authClient, setAuthClient }}>
    {children}
  </ClientCtx.Provider>

}
export default ClientContextProvider;