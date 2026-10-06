import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

// ==========================================
// ROUTES
// ==========================================

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";

// ==========================================
// SOCKETS
// ==========================================

import chatSocket from "./sockets/chatSocket.js";

// ==========================================
// LOAD ENVIRONMENT VARIABLES
// ==========================================

dotenv.config();

// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

// ==========================================
// HTTP SERVER
// ==========================================

const server = http.createServer(app);

// ==========================================
// SOCKET.IO
// ==========================================

const io = new Server(server, {
  cors: {
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,
  },
});

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// ==========================================
// ROOT API
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "VoyageAI API is running successfully 🚀",
  });
});

// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use(
  "/api/auth",
  authRoutes
);

// Customer AI / Human Chat
app.use(
  "/api/chat",
  chatRoutes
);

// Agent System
app.use(
  "/api/agent",
  agentRoutes
);

// ==========================================
// SOCKET CONNECTION
// ==========================================

io.on("connection", (socket) => {
  console.log(
    "Socket connected:",
    socket.id
  );

  // Chat socket
  chatSocket(io, socket);

  // Disconnect
  socket.on("disconnect", () => {
    console.log(
      "Socket disconnected:",
      socket.id
    );
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error(
    "Global server error:",
    err
  );

  return res.status(500).json({
    success: false,
    message:
      "Internal server error.",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `VoyageAI server running on port ${PORT}`
  );
});