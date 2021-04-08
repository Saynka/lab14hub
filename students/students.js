('use strict');


const faker = require('faker');
const io = require('socket.io-client');
const studentURL = 'http://localhost:3000/support';

const socket = io.connect(studentURL);

socket.emit('getAll');

setInterval(() => {
  const newObj = new Student()
  socket.emit('help-need', newObj)

}, 3000);

socket.on('help-need', (payload) => {
  console.log(`${payload.jobTitle} ${payload.TA} HELP YOU SOON!!!!!`)
})


socket.on('conclusion', (payload) => {
  setTimeout(() => {
    console.log(`we hope you enjoyed our help ${payload.studentName} have a wonderful day`);
  },6000)
});

class Student {
  constructor() {
    this.studentName = faker.name.findName()
    this.supportID = faker.address.zipCode(),
      // this.tableNumber = faker.music.genre()
      this.tableNumber =faker.datatype.number()
    this.jobTitle = faker.name.title()
    this.TA = faker.name.findName()
  }
}

console.log('student-LIVE');
