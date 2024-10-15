import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { LanguageCtx } from '../contexts/language';
import { useContext } from 'react';
import { useState } from 'react';
import {useNavigate } from "react-router-dom";

export default function UpdateModal({ data, setData, modals }) {
     
    const { id, name, description, phoneNumber } = data
    const { open, setOpen } = modals
    const { language } = useContext(LanguageCtx)
    const translations = require(`../lang/${language}.json`).upProduct;
    const cancelButtonRef = useRef(null)
    const [APPURL] = useState(process.env.REACT_APP_APIURL)
    const navigate = useNavigate()
    const updateDevice = async (e) => {
    
    e.preventDefault()
       try {
        await axios.put(APPURL+"update/" + id, { name, description, phoneNumber }, {
            headers: {
               "X-API-Key": process.env.REACT_APP_APIKEY
            }
        })
       } catch (error) {
        console.log(error.message)
       }
       setOpen(false)
        navigate("/home")
        
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative  z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 w-full bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex sm:items-start justify-center ">

                                        <div className="mt-3 text- w-full sm:ml-4 sm:mt-0 sm:text-left">


                                            <div class="px-6 py-6 lg:px-8 ">
                                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{translations[0]}</h3>
                                                <form onSubmit={updateDevice} class="space-y-6" >
                                                    <div>
                                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations[1][0]}</label>
                                                        <input type="text" value={data.name} name="email" onChange={(e) => setData({ ...data, name: e.target.value })} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                    </div>
                                                    <div>
                                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations[1][1]}</label>
                                                        <input type="text" value={data.description} name="password" onChange={(e) => setData({ ...data, description: e.target.value })} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                    </div>
                                                    <div>
                                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{translations[1][2]}</label>
                                                        <input type="text" value={data.phoneNumber} name="password" onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                    </div>

                                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >{translations[2]}</button>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
