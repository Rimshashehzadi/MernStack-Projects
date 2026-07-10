
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo2 from "../../assets/logo2.png";

import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { ArrowRight } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const MobileNavbar = () => {
  const menu = [
    { name: "Home", path: "/" },

    {
      name: "Pages",
      subMenu: [
        { name: "About Us", path: "/about" },
        { name: "Hospitals", path: "/hospitals" },
        { name: "Contact Us", path: "/contact" },
        { name: "Signup", path: "/signup" },
        { name: "Doctor Register", path: "/doctorregister" },
       
      ],
    },

    { name: "Blog", path: "/blogs" },
    { name: "Shop", path: "/shop" },
    { name: "Contact Us", path: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {/* Hamburger */}
      <button
        className="lg:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(true)}
      >
        <RxHamburgerMenu size={28} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[85%] max-w-82.5 bg-primary text-white shadow-xl overflow-y-auto transition-transform duration-300 ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 p-5">
          <img
            src={logo2}
            alt="logo"
            className=" w-32 "
          />

          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-2 hover:bg-gray-700 transition"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-6 py-6">
          <ul className="space-y-2">
            {menu.map((item, index) => (
              <li
                key={index}
                className="border-b border-gray-800 pb-2"
              >
                {item.subMenu ? (
                  <>
                    {/* Parent Menu */}
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex w-full items-center justify-between py-3 text-left text-lg font-medium text-white/80 hover:text-white transition"
                    >
                      <span>{item.name}</span>

                      <IoChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openDropdown === index
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === index
                          ? "max-h-175 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ml-4 border-l border-gray-700 pl-4 py-2 space-y-3">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              onClick={() =>
                                setIsMenuOpen(false)
                              }
                              className="flex items-center justify-between text-sm text-gray-400 hover:text-white transition"
                            >
                              {subItem.name}

                              <ArrowRight size={14} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-lg font-medium text-white/80 hover:text-white transition"
                  >
                    {item.name}

                    <ArrowRight size={16} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="mt-10 pt-6">
            <h3 className="text-lg font-semibold">
              Follow Us
            </h3>

            <div className="mt-5 flex gap-2">
              <a
                href="#"
                className="rounded-full bg-gray-800 p-3 hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-3 hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-3 hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-3 hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileNavbar;