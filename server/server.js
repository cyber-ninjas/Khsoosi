const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");
const app = express();
const {search} = require('./controller')

const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//this get for search around for a teacher 
app.get('/search',(req,res)=>{
  search(req.query,res)
})

app.get('classes/id',(req,res)=>{

})


app.use(express.static(__dirname + '/../client/dist'));
// app.post('/dd',(req,res)=>{
//   console.log("called");
//   Subject.create({
//     name:"math33",
//     level:"22"
// }).then(function(data) {
//   console.log(data)
//     res.status(200);
//     res.send(data)
// }).catch(function(error) {
//   // console.log(error)
//     res.status(500);
//     res.json({error:error, stackError:error.stack});
// });
// })
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
