const socket = io();

socket.on('servo', function (data) {    
    document.getElementById('angulos')
        .innerHTML = `Ángulo del servo: ${data}`;
});