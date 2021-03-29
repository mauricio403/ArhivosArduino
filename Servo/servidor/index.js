const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

const five = require('johnny-five');

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log('listening!');
})

const board = new five.Board();

let data = {};

board.on('ready', function () {

  const servo = new five.Servo({
    pin: 9
  });

  this.repl.inject({
    servo
  });

  // setInterval(() => {
  //   io.emit('servo', servo.value);
  //   // console.log(servo.value);
  // }, 1000);

  let interruptor = true;

  setInterval(function () {

    if (interruptor) {
      servo.to(0);
      data.message = 'Servo en ' + servo.value;
    }
    servo.to(180);
    data.grados = servo.value;
    interruptor = !interruptor;
    // console.log(servo.value)
    io.emit('servo', data);
  }, 2000);

});

board.on("error", (err) => {
  console.log(err);
});
