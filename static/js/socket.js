const socket = io("http://localhost:9800")

socket.on("connect", () => {
    console.log("[ws] socket successfully connected");
})