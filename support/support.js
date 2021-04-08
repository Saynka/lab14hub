'use strict';

// //suport//=== driver====
// const io = require('socket.io-client');
// const capsURL = 'http://localhost:3000/support';
// const socket = io.connect(capsURL);
// socket.emit('getAll');
// socket.on('help-need', (payload) => {
//   setTimeout(() => {
//     socket.emit('received', payload);
//     console.log(`Picking up ${payload.order.orderId}`);
//     payload.event = 'in-transit';
//     socket.emit('in-transit', payload);
//   }, 1500);
// });
// socket.on('in-transit', (payload) => {
//   setTimeout(() => {
//     socket.emit('received', payload);
//     payload.event = 'delivered';
//     socket.emit('delivered', payload);
//   }, 3000);
// });
// console.log('***SUPPORT LIVE***');

require('dotenv').config();
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/support';
const socket = io.connect(capsURL);

socket.emit('getAll');

socket.on('help-need', (payload) => {
  setTimeout(() => {
    socket.emit('received', payload);
    console.log(`${payload.studentName} is requesting help at table ${payload.tableNumber}`);
    socket.emit('inprogress', payload);
  }, 5000);
});

socket.on('helping', (payload) => {
  setTimeout(() => {
    socket.emit('received', payload);
    socket.emit('complete', payload);
  }, 6000);
});

socket.on('conclusion', (payload) => {
  setTimeout(() => {
    console.log(`nice!${payload.TA}, DONE!!`)
  }, 6000);
});

console.log('SUPPORT-LIVE');

