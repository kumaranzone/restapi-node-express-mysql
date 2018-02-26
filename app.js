const express = require('express');
const mysql = require('mysql');
var bodyParser  = require('body-parser');

// db configuration
const config = {
  host: 'localhost',
  user:'root',
  password: '0H@$h123#',
  database: 'oriensuat'

}
const db = mysql.createConnection(config);

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('Mysql connected')
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route

let apiRouter = require('./routers/api')(express, db);
app.use('/api', apiRouter);



app.listen('3000', ()=> {
  console.log('Server started on port 3000')
});