'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const studentURL = 'http://localhost:3000/support';

const socket = io.connect(studentURL);



socket.emit('getAll');

socket.on('help-need', (payload) => {

  setTimeout(() => {
    socket.emit('received', payload);
    console.log(`${payload.studentName} is requesting help at table# ${payload.tableNumber}`);
    
    socket.emit('inprogress', payload);
  },5000);

});

socket.on('helping', (payload) => {
  
  setTimeout(() => {
    socket.emit('received', payload);
    
    socket.emit('completed', payload);
  },6000);

});
socket.on('conclusion', (payload) => {
  
  setTimeout(() => {
    
  console.log(`nice!${payload.TA}, DONE!!`)
  },6000);

});
console.log('SUPPORT-LIVE');

