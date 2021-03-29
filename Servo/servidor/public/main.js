const socket = io();

socket.on('servo', function (data) {
    document.getElementById('angulos')
        .innerHTML = `Ángulo del servo: ${data.grados}`;
    // console.log(data)
});

// gsap.registerPlugin(MotionPathPlugin);

// gsap.to("#rect", {
//     duration: 10,
//     repeat: 12,
//     repeatDelay: 0.5,
//     yoyo: false,
//     ease: "power1.inOut",
//     motionPath: {
//         path: "#path",
//         align: "#path",
//         autoRotate: true,
//         alignOrigin: [0.5, 0.5]
//     }
// });