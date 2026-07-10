import React, { useState } from 'react'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.webp';
import { IoChevronDown } from "react-icons/io5";
import { Grip } from 'lucide-react';
import { Search } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import MobileNavbar from './MobileNavbar';
import SideBar from './SideBar';

const Navbar = () => {
  const Menu = [
    { name: "Home", path: '/' },
 {
      name: "Pages",
      path: '',
      subMenu: [
        { name: "About Us", path: "/about" },
        { name: "Hospitals", path: "/hospitals" },
        { name: "Contact Us", path: "/contact" },
     

        { name: "Signup", path: "/signup" },

      ],
    },

    { name: "Blog", path: '/blogs' },
    { name: "Shop", path: "/admin" },
    { name: "Contact Us", path: "/contact" },

  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=' sticky top-0 z-50'>
      <div className='  py-2 px-6 lg:px-30  gap-8 w-full   bg-white border-b-2 border-gray-200  left-0 right-0'>

        <div className="flex items-center justify-between h-15">
          {/* logo */}
          <Link to="/">
            <img src={logo} alt="Company Logo" className="h-10 w-auto" />
          </Link>
          {/* 🔹 Desktop Menu */}
         <ul className="hidden lg:flex items-center gap-8">
  {Menu.map((item, index) => (
    <li
      key={index}
      className="group relative"
    >
      {item.subMenu ? (
        <button className="flex items-center gap-1 text-xl font-semibold text-gray-700 hover:text-primary transition">
          {item.name}
          <IoChevronDown
            size={16}
            className="group-hover:rotate-180 transition duration-300"
          />
        </button>
      ) : (
        <Link
          to={item.path}
          className="relative text-xl font-semibold text-gray-700 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        >
          {item.name}
        </Link>
      )}

      {item.subMenu && (
        <div className="absolute left-0 top-full mt-4 w-64 rounded-lg bg-primary text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <ul className="py-2">
            {item.subMenu.map((subItem, i) => (
              <li key={i}>
                <Link
                  to={subItem.path}
                  className="block px-5 py-3 text-white hover:bg-white hover:text-primary transition"
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ))}
</ul>
          {/* 🔹 Right Side */}
          <div className=" items-center gap-4 hidden lg:flex">
            <div className="relative inline-block cursor-pointer">
              <ShoppingBag size={30} className="text-gray-600" />

              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                0
              </span>
            </div>

            {/* <ShoppingBag size={30} className="cursor-pointer text-gray-600" /> */}
            <Search size={30} className="cursor-pointer text-gray-600" />

            <button onClick={() => setIsOpen(true)}>
              <Grip size={30} className="cursor-pointer hidden lg:flex text-gray-600" />
            </button>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <MobileNavbar />
        </div>

      </div>

    </nav>
  )
}

export default Navbar