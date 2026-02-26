import { Link, useLocation } from "react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardPath = () => {
    if (!user) return "/";
    if (user.role === "student") return "/student/dashboard";
    if (user.role === "instructor") return "/instructor/dashboard";
    if (user.role === "admin") return "/admin/dashboard";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="fixed top-3 w-full flex justify-center z-50">
      <nav
        className={`w-[95%] max-w-7xl transition-all duration-500 rounded-2xl border border-white/10 ${
          scrolled
            ? "bg-[#0f0c29]/70 backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,0.25)]"
            : "bg-white/5 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between px-8 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <BookOpen
              size={30}
              className="text-purple-500 group-hover:rotate-12 transition duration-300"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10 font-medium lg:ml-20">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="relative group">
                <span
                  className={`transition ${
                    location.pathname === link.path
                      ? "text-purple-400"
                      : "text-gray-300 group-hover:text-purple-400"
                  }`}
                >
                  {link.name}
                </span>

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition duration-300"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition font-medium shadow-sm"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition font-medium shadow-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden px-6 pb-6 space-y-4 text-gray-300"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-purple-400 transition"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-gray-700" />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 py-2 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-500 hover:text-white transition font-medium"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
