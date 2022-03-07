// getting-started.js
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const client = require('socket.io')(3000).sockets;

let bodyParser = require('body-parser');

//Create an application 
const app = express();

//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());


url = "mongodb://localhost:27017/MongoChat"

const connectDb = async () => {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(`Connected to database`)
        },
        error => {
            console.error(`Connection error: ${error.stack}`)
            process.exit(1)
        }
    )
}
connectDb().catch(error => console.error(error))

const messagesRoutes = require('./routes/messages');
const loginRoutes = require('./routes/login');


const user = require("./models/users");
const message = require("./models/messages");
const Message = require('./models/messages');

client.on("connection", (socket) => {
    console.log("user connected");
    socket.emit("message", "Hi");

    socket.on("chatmessage", msg => {

        client.emit("message", msg)
    })
    sendStatus = function(s){
        const message = new Message({users:[], message:msg})
        message.save().then(()=>{
            socket.emit("status", s)
        });
        
    }


})

app.use(loginRoutes);
app.use(messagesRoutes)


const port = process.env.PORT || 8080;
app.listen(port);
console.log("Server is running on port: " + port);