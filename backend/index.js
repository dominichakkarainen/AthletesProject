require("dotenv").config();

const express = require("express");
const cors = require("cors");
const athleteRoutes = require("./routes/athleteRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/athletes", athleteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Athlete API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
