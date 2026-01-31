const Notification = require("../models/Notification");

// Get notifications for logged-in user
exports.getNotifications = async (req, res) => {
  const notifications = await Notification.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]],
  });
  res.json(notifications);
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByPk(id);
  if (!notification) {
    return res.status(404).json({ message: "Not found" });
  }

  notification.isRead = true;
  await notification.save();

  res.json({ message: "Marked as read" });
};
exports.getNotificationCount = async (req, res) => {
  const count = await Notification.count();
  res.json({ count });
};
