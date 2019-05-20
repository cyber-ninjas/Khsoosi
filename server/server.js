const express = require("express");
const bodyParser = require("body-parser");
const formData = require('express-form-data');
const db = require("./database/db");
const {User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject} = require("./database/model");
const {storage} = require ('./database/firebase.js');
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());
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
app.post ('/profileUpdate', (req, res) => {
  //const values = Object.values(req.files)
  const img = req.files.myImage;
  const uploadTask = storage.ref(`images/${img.name}`).put(img);
  const url = storage.ref('images').child(image.name).getDownloadURL();
  // uploadTask.on('state_changed', 
  // (snapshot) => {
  //   //progress function ....
  //   // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //   // this.setState({progress});
  // },
  // (error) => {
  //   // error function ....
  //   console.log(error);
  // },
  // () => {
  //   // complete function ....
  //   storage.ref('images').child(image.name).getDownloadURL().then(imgUrl => {
  //     // this.setState({imgUrl});
  //     // console.log(this.state);
  //     res.send({imgUrl});
  //     console.log(imgUrl);
  //   })
  // });
  
  console.log(url);
  //res.send({url});
  
  
})

// handleImgUpload () {
//   const {image} = this.state;
//   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  // uploadTask.on('state_changed', 
  // (snapshot) => {
  //   //progress function ....
  //   const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //   this.setState({progress});
  // },
  // (error) => {
  //   // error function ....
  //   console.log(error);
  // },
  // () => {
  //   // complete function ....
  //   storage.ref('images').child(image.name).getDownloadURL().then(imgUrl => {
  //     this.setState({imgUrl});
  //     console.log(this.state);
  //     console.log(imgUrl);
  //   })
  // });
//   console.log(this.state);
// }