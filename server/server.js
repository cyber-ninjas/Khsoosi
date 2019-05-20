const express = require("express");
const bodyParser = require("body-parser");
const formData = require('express-form-data');
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");

const app = express();
const {search, rating, seeSchedule} = require('./controller')
const khsoosiRouter = require('./router');


const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("",khsoosiRouter);
app.use(express.static(__dirname + '/../client/dist'));

app.post('/rating',(req,res)=>{
  rating(req, res);
})

app.listen(port, function() {
  console.log('listening on port !',port);
});