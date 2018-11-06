const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const gen = require('./routes/api/gen');
const app = express();

app.use(bodyParser.json());
app.use('/api/gen', gen);
app.use(cors());

var port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
