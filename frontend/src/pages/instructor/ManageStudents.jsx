import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Filter, MoreVertical, ExternalLink } from "lucide-react";
import { useCourseStore } from "../../store/useCourseStore";
import Loader from "../../components/Loader";
import { format } from "date-fns";

const ManageStudents = () => {
  const { fetchInstructorStudents, instructorStudents, isLoading } =
    useCourseStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInstructorStudents();
  }, [fetchInstructorStudents]);

  const filteredStudents = instructorStudents.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courseName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8 p-2">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Student Management
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage students enrolled in your courses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search students or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 outline-none pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-purple-500 w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* STUDENT TABLE */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Course
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Enrolled Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Progress
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((item, index) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={item.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold uppercase overflow-hidden">
                          {item.avatar ? (
                            <img src={item.avatar} alt="" />
                          ) : (
                            item.studentName.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {item.studentName}
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Mail size={12} /> {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
                        {item.courseName}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                      {format(new Date(item.enrollmentDate), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-full max-w-[120px] space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span
                            className={
                              item.progress === 100
                                ? "text-green-500"
                                : "text-purple-600"
                            }
                          >
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            className={`h-full ${item.progress === 100 ? "bg-green-500" : "bg-purple-600"}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                          title="View Profile"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-20 text-center text-slate-400 font-medium"
                  >
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
