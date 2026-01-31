const express = require("express");
const {
  createTicket,
  listTickets,
  updateTicket,
} = require("../controllers/ticket.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

const router = express.Router();

// Customer creates ticket
router.post(
  "/",
  protect,
  authorize("CUSTOMER"),
  upload.single("file"),
  createTicket
);

router.get("/count", getTicketCount);
router.get("/open", getOpenTickets);
router.get("/closed", getClosedTickets);

// List tickets
router.get("/", protect, listTickets);

// Update ticket status / assign agent
router.patch("/:ticketId", protect, authorize("ADMIN", "AGENT"), updateTicket);

router.get("/reports/stats", getTicketStats);

module.exports = router;
