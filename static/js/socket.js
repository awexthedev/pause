// const socket = io("http://localhost:9800")
const socket = io("https://api.thatalex.dev");

socket.on("connect", () => {
    console.log("[ws] socket successfully connected");
})