const socket = io();

socket.on('rotaciones', function (data) {
    console.log(data);
    document.getElementById('angulos')
        .innerHTML = `Ángulos del servo horizontal: ${data[1]},
        Ángulos del servo vertical: ${data[0]}`;
});