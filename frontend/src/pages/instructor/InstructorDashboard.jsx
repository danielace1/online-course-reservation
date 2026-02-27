import { motion } from "framer-motion";
import { BookOpen, Users, DollarSign, TrendingUp } from "lucide-react";

const InstructorDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* ANALYTICS CARDS */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Courses",
                value: "12",
                icon: BookOpen,
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                title: "Total Students",
                value: "1,240",
                icon: Users,
                color: "bg-purple-100 text-purple-600",
              },
              {
                title: "Revenue",
                value: "$3,420",
                icon: DollarSign,
                color: "bg-green-100 text-green-600",
              },
              {
                title: "Growth Rate",
                value: "18%",
                icon: TrendingUp,
                color: "bg-orange-100 text-orange-600",
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

          {/* COURSE PERFORMANCE + RECENT ENROLLMENTS */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Course Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Course Performance
              </h3>

              <div className="space-y-5">
                {[
                  { name: "React Mastery", students: 420 },
                  { name: "Node.js Advanced", students: 280 },
                  { name: "MongoDB Bootcamp", students: 180 },
                ].map((course, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{course.name}</span>

                    <span className="text-sm font-medium text-indigo-600">
                      {course.students} students
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Enrollments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Recent Enrollments
              </h3>

              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span>John enrolled in React Mastery</span>
                  <span className="text-gray-400">1h ago</span>
                </li>

                <li className="flex justify-between text-sm">
                  <span>Alice joined Node.js Advanced</span>
                  <span className="text-gray-400">3h ago</span>
                </li>

                <li className="flex justify-between text-sm">
                  <span>Michael purchased MongoDB Bootcamp</span>
                  <span className="text-gray-400">Yesterday</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
