import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BookOpen,
  Home,
  User,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Available Courses", path: "/courses", icon: BookOpen },
    { name: "My Courses", path: "/enrolled", icon: ClipboardList },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg overflow-hidden"
    >
      {/* Logo & Collapse */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <BookOpen size={28} className="text-indigo-400" />
          {!isCollapsed && (
            <span className="text-xl font-semibold tracking-tight text-gray-100">
              Learnify
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-700 transition"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Profile */}
      <div
        className={`flex items-center gap-4 p-4 border-b border-gray-700 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-gray-900 font-bold text-lg">
          {user?.name?.[0] || "U"}
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <p className="font-medium text-gray-100">{user?.name}</p>
            <span className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded-full mt-1 inline-block">
              {user?.role}
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-4 p-3 rounded-lg text-gray-200 transition-colors hover:bg-gray-700 ${
                isActive ? "bg-indigo-600 text-white" : ""
              }`}
            >
              <Icon
                size={20}
                className={isActive ? "text-white" : "text-gray-300"}
              />
              {!isCollapsed && <span className="font-medium">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
