const express = require("express");
const server = express();
const userRouter= require("./route/user");
const AdminRouter= require("./route/Admin");
const FeedbackRouter= require("./route/feedback");
const DataRouter= require("./route/data");
const StaffRouter= require("./route/staff");
const httpServer = require('http').createServer(server);
const cors = require("cors");
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const port = 3000;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectMongo = require("./database/mongodb"); // Assuming MongoDB connection logic

// ... other route imports (userRouter, AdminRouter, DataRouter)

dotenv.config();

connectMongo();
server.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  // methods: ["GET", "POST"],
  credentials: true
}));

server.use(express.json());
server.use(cookieParser());

// Routes
server.use("/api", userRouter);
server.use("/api", AdminRouter);
server.use("/api",FeedbackRouter );
server.use("/api", DataRouter);
server.use("/api", StaffRouter);
// ... other route usage

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  // Handle incoming chat messages
  socket.on('chat message', (data) => {
    console.log('Received message:', data);
    const { recipient, message, sender } = data;
    if (recipient === 'admin' || recipient === 'user' || recipient === 'staff') {
      io.emit(`${recipient} message`, { sender, message }); // Emit to specific recipient
    } else {
      console.warn(`Invalid recipient: ${recipient}`); // Handle invalid recipient
    }
  });
});

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));

