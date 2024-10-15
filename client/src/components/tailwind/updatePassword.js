import React, { useEffect, useState } from "react";
import NavBar from "../tailwind/navBar";
import Footer from "../middelware/components/footer";
import UseLogin from "../hooks/FetchLogin";
import AlertDanger from "../bootstrap/AlertDanger";
import AlertSuccess from "../bootstrap/AlertSuccess";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ClientCtx, authorization } from "../contexts/ClientContext";
import ConfModal from "../tailwind/confirmationModal";

function UpdatePassword() {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const { id,token } = useParams()
    const [openConf, setOpenConf] = useState(false)
    const handeleChange = (e) => {
        setpassword(e.target.value)
    }

    const handeleSubmit = async (e) => {
        e.preventDefault()
        if (password != "") {
            try {
                await axios.put(process.env.REACT_APP_APIURL + "updatePassword/"+id, { password }, {
                    headers: {
                        authorization: `Bearer ${token}`,"X-API-Key": process.env.REACT_APP_APIKEY
                    }
                })
                setError(false)
                navigate("/login")
            } catch (error) {
                if (error.response?.data.message) {

                    setError(true)
                    setMessage(error.response.data.message)
                }
            }
        } else {

            setError(true)
            setMessage('Field is empty')
        }

    }
    return (
        <>
            <NavBar />
            <div class="">
                <div class="p-10 lg:w-1/2 mx-auto">
                    <div class="bg-white rounded-t-lg h-[160px] p-8">
                        <p class="text-center text-xl font-bold">Password</p>
                    </div>
                    <div class="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <p class="text-center text-sm text-gray-500 font-light">
                            Update Passowrd
                        </p>
                        <form onSubmit={handeleSubmit} class="mt-6">
                            <div class="relative mt-3">
                                <input onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" type="password" placeholder="new password" />
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>

                            </div>
                            <div class="relative mt-3">
                                <input onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" type="password" placeholder="confirm password" />
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>

                            </div>
                            {error ? (

                                <AlertDanger message={message} />

                            ) : (
                                message &&
                                <AlertSuccess message={message} />

                            )}
                            <div class="mt-4 text-center text-gray-500">
                                <label for="remember">Back to sign In, <a href="/register">Sign In</a></label>
                            </div>
                            <div class="flex items-center justify-center mt-8">
                                <button class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <ConfModal options={{ openConf, setOpenConf }} />
        </>
    );
}

export default UpdatePassword;
