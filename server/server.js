var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('Socket ID connected:', socket.id);
    connectedUsers.push(socket);

    socket.on('draw', (data) => {
        console.log('Sending draw data to other clients');
        socket.broadcast.emit('draw', data);
    })

    socket.on('disconnect', () => {
        console.log('Socket ID disconnected:', socket.id);
        connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
http.listen(server_port, () => {
    console.log("Started on : " + server_port);
})