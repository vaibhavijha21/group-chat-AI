const socket = io("http://localhost:5000");

document.getElementById("sendBtn").addEventListener("click", () => {
    sendMessage();
});

document.getElementById("imageInput").addEventListener("change", () => {
    sendImage();
});

document.getElementById("joinBtn").addEventListener("click", () => {
    const username = document.getElementById("usernameInput").value.trim();
    if (username !== "") {
        socket.emit("join_chat", username);
    }
});

socket.on("receive_message", (message) => {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("p");

    if (message.type === "image") {
        messageElement.innerHTML = `<b>${message.user}:</b> <br><img src="${message.content}" width="200">`;
    } else {
        messageElement.innerHTML = `<b>${message.user}:</b> ${message.text}`;
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on("user_list", (users) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = users.map(user => `<li>${user}</li>`).join("");
});

// Function to send text messages
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const usernameInput = document.getElementById("usernameInput");

    if (messageInput.value.trim() !== "" && usernameInput.value.trim() !== "") {
        const message = {
            user: usernameInput.value,
            text: messageInput.value,
            type: "text"
        };
        socket.emit("send_message", message);
        messageInput.value = "";
    }
}

// Function to send images
function sendImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageMessage = {
                user: document.getElementById("usernameInput").value,
                content: event.target.result, // Base64 string
                type: "image"
            };
            socket.emit("send_message", imageMessage);
        };
        reader.readAsDataURL(file);
        fileInput.value = "";
    }
}



