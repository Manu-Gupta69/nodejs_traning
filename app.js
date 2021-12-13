const express = require("express");
const cors = require("cors");

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

app.listen(3000, () => {
  console.log("listening on port 3000");
});
