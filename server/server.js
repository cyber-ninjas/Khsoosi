const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");
const app = express();
const {search , seeSchedule , checkTheUser} = require('./controller')

const khsoosiRouter = require('./router');


const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("",khsoosiRouter);
//this get for search around for a teacher 
app.get('/search',(req,res)=>{
  search(req.query,res)
})
////this function give the teacher a schedule of the classes he/she have
app.get('/classes/id',(req,res)=>{
//  console.log(req.query)
  seeSchedule(req.query,res)
})

app.get('/login',(req,res)=>{
  console.log(req.body)
checkTheUser(req.body,res)

})

app.use(express.static(__dirname + '/../client/dist'));

app.post('/rating',(req,res)=>{
  console.log("called");
  Rating.create({
    text: req.body.ratingText,
    rate:req.body.rate
}).then(function(data) {
    res.status(200);
    res.send(data)
}).catch(function(error) {
    res.status(500);
    res.json({error:error, stackError:error.stack});
});
})
app.listen(port, function() {
  console.log('listening on port !',port);
});
