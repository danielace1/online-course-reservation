import { Link } from "react-router";
import { BookOpen, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f0c29] text-gray-400 border-t border-white/10">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-indigo-600/10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={28} className="text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Learnify
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Empowering learners worldwide with high-quality, accessible, and
              modern education experiences.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/CS23Students"
                target="_blank"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 transition"
              >
                <Github size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 transition"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-purple-400 transition"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-purple-400 transition">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-400 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>

            <p className="text-sm mb-4">
              Subscribe to get latest courses and updates.
            </p>

            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
              />
              <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition cursor-pointer">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
