require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
const createAdmin = require("./utils/createAdmin");
const checkSlaBreach = require("./utils/slaChecker");
const seedUsers = require("./utils/seedUsers");

const PORT = process.env.PORT || 5000;

sequelize.sync().then(async () => {
  console.log("Database connected & synced");
  await seedUsers();

  await createAdmin();
  // 🔥 STEP 50: SLA breach checker (runs every 1 minute)
  setInterval(() => {
    checkSlaBreach();
  }, 60 * 1000);
  app.use("/api/auth", require("./routes/auth"));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

