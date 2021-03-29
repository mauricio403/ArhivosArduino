const five = require('johnny-five');
const { Router } = require('express');
const router = Router();

const board = new five.Board();

let data = {};

board.on('ready', function () {
    const servo = new five.Servo({
        pin: 9
    });

    // let contador = 0;

    // setInterval(function () {
    //     contador++;
    //     data.contador = contador;
    // }, 2000);

    // servo.to(0);
    let grados = servo.value;
    servo.startAt = grados;
    const interval = setInterval(() => {
        grados++;
        if (grados >= 180) {
            servo.stop();
            console.log(grados);
            clearInterval(interval);
        }
        servo.to(grados);
        console.log(grados);
    }, 1000);



    this.repl.inject({
        servo
    });

});

board.on("error", (err) => {
    console.log(err);
});

router.get('/data', (req, res) => {
    res.json(data);
});

module.exports = router;