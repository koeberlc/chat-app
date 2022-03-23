// getting-started.js
const express = require('express');
//Create an application 
const app = express();


const mongoose = require('mongoose');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public/css'));


// Used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());

// Connection à la base de données
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


// Gestion des messages avec socket.io
const Message = require('./models/messages');
const User = require("./models/users");


io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        console.log("data")
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

        User.find({_id:data.user1})
        .then((user) => {
            console.log("user")
            console.log(user)
            data2 = {message:data.message, user:data.user1, username:user[0].name}
            console.log(data2)
            io.emit('chat message', data2);
        }, (err) => {
            return err;
        });
        
    });
  });

// Gestion des routes
const messagesRoutes = require('./routes/messages');
const loginRoutes = require('./routes/login');
const { findUser } = require('./controllers/messages');

app.use(loginRoutes);
app.use(messagesRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
  });

  // Serveur écoute le port 8080
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('listening on port:' + port);
  });