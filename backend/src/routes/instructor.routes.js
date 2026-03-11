import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  getCourseStudents,
  getInstructorDashboardStats,
  getInstructorEarnings,
  getInstructorEnrollments,
  getInstructorRevenue,
  getInstructorStudents,
} from "../controllers/instructor.controller.js";

const router = express.Router();

// Instructor access only
router.use(authMiddleware, roleMiddleware("instructor"));

router.get("/revenue", getInstructorRevenue);
router.get("/enrollments", getInstructorEnrollments);
router.get("/earnings", getInstructorEarnings);
router.get("/stats", getInstructorDashboardStats);
router.get("/my-students", getInstructorStudents);
router.get("/course/:id/students", getCourseStudents);

// Earnings

export default router;
