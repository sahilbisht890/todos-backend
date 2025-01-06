const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);
sequelize
  .authenticate()
  .then(() => console.log("Successfully authenticated "))
  .catch((err) => {
    console.log("Database authentication failed", err);
});

module.exports = sequelize;
