import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, DollarSign, TrendingUp } from "lucide-react";
import { useCourseStore } from "../../store/useCourseStore";
import Loader from "../../components/Loader";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  "Total Courses": BookOpen,
  "Total Students": Users,
  Revenue: DollarSign,
  "Enrollment Rate": TrendingUp,
};

const colorMap = {
  "Total Courses": "bg-indigo-100 text-indigo-600",
  "Total Students": "bg-purple-100 text-purple-600",
  Revenue: "bg-green-100 text-green-600",
  "Enrollment Rate": "bg-orange-100 text-orange-600",
};

const InstructorDashboard = () => {
  const { fetchInstructorStats, instructorStats, isLoading } = useCourseStore();

  useEffect(() => {
    fetchInstructorStats();
  }, [fetchInstructorStats]);

  if (isLoading || !instructorStats) return <Loader />;

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      <main className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
        {/* ANALYTICS CARDS */}
        <div className="grid md:grid-cols-4 gap-6">
          {instructorStats.stats.map((card, index) => {
            const Icon = iconMap[card.title] || BookOpen;
            const colors = colorMap[card.title] || "bg-gray-100 text-gray-600";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {card.title}
                  </p>
                  <h2 className="text-3xl font-black mt-1 text-slate-800">
                    {card.value}
                  </h2>
                </div>
                <div className={`p-3 rounded-2xl ${colors}`}>
                  <Icon size={24} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PERFORMANCE & ENROLLMENTS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Performance */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-800">
              Course Performance
            </h3>
            <div className="space-y-6">
              {instructorStats.coursePerformance.map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-600">
                      {course.name}
                    </span>
                    <span className="text-indigo-600 font-black">
                      {course.students} students
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(course.students / 1000) * 100}%` }} // Simplified scale
                      className="bg-indigo-500 h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-800">
              Recent Enrollments
            </h3>
            <div className="space-y-6">
              {instructorStats.recentEnrollments.length > 0 ? (
                instructorStats.recentEnrollments.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {item.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {item.studentName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Enrolled in {item.courseName}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(item.time))} ago
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-10">
                  No recent enrollments yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
