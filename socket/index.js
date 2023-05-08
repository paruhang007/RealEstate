const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// get all users
let users = [];

// check if user from users[] array exists and add user only if it doesn't exist
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// remove user from users[] array if the user disconnects
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// get user from users[] array
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //io.emit("w", "welcome to the chat");

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    // send users[] array to frontend
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
