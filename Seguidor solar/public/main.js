const socket = io();

socket.on('rotaciones', function (data) {
    // console.log(data);
    // document.getElementById('angulos')
    //     .innerHTML = `Ángulos del servo horizontal: ${data.servos.gradosServoHorizontal},
    //     Ángulos del servo vertical: ${data.servos.gradosServoVertical}`;

    document.getElementById('ldr')
        .innerHTML = `topRightValue: ${data.ldrs.topRightValue},
    topLeftValue: ${data.ldrs.topLeftValue},
    bottomRightValue: ${data.ldrs.bottomRightValue},
    bottomLeftValue: ${data.ldrs.bottomLeftValue}`;

    // document.getElementById('promedios')
    //     .innerHTML = `avgTop: ${data.promedios.avgTop},
    // avgRight: ${data.promedios.avgRight},
    // avgBottom: ${data.promedios.avgBottom},
    // avgLeft: ${data.promedios.avgLeft}`;


});