const Ticket = require("../models/Ticket");
const { Op } = require("sequelize");
const sendNotification = require("./notify");

const checkSlaBreaches = async () => {
  const now = new Date();

  const tickets = await Ticket.findAll({
    where: {
      isBreached: false,
      resolutionDueAt: {
        [Op.lt]: now,
      },
    },
  });

  for (let ticket of tickets) {
    ticket.isBreached = true;
    await ticket.save();
    console.log(`SLA breached for ticket ${ticket.id}`);
    await sendNotification(
  ticket.createdBy,
  `SLA breached for your ticket (Ticket ID: ${ticket.id})`
);
 
  }
};

module.exports = checkSlaBreaches;
