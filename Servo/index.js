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

board.on('ready', function () {

  const servo = new five.Servo({
    pin: 9
  });

  this.repl.inject({
    servo
  });

  setInterval(() => {
    io.emit('servo', servo.value);
  }, 1000);

  let interruptor = true;

  setInterval(function () {
    if (servo.value < 90) {
      servo.value++;
      servo.to(servo.value);
    } else {
      servo.value--;
      servo.to(servo.value);
    }
    interruptor = !interruptor;
    console.log(servo.value)
    io.emit('servo', servo.value);
  }, 1000);

});

board.on("error", (err) => {
  console.log(err);
});
