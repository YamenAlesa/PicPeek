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
const chatRoutes = require("./routes/chatRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

// Create HTTP Server
const server = http.createServer(app);

// Setup WebSocket Server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database Connection
mongoose
  .connect(process.env.MONGOURI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// API Endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/chat", chatRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});



let users = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join", (userId) => {
    users[userId] = socket.id; 
  });

  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    try {
      if (users[receiver]) {
        io.to(users[receiver]).emit("receiveMessage", { sender, message });
      }


      await API.post("/chat/send", { sender, receiver, message }); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    Object.keys(users).forEach((key) => {
      if (users[key] === socket.id) delete users[key];
    });
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
