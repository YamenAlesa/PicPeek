const express = require("express");
const app = express();
const PORT = process.env.PORT || 4499;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");

dotenv.config();

// Cors
app.use;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database
mongoose.connect(process.env.MONGOURI, {});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected"));

// API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack
  res.status(500).send("Something went wrong!");
});
