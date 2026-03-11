import { create } from "zustand";
import axiosInstance from "../config/axios";
import toast from "react-hot-toast";

export const useCourseStore = create((set) => ({
  isLoading: false,
  error: null,
  course: null,
  purchased: false,
  activeLecture: null,
  userProgress: null,
  instructorStats: null,
  dashboardData: null,
  isIssuingCertificate: false,

  courses: [],
  contents: [],
  instructorStudents: [],

  getAllCourses: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/courses");
      set({ courses: res.data, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch courses",
      });
      toast.error(error.response?.data?.message || "Failed to fetch courses");
    }
  },

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

  fetchInstructorCourses: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/courses/instructor");

      set({
        courses: res.data,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch courses";

      set({ isLoading: false, error: message });
      toast.error(message);
    }
  },

  fetchCourseContents: async (courseId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/course-contents/${courseId}`);

      set({
        contents: res.data.contents,
        activeLecture: res.data.contents[0] || null,
        isLoading: false,
      });

      // console.log(res.data.contents);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch contents";

      set({ isLoading: false, error: message });
      toast.error(message);
    }
  },

  setActiveLecture: (lecture) => set({ activeLecture: lecture }),

  fetchCourseById: async (courseId) => {
    try {
      const res = await axiosInstance.get(`/courses/${courseId}`);

      set({
        course: res.data.course,
        contents: res.data.contents,
        purchased: res.data.purchased,
      });
    } catch (error) {
      toast.error("Failed to load course");
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const res = await axiosInstance.put(`/courses/${id}`, courseData);
      toast.success("Course updated");
      return { success: true, data: res.data };
    } catch (error) {
      toast.error("Update failed");
      return { success: false };
    }
  },

  updateCourseContent: async (id, data) => {
    try {
      await axiosInstance.put(`/course-contents/${id}`, data);
      toast.success("Lecture updated");
      return { success: true };
    } catch (error) {
      toast.error("Update failed");
      return { success: false };
    }
  },

  deleteCourse: async (id) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      toast.success("Course deleted");
      return { success: true };
    } catch (error) {
      toast.error("Delete failed");
      return { success: false };
    }
  },

  deleteCourseContent: async (id) => {
    try {
      await axiosInstance.delete(`/course-contents/${id}`);
      // toast.success("Content deleted");
      return { success: true };
    } catch (error) {
      toast.error("Delete failed");
      return { success: false };
    }
  },

  // payments
  getClientToken: async () => {
    try {
      const res = await axiosInstance.get("/payments/token");
      return res.data.clientToken;
    } catch (error) {
      toast.error("Failed to load payment gateway");
      return null;
    }
  },

  reserveCourse: async (courseId) => {
    try {
      const res = await axiosInstance.post("/reservations", { courseId });
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "Already enrolled in this course") {
        return { success: true };
      }

      toast.error(message || "Reservation failed");
      return { success: false };
    }
  },

  checkoutCourse: async (paymentMethodNonce, courseId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.post("/payments/checkout", {
        paymentMethodNonce,
        courseId,
      });

      toast.success("Payment successful!");

      set({ isLoading: false });

      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || "Payment failed";

      toast.error(message);

      set({ isLoading: false });

      return { success: false };
    }
  },

  getMyCourses: async () => {
    try {
      const res = await axiosInstance.get("/reservations/my");
      console.log(res.data);

      return res.data;
    } catch (error) {
      toast.error("Failed to fetch enrolled courses");
    }
  },

  // track progress
  fetchMyProgress: async (courseId) => {
    try {
      const res = await axiosInstance.get(`/progress/course/${courseId}`);
      set({ userProgress: res.data });
    } catch (error) {
      console.error("Failed to fetch progress", error);
      set({ userProgress: null });
    }
  },

  updateLessonProgress: async (courseId, contentId) => {
    try {
      const res = await axiosInstance.patch(`/progress/course/${courseId}`, {
        contentId,
      });

      set({ userProgress: res.data.progress });
      toast.success("Lesson completed!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update progress");
    }
  },

  // issue certificate
  issueCertificate: async (courseId) => {
    try {
      set({ isIssuingCertificate: true });
      const res = await axiosInstance.post(`/certificates/course/${courseId}`);
      toast.success("Certificate issued! Check your email.");
      set({ isIssuingCertificate: false });
      return res.data;
    } catch (error) {
      set({ isIssuingCertificate: false });
      toast.error(
        error.response?.data?.message || "Failed to issue certificate",
      );
      return null;
    }
  },

  // student dashboard
  fetchStudentDashboard: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/student/dashboard");
      set({ dashboardData: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Failed to load dashboard data");
    }
  },

  // instructor dashboard
  fetchInstructorStats: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/instructor/stats");
      set({ instructorStats: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Failed to load dashboard statistics");
    }
  },

  fetchInstructorStudents: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/instructor/my-students");
      set({ instructorStudents: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Failed to fetch student data");
    }
  },
}));
