import Payment from "../models/payment.model.js";
import Reservation from "../models/reservation.model.js";
import Progress from "../models/progress.model.js";
import Course from "../models/course.model.js";
import Notification from "../models/notification.model.js";

export const getMyCourses = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      student: req.user._id,
      status: "active",
    }).populate("course");

    const courses = reservations.map((r) => r.course);

    res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("course", "title")
      .populate("user", "name email");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStudentDashboardData = async (req, res) => {
  try {
    const studentId = req.user._id;

    const progressData = await Progress.find({ student: studentId })
      .populate("course", "title")
      .sort({ updatedAt: -1 });

    const enrolledCount = progressData.length;
    const completedCount = progressData.filter(
      (p) => p.status === "completed",
    ).length;

    const totalPercentage = progressData.reduce(
      (acc, curr) => acc + curr.completedPercentage,
      0,
    );
    const avgProgress =
      enrolledCount > 0 ? Math.round(totalPercentage / enrolledCount) : 0;

    const recentActivities = progressData.slice(0, 5).map((p) => ({
      text: `Worked on ${p.course.title}`,
      time: p.updatedAt,
      type: "progress",
    }));

    const stats = [
      {
        title: "Enrolled Courses",
        value: enrolledCount.toString().padStart(2, "0"),
      },
      { title: "Completed", value: completedCount.toString().padStart(2, "0") },
      { title: "Learning Hours", value: "0h" }, // Placeholder, can be calculated based on course content
      { title: "Progress Rate", value: `${avgProgress}%` },
    ];

    res.status(200).json({
      stats,
      progressCourses: progressData.slice(0, 3).map((p) => ({
        name: p.course.title,
        progress: p.completedPercentage,
      })),
      activities: recentActivities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfileData = async (req, res) => {
  try {
    const studentId = req.user._id;

    const enrollments = await Reservation.find({
      student: studentId,
      status: "active",
    })
      .populate("course", "title image category instructor")
      .sort({ createdAt: -1 });

    const payments = await Payment.find({ user: studentId })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    const progressRecords = await Progress.find({ student: studentId });
    const completedCourses = progressRecords.filter(
      (p) => p.status === "completed",
    ).length;

    res.status(200).json({
      enrollments,
      payments,
      stats: {
        totalEnrolled: enrollments.length,
        completed: completedCourses,
        totalSpent: payments
          .filter((p) => p.status === "success")
          .reduce((acc, curr) => acc + curr.amount, 0),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const studentGlobalSearch = async (req, res) => {
  try {
    const { query } = req.query;

    const courses = await Course.find({
      isPublished: true,
      title: { $regex: query, $options: "i" },
    })
      .select("title image category finalFee")
      .limit(4);

    const categories = await Course.distinct("category", {
      category: { $regex: query, $options: "i" },
    });

    res.json({ courses, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
