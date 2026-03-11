import Reservation from "../models/reservation.model.js";
import Course from "../models/course.model.js";
import Progress from "../models/progress.model.js";
import mongoose from "mongoose";

// Enroll / Reserve Course
export const reserveCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid Course ID",
      });
    }

    const course = await Course.findById(courseId);

    if (!course || !course.isPublished) {
      return res.status(404).json({
        message: "Course not available",
      });
    }

    // Check already enrolled
    const existingReservation = await Reservation.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    const reservation = await Reservation.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json({
      message: "Course reserved successfully",
      reservation,
    });
  } catch (error) {
    console.log("Error in reserveCourse:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Enrolled Courses
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      student: req.user._id,
      status: "active",
    }).populate("course");

    const enhancedReservations = await Promise.all(
      reservations.map(async (resv) => {
        const progressRecord = await Progress.findOne({
          student: req.user._id,
          course: resv.course._id,
        });

        return {
          ...resv._doc,
          completedPercentage: progressRecord
            ? progressRecord.completedPercentage
            : 0,
        };
      }),
    );

    res.status(200).json(enhancedReservations);
  } catch (error) {
    console.log("Error in getMyReservations:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Reservation
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      student: req.user._id,
      course: req.params.courseId,
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      message: "Reservation cancelled",
    });
  } catch (error) {
    console.log("Error in cancelReservation:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
