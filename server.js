require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }, // Allow CORS for frontend connection
});

const PORT = process.env.PORT || 5000;
const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY;
const CHATBASE_API_ENDPOINT = "https://www.chatbase.co/api/v1/get-conversations"; // Replace with actual endpoint

app.use(express.static("public")); // Serve static files (like index.html)

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    let username = "";

    // When a user joins, assign them a name
    socket.on("join_chat", (name) => {
        username = name;
        socket.username = username; // Store username in socket object

        console.log(`${username} joined the chat`);
        io.emit("receive_message", { user: "System", text: `${username} joined the chat` });

        // Send updated user list to all clients
        const users = Array.from(io.sockets.sockets.values()).map((s) => s.username).filter(Boolean);
        io.emit("user_list", users);
    });

    // When a user sends a message
    socket.on("send_message", async (message) => {
        io.emit("receive_message", message); // Broadcast message to all users

        // If the message mentions "echo", let AI respond
        if (message.text.toLowerCase().includes("echo")) {
            try {
                if (!CHATBASE_API_KEY) throw new Error("Chatbase API key is missing.");

                const chatbaseResponse = await axios.post(
                    CHATBASE_API_ENDPOINT,
                    {
                        messages: [{ role: "user", content: message.text }],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${CHATBASE_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const aiResponse = chatbaseResponse.data.response || "I didn't understand that.";
                io.emit("receive_message", { user: "Echo (AI)", text: aiResponse });
            } catch (error) {
                console.error("Chatbase API Error:", error.message);
                io.emit("receive_message", { user: "Echo (AI)", text: "Oops! Something went wrong. Try again later." });
            }
        }
    });

    // When a user disconnects
    socket.on("disconnect", () => {
        if (username) {
            console.log(`${username} left the chat`);
            io.emit("receive_message", { user: "System", text: `${username} left the chat` });

            // Update the user list
            const users = Array.from(io.sockets.sockets.values()).map((s) => s.username).filter(Boolean);
            io.emit("user_list", users);
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

