const Ticket = require("../models/Ticket");
const Attachment = require("../models/Attachment");
const sendNotification = require("../utils/notify");


// Create new ticket (Customer)
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      customerId: req.user.id,
    });
     if (req.file) {
      await Attachment.create({
        fileName: req.file.originalname,
        filePath: req.file.path,
        ticketId: ticket.id,
        uploadedBy: req.user.id,
      });
    }
    

    // After ticket creation
res.status(201).json({
  message: "Ticket created successfully",
  ticket,
});

// Step 3: Send email to customer
await sendNotification(
  req.user.id,
  "Your ticket has been created successfully"
);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// List tickets
exports.listTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "ADMIN" || req.user.role === "AGENT") {
      tickets = await Ticket.findAll({
        include: [
          { model: require("../models/User"), as: "customer", attributes: ["id", "name", "email"] },
          { model: require("../models/User"), as: "agent", attributes: ["id", "name", "email"] },
        ],
      });
    } else {
      // Customer: only own tickets
      tickets = await Ticket.findAll({
        where: { customerId: req.user.id },
        include: [
          { model: require("../models/User"), as: "customer", attributes: ["id", "name", "email"] },
          { model: require("../models/User"), as: "agent", attributes: ["id", "name", "email"] },
        ],
      });
    }

    res.json({
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update ticket status or assign agent (Admin/Agent only)
exports.updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, agentId } = req.body;

    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (status) ticket.status = status;
    if (agentId) ticket.agentId = agentId;

    await ticket.save();

    await sendNotification(
    agentId,
    `A ticket has been assigned to you (Ticket ID: ${ticket.id})`
    );
    await sendNotification(
  ticket.createdBy,
  `Your ticket status updated to ${status}`
);



// Step 3: Notify customer about status/agent update
const customer = await require("../models/User").findByPk(ticket.customerId);

if (customer) {
  await sendEmail(
    customer.email,
    `Ticket Update: ${ticket.title}`,
    `Your ticket with ID ${ticket.id} has been updated. Status: ${ticket.status}. Assigned agent: ${ticket.agentId || "Not assigned"}`
  );
}

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getTicketStats = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();

    const total = tickets.length;
    const open = tickets.filter(t => t.status === "Open").length;
    const closed = tickets.filter(t => t.status === "Closed").length;

    res.json({ total, open, closed });
  } catch (err) {
    res.status(500).json({ message: "Error fetching report stats" });
  }
};
exports.getTicketCount = async (req, res) => {
  const count = await Ticket.count();
  res.json({ count });
};
exports.getOpenTickets = async (req, res) => {
  const count = await Ticket.count({ where: { status: "Open" } });
  res.json({ count });
};
exports.getClosedTickets = async (req, res) => {
  const count = await Ticket.count({ where: { status: "Closed" } });
  res.json({ count });
};
