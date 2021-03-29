const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

app.use(require('./board'));

app.listen(3000, () => {
  console.log('listening!');
});