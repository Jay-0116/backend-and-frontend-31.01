const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, markAsRead);
router.get("/count", getNotificationCount);

module.exports = router;
