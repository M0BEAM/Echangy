import React, { useContext, useEffect, useState } from "react";
import NavBar from "../tailwind/navBar";
import Footer from "../middelware/components/footer";
import AlertDanger from "../bootstrap/AlertDanger";
import AlertSuccess from "../bootstrap/AlertSuccess";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClientCtx, authorization } from "../contexts/ClientContext";
import signUpForm from "../middelware/formValidate/signUpForm";
import Pays from "../hooks/pays";

function SignUp() {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const pays = Pays()

    const [form, setForm] = useState({
        name: "",
        email: "",
        ville: "",
        password: ""
    })

    const handeleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handeleSubmit = async (e) => {
        e.preventDefault()
        const testForm = signUpForm(form.name, form.email, form.ville, form.password)
        if (testForm === true) {
            if (form.password === confirmPassword) {
                try {
                    const data = await axios.post(process.env.REACT_APP_APIURL + "register", form, {
                        headers: {
                            "X-API-Key": process.env.REACT_APP_APIKEY
                        }
                    })
                    setError(false)
                    setMessage("register successfully")
                    setForm({ name: "", email: "", ville: "", password: "" })


                    navigate("/CodeConfirmation/" + data.data.client)
                } catch (error) {
                    console.log("connection failed");
                    setError(true)
                    setMessage(error.response.data.message)
                }
            } else {
                setError(true)
                setMessage("Password not match !")
            }
        }
        else if (testForm === false) {
            setError(true)
            setMessage("Fields is empty !!")
        } else {
            setError(true)
            setMessage(testForm)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/home")
    }, [navigate])

    return (
        <>
            <NavBar />
            <div >
                <div class=" py-3 lg:w-1/2 mx-auto">
                    <div class="bg-white rounded-t-lg p-8">
                        <p class="text-center text-xl font-bold">Sign Up</p>
                    </div>
                    <div class="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <p class="text-center text-sm text-gray-500 font-light">
                            Sign up with credentials
                        </p>
                        <form onSubmit={handeleSubmit} class="mt-6">
                            <div class="relative">
                                <input name="name" onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Name" />
                                <div class="absolute left-0 inset-y-0 flex items-center ">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                                </div>
                            </div>
                            <div class="relative mt-3">
                                <input name="email" onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="email" placeholder="Email" />
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="relative mt-3">
                                <select id="small" name="ville" onChange={handeleChange}  class="appearance-none text-gray-400  border pl-12 cursor-pointer  border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-2 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline">
                                    <option selected value="en" className="text-gray-400">Choose your location</option>
                                    {pays.filter((item) => { return item != "Tout" }).map((item, index) => (
                                        <option className="text-gray-600"  key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
                                </div>
                            </div>
                            <div class="relative mt-3">
                                <input name="password" onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Password" />
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="relative mt-3">
                                <input name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Confirm Password" />
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
                                <label for="remember">You already have an account. Please <span className="text-indigo-600"><a onClick={() => navigate("/login")} >Sign In</a></span></label>
                            </div>
                            <div class="flex items-center justify-center mt-8">
                                <button class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
