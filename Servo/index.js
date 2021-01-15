const express = require('express');
const app = express();
const five = require('johnny-five');

app.use('/public',express.static('public'));
app.use(express.static(__dirname+' public'));

app.get('/',function (req,res){
  res.sendFile();
})

app.listen(3000,()=>{
  console.log('listening!');
})

function guardarAngulos (anguloServo) {
    return anguloServo;
}
module.exports = {
    angulo:guardarAngulos
}

const board = new five.Board();

board.on('ready', function (){

  const servo1 = new five.Servo({
    pin:9
  });
  
  /*const servo2 = new five.Servo({
    pin:10
  });*/

  this.repl.inject({
    servo1,
  });

  servo1.to(180);
  guardarAngulos(servo1.value);

});

board.on("error", (err)=>{
  console.log(err);
});
