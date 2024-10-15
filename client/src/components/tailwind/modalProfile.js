import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useContext } from 'react'
import { LanguageCtx } from '../contexts/language'
import { ClientCtx } from '../contexts/ClientContext'
import axios from 'axios'
import UseProduct from '../hooks/useProduct'
import { useEffect } from 'react'


export default function ModalProfile({ options }) {
    const { language } = useContext(LanguageCtx)
    const [APPURL] = useState(process.env.REACT_APP_APIURL)
    const { openProfile, setOpenProfile } = options
    const translations = require(`../lang/${language}.json`).viewProfile;
    const { client } = useContext(ClientCtx)
    const { product, fetchProduct } = UseProduct()
    const [nbrWish, setNbrWish] = useState(null)
    useEffect(() => {
        fetchProduct().then((d) => console.log(''))
        axios.get(APPURL+"getWishList", {
            headers: {
              "X-API-Key": process.env.REACT_APP_APIKEY,
            }
          }).then((d) => setNbrWish(d.data.wishList.filter(e=>{
            return e.client === client?._id
        }).length))
    }, [openProfile])
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={openProfile} as={Fragment}>
            <Dialog as="div" className="relative  z-10" initialFocus={cancelButtonRef} onClose={setOpenProfile}>
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
                                <div
                                    class="">
                                    <div class="rounded-t-lg h-32 overflow-hidden">
                                        <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                                    </div>
                                    <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                                        <img class="object-cover object-center h-32" src='https://cdn-icons-png.flaticon.com/512/6596/6596121.png' alt='Woman looking front' />
                                    </div>
                                    <div class="text-center mt-2">
                                        <h2 class="font-semibold">{client?.name}</h2>
                                        <p class="text-gray-500">{translations[0]}</p>
                                    </div>
                                    <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                                        <li class="flex flex-col items-center justify-around">
                                            <p>{translations[1][0]}</p>
                                            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <div>{nbrWish}</div>
                                        </li>
                                        <li class="flex flex-col items-center justify-between">
                                        <p>{translations[1][1]}</p>
                                            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                                            </svg>
                                            <div>{product.length}</div>
                                        </li>
                                        <li class="flex flex-col items-center justify-around">
                                        <p>{translations[1][2]}</p>
                                            <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                                            </svg>
                                            <div>{product.filter((d) => { return d.client._id === client?._id }).length}</div>
                                        </li>
                                    </ul>
                                    <div class="p-4 border-t mx-8 mt-2">
                                        <button onClick={()=>setOpenProfile(false)}  class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">{translations[2]}</button>
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
