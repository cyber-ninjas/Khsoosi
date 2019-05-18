const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");
const app = express();
const {search} = require('./controller')
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search',(req,res)=>{
  // console.log(req.query)
  search(req.body,res)
  
})


app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, function() {
  console.log('listening on port !');
});
