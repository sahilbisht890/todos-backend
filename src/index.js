const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./connection");
const userRouter = require("./routes/userRoutes");


app.use(express.json());


sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log("Error while connecting Database", err);
  });

app.use('/user' , userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running", process.env.PORT || 3000);
});
