const SlaRule = require("../models/SlaRule");

// CREATE / UPDATE SLA RULE (Admin)
exports.setSlaRule = async (req, res) => {
  try {
    const { priority, responseTime, resolutionTime } = req.body;

    const [rule] = await SlaRule.upsert({
      priority,
      responseTime,
      resolutionTime,
    });

    res.json({
      message: "SLA rule saved",
      rule,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SLA RULES
exports.getSlaRules = async (req, res) => {
  try {
    const rules = await SlaRule.findAll();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
