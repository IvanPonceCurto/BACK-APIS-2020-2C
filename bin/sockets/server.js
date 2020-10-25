const io=require("socket.io")(8081);

io.on('connection',socket=>{
    socket.emit("chat-message","hello world")
})
