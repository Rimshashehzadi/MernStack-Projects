import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("login");
    setLogin(null);
    setMenuOpen(false);

    window.dispatchEvent(new Event("localStorage-change"));

    navigate("/login");
  };

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem("login"));
    };

    window.addEventListener("localStorage-change", handleStorage);

    return () => {
      window.removeEventListener("localStorage-change", handleStorage);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-950 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            To Do App
          </motion.h1>

          {/* Desktop Menu */}

          {login && (
            <ul className="hidden md:flex items-center gap-8 text-lg">

              <motion.li whileHover={{ scale: 1.08 }}>
                <Link to="/">List</Link>
              </motion.li>

              <motion.li whileHover={{ scale: 1.08 }}>
                <Link to="/add">Add Task</Link>
              </motion.li>

              <motion.li whileHover={{ scale: 1.08 }}>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </motion.li>

            </ul>
          )}

          {/* Mobile Button */}

          {login && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}

        </div>

        {/* Mobile Menu */}

        <AnimatePresence>

          {menuOpen && login && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="flex flex-col py-4 gap-4">

                <motion.li
                  whileHover={{ x: 8 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to="/">List</Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 8 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to="/add">Add Task</Link>
                </motion.li>

                <motion.li whileHover={{ x: 8 }}>
                  <button
                    onClick={logout}
                    className="bg-red-600 w-full py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </motion.li>

              </ul>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </motion.nav>
  );
};

export default NavBar;