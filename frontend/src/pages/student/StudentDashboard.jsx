import StudentSidebar from "./StudentSidebar";
import StudentTopbar from "./StudentTopbar";
import { motion } from "framer-motion";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <StudentSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentTopbar />

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Enrolled Courses",
                value: "08",
                icon: BookOpen,
                color: "bg-purple-100 text-purple-600",
              },
              {
                title: "Completed",
                value: "03",
                icon: Award,
                color: "bg-green-100 text-green-600",
              },
              {
                title: "Learning Hours",
                value: "120h",
                icon: Clock,
                color: "bg-orange-100 text-orange-600",
              },
              {
                title: "Progress Rate",
                value: "75%",
                icon: TrendingUp,
                color: "bg-blue-100 text-blue-600",
              },
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{card.title}</p>
                      <h2 className="text-3xl font-bold mt-2 text-gray-800">
                        {card.value}
                      </h2>
                    </div>

                    <div className={`p-3 rounded-xl ${card.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* PROGRESS SECTION */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Learning Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Course Progress
              </h3>

              <div className="space-y-5">
                {[
                  { name: "React Mastery", progress: 80 },
                  { name: "Node.js Advanced", progress: 60 },
                  { name: "MongoDB Bootcamp", progress: 40 },
                ].map((course, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {course.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Recent Activity
              </h3>

              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span>Completed React Basics Lecture</span>
                  <span className="text-gray-400">2h ago</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Enrolled in Node Advanced</span>
                  <span className="text-gray-400">Yesterday</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Updated Profile</span>
                  <span className="text-gray-400">2 days ago</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
