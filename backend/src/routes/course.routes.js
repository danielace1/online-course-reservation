import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import optionalAuth from "../middleware/optionalAuth.middleware.js";
import {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  getInstructorCourses,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/instructor", authMiddleware, getInstructorCourses);

router.get("/", getAllCourses);

router.get("/:id", optionalAuth, getCourseById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  createCourse,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  updateCourse,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  deleteCourse,
);

export default router;
