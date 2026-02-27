import { Bell, Search, Sparkles } from "lucide-react";

const InstructorTopbar = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-gray-200/60">
      <div className="px-10 py-4 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={20} />
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              Creator Workspace
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            Monitor growth, manage courses & inspire learners.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          {/* SEARCH */}
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search courses, students..."
              className="w-80 pl-11 pr-5 py-2.5
              rounded-full
              bg-white/80
              border border-gray-200
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-100
              outline-none
              transition-all duration-300"
            />
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative cursor-pointer">
            <div className="p-2 rounded-full hover:bg-indigo-50 transition">
              <Bell className="text-gray-600 hover:text-indigo-600 transition" />
            </div>

            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center
              bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md"
            >
              2
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InstructorTopbar;
