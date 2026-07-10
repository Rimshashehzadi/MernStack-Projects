import React from 'react'
import logo from '../../assets/logo.webp'

import { LiaEnvelopeOpenTextSolid } from "react-icons/lia";
import { PiPhoneCall } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const SideBar = ({ isOpen, setIsOpen }) => {
    return (
        <div
            className={`fixed top-3 bottom-3 right-0 w-120 bg-white overflow-y-auto rounded-2xl shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Close Button */}
            <div className="flex justify-end p-4">
                <button
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>
            </div>

            {/* Logo */}
            <img src={logo} alt="logo" className="w-50 ml-8" />
            <div className="text-gray-600 text-lg font-semibold mt-4 ml-20">


                <div className=" space-y-8 mt-12 cursor-pointer">
                    <div className="flex gap-x-4 items-center">
                        <FaFacebookF size={30} />
                        <h1 className="text-2xl  text-gray-900 font-medium">Facebook</h1>
                    </div>

                    <div className="flex gap-x-4 items-center">
                        <FaTwitter size={30} />
                        <h1 className="text-2xl  text-gray-900 font-medium">Twitter</h1>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <FaInstagram size={30} />
                        <h1 className="text-2xl  text-gray-900 font-medium">Instagram</h1>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <FaLinkedinIn size={30} />
                        <h1 className="text-2xl  text-gray-900 font-medium">LinkedIn</h1>
                    </div>
                </div>

                <div className="mt-10 border-b-2 border-gray-300 pb-6 space-y-8">
                    <h1 className="text-xl font-semibold">Contact Information</h1>
                    <div className="flex gap-2.5">
                        <LiaEnvelopeOpenTextSolid size={25} className="mt-2.5" />
                        <p className="text-lg text-gray-500 ">General Inquiries <br /><span className="text-gray-800 font-semibold">info@example.com</span></p>

                    </div>
                    <div className="flex gap-2.5 mt-4">
                        <PiPhoneCall size={25} className="mt-2.5" />
                        <p className="text-lg text-gray-500 ">Emergency Cases <br /><span className="text-gray-800 font-semibold">+1 24565 89856</span></p>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SideBar