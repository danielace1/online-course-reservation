import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses/instructor");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Courses</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-sm border p-5"
          >
            <img
              src={course.image}
              className="w-full h-40 object-cover rounded-xl"
            />

            <h3 className="font-semibold mt-3">{course.title}</h3>

            <p className="text-sm text-gray-500">{course.category}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  navigate(`/instructor/courses/${course._id}/add-content`)
                }
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg"
              >
                Add Content
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
