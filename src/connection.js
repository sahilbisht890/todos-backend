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
      connectTimeout: 50000,
      statement_timeout: 30000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 20000,
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
