const { Router } = require('express');
const router = Router();
const five = require('johnny-five');

const board = new five.Board();

let data = {};

board.on('ready', function () {
    const servoHorizontal = new five.Servo({
        pin: 10,
        startAt: 90
    });

    const servoVertical = new five.Servo({
        pin: 9,
        startAt: 90
    });

    // this.repl.inject({
    //     servoVertical,
    //     servoHorizontal
    // });
    
    const ldrTopRight = new five.Sensor('A1');
    const ldrTopLeft = new five.Sensor('A2');
    const ldrBottomRight = new five.Sensor('A0');
    const ldrBottomLeft = new five.Sensor('A3');

    setInterval(function () {
        let topRightValue = ldrTopRight.value;
        let topLeftValue = ldrTopLeft.value;
        let bottomRightValue = ldrBottomRight.value;
        let bottomLeftValue = ldrBottomLeft.value;

        data.ldrs = {
            topRightValue: topRightValue,
            topLeftValue: topLeftValue,
            bottomRightValue: bottomRightValue,
            bottomLeftValue: bottomLeftValue
        }
        console.log(data.ldrs);
        let gradosServoHorizontal = servoHorizontal.value;
        let gradosServoVertical = servoVertical.value;

        data.servos = {
            gradosServoHorizontal: gradosServoHorizontal,
            gradosServoVertical: gradosServoVertical
        }
        console.log(data.servos)

        let avgTop = (topLeftValue + topRightValue);
        let avgRight = (topRightValue + bottomRightValue);
        let avgBottom = (bottomRightValue + bottomLeftValue);
        let avgLeft = (topLeftValue + bottomLeftValue);

        data.promedios = {
            avgTop: avgTop,
            avgRight: avgRight,
            avgBottom: avgBottom,
            avgLeft: avgLeft
        }


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
    }, 500);
});

router.get('/data', (req, res) => {
    res.json(data);
});

module.exports = router;