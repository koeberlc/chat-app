// getting-started.js
const express = require('express');
//Create an application 
const app = express();

const path = require('path');

const mongoose = require('mongoose');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const client = require('socket.io')(3000).sockets;

let bodyParser = require('body-parser');




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


const Message = require('./models/messages');

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        console.log(data)
        let newMessage = Message ({
            users: [data.user1,data.user2],
            message : data.message
        });
      
        newMessage.save()
        .then((savedMessage) => {
    
            //send back the created Message
            res.json(savedMessage);
                
        }, (err) => {
            res.status(400).json(err)
        });
        io.emit('chat message', data.message);
    });
  });

app.use(loginRoutes);
app.use(messagesRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('listening on port:' + port);
  });