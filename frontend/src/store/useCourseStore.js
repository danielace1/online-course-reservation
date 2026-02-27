import { create } from "zustand";
import axiosInstance from "../config/axios";
import toast from "react-hot-toast";

export const useCourseStore = create((set) => ({
  isLoading: false,
  error: null,

  createCourse: async (courseData) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosInstance.post("/courses", courseData);

      set({ isLoading: false });
      return { success: true, data: res.data };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Course creation failed",
      });
      toast.error(error.response?.data?.message || "Course creation failed");

      return { success: false };
    }
  },

  addCourseContent: async (courseContent) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosInstance.post("/course-contents", courseContent);

      set({ isLoading: false });
      return { success: true, data: res.data };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Content upload failed",
      });
      toast.error(error.response?.data?.message || "Content upload failed");
      return { success: false };
    }
  },
}));
