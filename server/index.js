const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

// API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// All other routes serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack
  res.status(500).send("Something went wrong!");
});
