'use strict';


require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
//namespaces
const support = io.of('/support');


const orderQueue = {
  recived: {},
  inprogress: {},
  completed: {},
};


support.on('connection', (socket) => {
  console.log('Support connection created ', socket.id);
  socket.on('help-need', payload => {
    orderQueue.recived[payload.supportID] = payload;
    logger('help-need', payload)
    socket.broadcast.emit('help-need', payload);
  });

  socket.on('inprogress', payload => {
    orderQueue.inprogress[payload.supportID] = payload;
    console.log('inprogress', payload);
    socket.emit('helping', payload);
  });

  socket.on('received', payload => {
    delete orderQueue.recived[payload.supportID];
    delete orderQueue.inprogress[payload.supportID];
    delete orderQueue.completed[payload.supportID];
    support.emit('completed', payload);
  });

  socket.on('getAll', () => {
    for (let key in orderQueue.reveived) {
      socket.emit('help-need', orderQueue.recived[key]);
    }
    for (let key in orderQueue.inprogress) {
      socket.emit('inprogress', orderQueue.inprogress[key]);
    }
    for (let key in orderQueue.completed) {
      socket.emit('completed', orderQueue.completed[key]);
    }
  });

  socket.on('completed', payload => {
    orderQueue.completed[payload.supportID] = payload;
    console.log('help need completed', payload);
  });
});


// function logger('', payload) {
//   console.log(`${event, payload} ON ${new Date()}`);
// };

console.log('HUB-LIVE');