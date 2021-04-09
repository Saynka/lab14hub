'use strict';

const socketio = require('socket.io');
const io = socketio(3000);
const support = io.of('/support');

const Queue = {
  received: {},
  inProgress: {},
  completed: {},
}

support.on('connection', socket => {
  console.log('Support connection created', socket.id);

  socket.on('help-need', payload => {
    Queue.received[payload.supportId] = payload;
    logger('Help-Needed *****', payload);

    support.emit('help-need', payload);
  })

  socket.on('inProgress', payload => {
    Queue.inProgress[payload.supportId] = payload;
    logger('In-Progress *****', payload);
    socket.emit('helping', payload);
  })

  socket.on('received', payload => {
    delete Queue.received[payload.supportId];
    delete Queue.inProgress[payload.supportId];
    delete Queue.completed[payload.supportId];
    support.emit('completed', payload);
  })


  socket.on('getAll', () => {
    for (let key in Queue.received) {
      socket.emit('help-need', Queue.received[key]);
    }
    for (let key in Queue.inProgress) {
      socket.emit('inProgress', Queue.inProgress[key]);
    }
    for (let key in Queue.completed) {
      socket.emit('completed', Queue.completed[key]);
    }
  })

  socket.on('completed', payload => {
    Queue.completed[payload.supportId] = payload;
    logger('Completed *****', payload)

    support.emit('finished', payload);
  })
});



function logger(EVENT, payload) {
  let time = new Date();
  console.log({ EVENT, time, payload });
}

console.log('HUB-LIVE');

module.exports = logger;
