const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')
const userRouter = require('./routes/userRouter')
const messageRouter = require('./routes/messagesRoute')
app.use(express.json())
app.use(cors())
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log('db connection successfully connected'))
.catch((err)=>{
    console.log(err)
})
app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter)
const server = app.listen(process.env.PORT,()=>{
    console.log(`This port running ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})
global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        console.log({data},data)
        const sendUserSocker = onlineUsers.get(data.to)
        if(sendUserSocker){
            socket.to(sendUserSocker).emit("msg-recieve",data.message)
        }
    })
})