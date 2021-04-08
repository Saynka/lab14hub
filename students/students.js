'use strict';

// const io = require('socket.io')(port);
// const caps = io.of('/caps');

// const socket = io.connect(host);
// const capsSocket = io.connect(`${host}/caps`);

// student = vendor =====
// const store = 'acme-widgets';
// const faker = require('faker');
// const io = require('socket.io-client');
// const capsURL = 'http://localhost:3000/support';
// const socket = io.connect(capsURL);
// socket.emit('getAll');
// setInterval(() => {
//   socket.emit('pickup', {
//     event: 'pickup',
//     time: Date(),
//     clientId: store,
//     messageId: faker.address.zipCode(),
//     order: {
//       orderId: faker.address.zipCode(),
//       name: faker.name.findName(),
//       address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
//     },
//   });
// }, 5000);
// socket.on('delivered', (payload) => {
//   if (payload.clientId === store) {
//     socket.emit('received', payload);
//     console.log(`Widgets were delivered - ${payload.order.orderId}`);
//   }
// });

// require('dotenv').config();
// const faker = require('faker');
// const io = require('socket.io-client');
// const capsURL = 'http://localhost:3000/support';
// const socket = io.connect(capsURL);

// socket.emit('getAll');

// setInterval(() => {
//   const newObj = new Student();
//   socket.emit('help-needed', newObj)
// }, 2000);
// socket.on('help-needed', (payload) => {
//   console.log(`${payload.TAjob}\n ${payload.TA}\n HELP YOU SOON!!!!!`);
// });
// socket.on('conclusion', (payload) => {
//   setTimeout(() => {
//     console.log(`we hope you enjoyed our help - ${payload.studentName} have a wonderful day`);
//   }, 4000);
// });

// class Student {
//   constructor() {
//     this.studentName = faker.name.findName(),
//       this.supportID = faker.address.zipCode(),
//       this.tableNumber = faker.datatype.number(),
//       this.jobTitle = faker.name.title(),
//       this.TA = faker.name.findName()
//   }

// };

const faker = require('faker');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/support';
const socket = io.connect(capsURL);

socket.emit('getAll');

setInterval(() => {
  const newObj = new Student()
  socket.emit('help-need', newObj)
}, 2000);
socket.on('help-need', (payload) => {
  console.log(`${payload.jobTitle}${payload.TA} HELP YOU SOON!!!!!`)
})
socket.on('conclusion', (payload) => {
  setTimeout(() => {
    console.log(`we hope you enjoyed our help - ${payload.studentName} have a wonderful day`);
  }, 4000)
});

class Student {
  constructor() {
    this.studentName = faker.name.findName(),
      this.supportID = faker.address.zipCode(),
      this.tableNumber = faker.datatype.number(),
      this.jobTitle = faker.name.title(),
      this.TA = faker.name.findName()
  }
}