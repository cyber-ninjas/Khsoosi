const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
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
app.listen(port, function() {
  console.log('listening on port !');
});
