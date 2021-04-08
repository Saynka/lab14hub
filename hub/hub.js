'use strict';


require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
//namespaces
const support = io.of('/support');


const orderQueue = {
  received: {},
  inprogress: {},
  completed: {},
};
support.on('connection', (socket) => {
  console.log('Support connection created ', socket.id);
  socket.on('help-need', payload => {
    orderQueue.received[payload.supportID] = payload;
//  logger('help-need',payload)
 console.log('EVENT', payload);
socket.emit('help-need', payload);
  });
  socket.on('inprogress', payload => {
    orderQueue.inprogress[payload.supportID] = payload;
  //  logger('inprogress',payload)
    socket.emit('help-need', payload); 
    console.log('EVENT', payload);
  });
  socket.on('received', payload => {
    delete orderQueue.received[payload.supportID];
    delete orderQueue.inprogress[payload.supportID];
    delete orderQueue.completed[payload.supportID];
    support.emit('completed', payload);
  });
  socket.on('getAll', () => {
    for(let key in orderQueue.reveived) {
      socket.emit('help-need', orderQueue.received[key]);
    }
    for(let key in orderQueue.inprogress) {
      socket.emit('inprogress', orderQueue.inprogress[key]);
    }
    for(let key in orderQueue.completed) {
      socket.emit('completed', orderQueue.completed[key]);
    }
  });
  socket.on('completed', payload => {
    orderQueue.completed[payload.supportID] = payload;
    console.log('EVENT:', payload);
    socket.broadcast.emit('completed', payload);
     support.emit('completed', { supportID: payload.supportID, payload: payload});
  });
})
console.log('HUB-LIVE');