const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(require('./board'));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});