const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const five = require('johnny-five');

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log('listening on port 3000!');
});

const board = new five.Board();

board.on('ready', function () {
  const servoHorizontal = new five.Servo({
    pin: 10
  });

  const servoVertical = new five.Servo({
    pin: 9
  });

  this.repl.inject({
    servoHorizontal
  });

  const ldrTopRight = new five.Sensor('A1');
  const ldrTopLeft = new five.Sensor('A2');
  const ldrBottomRight = new five.Sensor('A0');
  const ldrBottomLeft = new five.Sensor('A3');

  setInterval(function () {
    let topRightValue = ldrTopRight.value;
    let topLeftValue = ldrTopLeft.value;
    let bottomRightValue = ldrBottomRight.value;
    let bottomLeftValue = ldrBottomLeft.value;

    let gradosServoHorizontal = servoHorizontal.value;
    let gradosServoVertical = servoVertical.value;

    let avgTop = (topLeftValue + topRightValue) / 2;
    let avgRight = (topRightValue + bottomRightValue) / 2;
    let avgBottom = (bottomRightValue + bottomLeftValue) / 2;
    let avgLeft = (topLeftValue + bottomLeftValue) / 2;

    if (avgTop < avgBottom) {
      gradosServoVertical++;
      servoVertical.to(gradosServoVertical);
    } else if (avgTop > avgBottom) {
      gradosServoVertical--;
      servoVertical.to(gradosServoVertical);
    } else {
      servoVertical.to(gradosServoVertical);
    }

    if (avgLeft > avgRight) {
      gradosServoHorizontal++;
      servoHorizontal.to(gradosServoHorizontal);
    } else if (avgLeft < avgRight) {
      gradosServoHorizontal--;
      servoHorizontal.to(gradosServoHorizontal);
    } else {
      servoHorizontal.to(gradosServoHorizontal);
    }

    io.emit('rotaciones',
      [gradosServoVertical, gradosServoHorizontal]);

  }, 1000);
});