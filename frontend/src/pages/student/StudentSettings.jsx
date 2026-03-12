import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Camera,
  Save,
  ShieldAlert,
  Trash2,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const StudentSettings = () => {
  const { user, updateProfile, changePassword, deactivateAccount } =
    useAuthStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    image: null,
  });
  const [preview, setPreview] = useState(user?.profilePic || "");

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setProfileForm({ ...profileForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateProfile(profileForm);
    if (success) toast.success("Profile updated successfully");
    setLoading(false);
  };

  const onChangePass = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    const success = await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
    if (success)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    setLoading(false);
  };

  const sidebarItems = [
    { id: "profile", label: "Public Profile", icon: User },
    { id: "security", label: "Security & Login", icon: Lock },
    { id: "danger", label: "Account Actions", icon: ShieldAlert },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500  outline-none transition-all text-sm bg-slate-50/50";
  const labelClass =
    "block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Account Settings
        </h1>
        <p className="text-slate-500 font-medium">
          Update your personal information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* SIDEBAR NAV */}
        <div className="lg:col-span-4 space-y-2 bg-gray-50 p-4 rounded-2xl border border-slate-100 h-52">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm cursor-pointer ${
                activeSection === item.id
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={20}
                  className={
                    activeSection === item.id
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }
                />
                {item.label}
              </div>
              <ChevronRight
                size={16}
                className={
                  activeSection === item.id ? "opacity-100" : "opacity-0"
                }
              />
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeSection === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 space-y-10"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                      <img
                        src={
                          preview ||
                          "https://ui-avatars.com/api/?name=" + user?.username
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg cursor-pointer hover:bg-indigo-700 transition-transform active:scale-90">
                      <Camera size={20} />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-slate-800">
                      Profile Picture
                    </h3>
                    <p className="text-sm text-slate-400 font-medium">
                      Update your avatar to be recognized in discussions.
                    </p>
                  </div>
                </div>

                <form onSubmit={onUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className={labelClass}>Username</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={profileForm.username}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={labelClass}>Email Address</label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="email"
                          disabled
                          className={`${inputClass} pl-11 bg-slate-100/50 text-slate-400 cursor-not-allowed`}
                          value={user?.email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={labelClass}>Short Bio</label>
                    <textarea
                      rows={4}
                      className={inputClass}
                      placeholder="Tell others about your learning journey..."
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"
                  >
                    <Save size={18} />{" "}
                    {loading ? "Saving..." : "Update Profile"}
                  </button>
                </form>
              </motion.div>
            )}

            {activeSection === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-8">
                  Change Password
                </h3>
                <form onSubmit={onChangePass} className="space-y-6 max-w-md">
                  <div className="space-y-1">
                    <label className={labelClass}>Current Password</label>
                    <input
                      type="password"
                      className={inputClass}
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>New Password</label>
                    <input
                      type="password"
                      className={inputClass}
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Confirm New Password</label>
                    <input
                      type="password"
                      className={inputClass}
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 cursor-pointer">
                    Update Securely
                  </button>
                </form>
              </motion.div>
            )}

            {activeSection === "danger" && (
              <motion.div
                key="danger"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold text-red-900">
                    Deactivate Account
                  </h3>
                  <p className="text-sm text-red-700/70 max-w-md font-medium">
                    This will disable your account. Your course progress and
                    certificates will be preserved, but you won't be able to log
                    in.
                  </p>
                </div>
                <button className="px-8 py-3.5 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
                  <Trash2 size={18} /> Deactivate Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
