import { Bell, Search } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const StudentTopbar = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-gray-200/70">
      <div className="px-10 py-5 flex items-center justify-between">
        {/* LEFT */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {user?.username || "Student"}
            </span>{" "}
            👋
          </h1>
          <p className="text-sm text-gray-500">
            Continue your learning journey today.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* SEARCH */}
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses, lectures..."
              className="w-80 pl-11 pr-5 py-2.5
              rounded-full
              bg-white/70
              border border-gray-200
              focus:border-purple-500
              focus:ring-4 focus:ring-purple-100
              outline-none
              transition-all duration-300"
            />
          </div>

          {/* NOTIFICATION */}
          <div className="relative cursor-pointer">
            <div className="p-2 rounded-full hover:bg-purple-50 transition">
              <Bell className="text-gray-600 hover:text-purple-600 transition" />
            </div>

            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center
              bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-md"
            >
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
