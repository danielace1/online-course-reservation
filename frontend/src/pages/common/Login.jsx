import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30 bottom-0 right-0 animate-pulse"></div>

      <div className="hidden lg:flex w-1/2 items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md space-y-6 z-10"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BookOpen size={40} className="text-purple-500" />
            <h1 className="text-3xl font-bold">Learnify</h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Learn Without Limits.
          </h2>

          <p className="text-gray-400 text-lg">
            Access thousands of courses from expert instructors. Upgrade your
            skills and future today.
          </p>

          {/* Illustration */}
          <img
            src="https://illustrations.popsy.co/gray/student-with-laptop.svg"
            alt="learning"
            className="w-full mt-6"
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-400">Login to continue your journey</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail size={18} className="absolute top-3 left-3 text-gray-400" />

              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute top-3 left-3 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot */}
            <div className="flex justify-end text-sm">
              <Link
                to="/forgot-password"
                className="text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold hover:scale-[1.02] hover:shadow-lg transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Signup
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
