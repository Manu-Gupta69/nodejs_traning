const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/auth");

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
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
