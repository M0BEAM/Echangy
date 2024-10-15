import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authorization, ClientCtx } from "../contexts/ClientContext";
import { useState } from "react";

const UseLogin = () => {
    const [APPURL] = useState(process.env.REACT_APP_APIURL)
    const { setAuthClient } = useContext(ClientCtx)
    const navigate = useNavigate()
    const login = async (email, password) => {
        const { data } = await axios.post(APPURL + "login", { email, password }, {
            headers: {
                "x-api-key": process.env.REACT_APP_APIKEY
            }
        })
        localStorage.setItem(process.env.REACT_APP_TOKENNAME, data.token)
        setAuthClient({ client: await authorization(data.token) })
        navigate("/home")
    }
    return login
}

export default UseLogin;