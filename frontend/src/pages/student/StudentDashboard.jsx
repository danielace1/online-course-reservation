import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { useCourseStore } from "../../store/useCourseStore";
import Loader from "../../components/Loader";
import { formatDistanceToNow, isValid } from "date-fns";

const iconMap = {
  "Enrolled Courses": BookOpen,
  Completed: Award,
  "Learning Hours": Clock,
  "Progress Rate": TrendingUp,
};

const colorMap = {
  "Enrolled Courses": "text-purple-600 bg-purple-100",
  Completed: "text-green-600 bg-green-100",
  "Learning Hours": "text-orange-600 bg-orange-100",
  "Progress Rate": "text-blue-600 bg-blue-100",
};

const StudentDashboard = () => {
  const { fetchStudentDashboard, dashboardData, isLoading } = useCourseStore();

  useEffect(() => {
    fetchStudentDashboard();
  }, [fetchStudentDashboard]);

  if (isLoading || !dashboardData) return <Loader />;

  const { stats, progressCourses, activities } = dashboardData;

  // Helper to format date safely for OOSE robustness
  const getRelativeTime = (timeString) => {
    const date = new Date(timeString);
    return isValid(date) ? `${formatDistanceToNow(date)} ago` : "Recently";
  };

  return (
    <div className="space-y-10">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = iconMap[item.title] || BookOpen;
          const colors = colorMap[item.title] || "text-gray-600 bg-gray-100";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-purple-100 rounded-2xl p-6 flex items-center justify-between shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  {item.title}
                </p>
                <h3 className="text-2xl font-black mt-1 text-gray-800">
                  {item.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${colors.split(" ")[1]}`}>
                <Icon size={22} className={colors.split(" ")[0]} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* COURSE PROGRESS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-purple-100 rounded-2xl p-7 shadow-sm"
        >
          <h2 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-600" />
            Course Progress
          </h2>
          <div className="space-y-6">
            {progressCourses.length > 0 ? (
              progressCourses.map((course, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">
                      {course.name}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-10">
                No courses in progress.
              </p>
            )}
          </div>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-purple-100 rounded-2xl p-7 shadow-sm"
        >
          <h2 className="text-lg font-bold mb-6 text-gray-800">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {activities.length > 0 ? (
              activities.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {getRelativeTime(item.time)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10">
                No recent activity found.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
