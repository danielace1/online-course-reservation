import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  CreditCard,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../config/axios";
import Loader from "../../components/Loader";
import { format } from "date-fns";
import { Link } from "react-router";

const StudentProfile = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("courses");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/student/profile-data");
        setProfileData(data);
      } catch (err) {
        console.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Loader />;

  const tabs = [
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 min-h-screen">
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1 shadow-xl">
              <img
                src={
                  user?.profilePic ||
                  "https://ui-avatars.com/api/?name=" + user?.username
                }
                className="w-full h-full object-cover rounded-[2.2rem]"
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-black text-slate-800">
              {user?.username}
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-1">
              <Mail size={14} /> {user?.email}
            </p>
          </div>
          <div className="flex gap-4 pb-2">
            <div className="text-center px-4 border-r border-slate-100">
              <p className="text-xl font-black text-indigo-600">
                {profileData?.stats?.totalEnrolled}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Enrolled
              </p>
            </div>
            <div className="text-center px-4">
              <p className="text-xl font-black text-emerald-500">
                {profileData?.stats?.completed}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <AnimatePresence mode="wait">
        {activeTab === "courses" && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {profileData?.enrollments.map((enrol) => (
              <div
                key={enrol._id}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <img
                  src={enrol.course?.image}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                  alt=""
                />
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                  {enrol.course?.category}
                </span>
                <h3 className="font-bold text-slate-800 mt-2 group-hover:text-indigo-600 transition-colors">
                  {enrol.course?.title}
                </h3>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />{" "}
                    {format(new Date(enrol.createdAt), "MMM yyyy")}
                  </span>
                  <Link
                    to={`/student/course/${enrol.course?._id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    <button className="text-indigo-600 hover:underline cursor-pointer">
                      Continue Learning
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "billing" && (
          <motion.div
            key="billing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Course</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {profileData?.payments.map((p) => (
                  <tr key={p._id} className="text-sm font-medium">
                    <td className="px-8 py-4 text-slate-800 font-bold">
                      {p.course?.title}
                    </td>
                    <td className="px-8 py-4 text-slate-500">
                      {format(new Date(p.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-8 py-4 text-slate-800">₹{p.amount}</td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <ShieldCheck />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Security & Privacy</p>
                  <p className="text-xs text-slate-500">
                    Update password and secure your account.
                  </p>
                </div>
              </div>
              <Link to="/student/settings">
                <button className="text-sm font-bold text-indigo-600 hover:underline cursor-pointer">
                  Manage
                </button>
              </Link>
            </div>
            <button
              onClick={logout}
              className="w-full p-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut size={20} /> Logout from Account
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentProfile;
