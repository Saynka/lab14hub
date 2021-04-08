

'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/support');

socket.emit('getAll');

socket.on('help-need', payload => {
    setTimeout(() => {
        socket.emit('received', payload);
        console.log(`REQUEST*****: ${payload.studentName} is requesting help @ table# ${payload.tableNumber}`);
        socket.emit('inProgress', payload);
    }, 4000);
})

socket.on('helping', payload => {
    setTimeout(() => {
        socket.emit('received', payload);
        socket.emit('completed', payload);
    }, 10000);
})

socket.on('finished', payload => {
    setTimeout(() => {
      console.log(`LEFT*****: ${payload.TA},left!`)
    }, 6000);
})



console.log('SUPPORT-LIVE');

