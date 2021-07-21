'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);

app.use(express.static(__dirname + '/public'));
  

  app.listen(port);
  console.log('Server started at http://localhost:' + port);
