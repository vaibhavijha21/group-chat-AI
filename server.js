const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = process.env.PORT || 5000;

// ✅ Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Route to serve the landing page first
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Route for the signup page
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "landing.html"));
});

// ✅ Route for the chatbox page
app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat.html"));
});

// 📌 Socket.io logic remains unchanged
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send_message", (message) => {
        io.emit("receive_message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ✅ Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

