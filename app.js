const express = require("express");

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
