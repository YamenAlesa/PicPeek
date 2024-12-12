const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4499;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

// Database
mongoose.connect(process.env.MONGOURI, {});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected"));

// Cors
app.use(cors());


// API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);


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
