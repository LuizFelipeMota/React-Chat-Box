const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8989;

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE',(data) => {
        socket.broadcast.emit('RECEIVED_MESSAGE',data);
    })

    socket.on('TYPING', (data) => {
        socket.broadcast.emit('RECEIVED_TYPING',data);
    })

})

http.listen(port, () => {
    console.log('Running on *:' + port);
})