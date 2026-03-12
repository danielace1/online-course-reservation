import { useEffect, useState } from "react";
import { Bell, Search, Sparkles, Book, CheckCheck, X, Zap } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../config/axios";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

const StudentTopbar = () => {
  const { user } = useAuthStore();

  // Search States
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ courses: [], categories: [] });
  const [showResults, setShowResults] = useState(false);

  // Notification States
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  // 1. Debounced Global Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length > 2) {
        try {
          const { data } = await axiosInstance.get(
            `/student/search?query=${search}`,
          );
          setResults(data);
          setShowResults(true);
        } catch (err) {
          console.error("Search error", err);
        }
      } else {
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // 2. Fetch Notifications
  const fetchNotif = async () => {
    try {
      const { data } = await axiosInstance.get("/student/notifications");
      setNotifications(data);
    } catch (err) {
      console.error("Notif error", err);
    }
  };

  useEffect(() => {
    fetchNotif();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-gray-200/70">
      <div className="px-10 py-4 flex items-center justify-between relative">
        {/* LEFT: WELCOME MESSAGE */}
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Welcome,{" "}
            <span className="text-indigo-600">
              {user?.username?.split(" ")[0] || "Learner"}
            </span>{" "}
            👋
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Your learning path is waiting
          </p>
        </div>

        {/* RIGHT: TOOLS */}
        <div className="flex items-center gap-6">
          {/* SEARCHBAR */}
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for new skills..."
              className="w-80 pl-11 pr-5 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              onFocus={() => search.length > 2 && setShowResults(true)}
            />

            {/* SEARCH RESULTS DROPDOWN */}
            {showResults && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                {results.courses.length > 0 ? (
                  <div className="p-2">
                    <p className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Top Matches
                    </p>
                    {results.courses.map((c) => (
                      <Link
                        key={c._id}
                        to={`/courseoverview/${c._id}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all group"
                      >
                        <img
                          src={c.image}
                          className="w-10 h-10 rounded-lg object-cover"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                            {c.title}
                          </p>
                          <p className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 rounded w-fit uppercase">
                            {c.category}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs font-medium">
                    No courses found for "{search}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all cursor-pointer relative shadow-sm"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-indigo-600 text-[10px] font-black text-white rounded-full border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="font-bold text-slate-800">Activity</h3>
                  <button className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-1 hover:opacity-70">
                    <CheckCheck size={14} /> Clear
                  </button>
                </div>

                <div className="space-y-1 max-h-80 overflow-y-auto no-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        className={`p-4 rounded-2xl transition-all cursor-pointer ${!n.isRead ? "bg-indigo-50/50" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 p-1.5 rounded-lg h-fit ${n.type === "enrollment" ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"}`}
                          >
                            <Zap size={12} fill="currentColor" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700 leading-snug">
                              {n.message}
                            </p>
                            <p className="text-[9px] text-slate-400 mt-1 font-bold">
                              {formatDistanceToNow(new Date(n.createdAt))} ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center text-slate-300 text-xs font-medium">
                      Nothing new to show!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
