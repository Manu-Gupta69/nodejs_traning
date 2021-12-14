const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const sequelize = require("./database/database");

const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: ["X-AUTH-TOKEN"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

(async function () {
  try {
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
