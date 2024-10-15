import React, { useEffect, useState } from "react";
import NavBar from "../tailwind/navBar";
import Footer from "../middelware/components/footer";
import UseLogin from "../hooks/FetchLogin";
import AlertDanger from "../bootstrap/AlertDanger";
import AlertSuccess from "../bootstrap/AlertSuccess";
import signInForm from "../middelware/formValidate/signInForm";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const login = UseLogin()
    const handeleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handeleSubmit = async (e) => {
        e.preventDefault()
        const testForm = signInForm(form.email, form.password)
        if (testForm) {
            try {
                await login(form.email, form.password)

                setError(false)
                setMessage("login successfully")

                //navigate("/home")
            } catch (error) {
                    setError(true)
                setMessage(error.response.data.message)
            }
        } else {
            setError(true)
            setMessage("Fields is empty !")
        }
    }
    return (
        <>
            <NavBar />
            <div class="">
                <div class="p-8 lg:w-1/2 mx-auto">
                    <div class="bg-white rounded-t-lg p-8">
                        <p class="text-center text-xl font-bold">Sign in</p>
                    </div>
                    <div class="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                        <p class="text-center text-sm text-gray-500 font-light">
                            Sign in with credentials
                        </p>
                        <form onSubmit={handeleSubmit} class="mt-6">
                            <div class="relative">
                                <input name="email" onChange={handeleChange} class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="email" placeholder="Email" />
                                <div class="absolute left-0 inset-y-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
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

                            {error ? (
                                <>
                                    <div class="mt-2 text-start text-gray-500">
                                        <label for="remember">Reset Your  <a href="forgotPassword/email">Password</a></label>
                                    </div>
                                    <AlertDanger message={message} />
                                </>
                            ) : (
                                message &&
                                <AlertSuccess message={message} />

                            )}
                            <div class="mt-4 text-center text-gray-500">
                                <label for="remember">You don't have an account, <span className="text-indigo-600"><a onClick={() => navigate("/register")} >Sign Up</a></span></label>
                            </div>

                            <div class="flex items-center justify-center mt-8">
                                <button class="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >
                                    Sign in
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

export default SignIn;
