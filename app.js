const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRoutes = require('./routers/home');
const router = express.Router();
const app = express();
const port = process.env.port || 8080;

const uri = 'mongodb://0.0.0.0:27017/studentdetails';

mongoose.connect(uri, {
  });
  
  const db = mongoose.connection;
  
  db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

app.set('view engine','ejs');
app.use(express.static('public'))

// body parser 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/', router)
app.use('/' , dataRoutes)

app.listen(port)