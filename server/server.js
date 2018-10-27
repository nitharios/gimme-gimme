require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.EXPRESS_CONTAINER_PORT || 8989;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/api', routes);

const app = server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});

const io = socket(app);

io.on('connection', socket => {  
  socket.on('CREATE', data => {    
    socket.join(data.roomID);
  })

  socket.on('JOIN', data => {
    socket.join(data.roomID);
    io.to(data.roomID).emit('JOINED', data.userName);
  })
});