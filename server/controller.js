const cd = require("./database/db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const {
  User,
  Schedule,
  Role,
  Permission,
  Subject,
  Rating,
  PermissionRole,
  UserRole,
  TeacherSubject
} = require("./database/model");
const Op = Sequelize.Op;
//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage
exports.search = (req, res) => {
 Subject.findAll({
   where: {
     name: `${req.name}`,
     level: `${req.level}`
 },
  include: [{
    model: User,
      where: {
      location: `${req.location}`,
      },
    include:[{
      model:Rating
    }]
  }]
}).then(result => {
      console.log(result)
       let info = [];
       var obj1 = {}
       obj1.subject = result[0].name
       obj1.level = result[0].level

       for (let i = 0; i < result[0].users.length; i++) {
          let obj = {}
          obj.id = result[0].users[i].id
          obj.name = result[0].users[i].name
          obj.phone = result[0].users[i].phone
          obj.location = result[0].users[i].location
          obj.img = result[0].users[i].img
          obj.cvFile = result[0].users[i].cvFile
          obj.summary = result[0].users[i].summary
          obj.reatingText = result[0].users[i].ratings[0].text
          obj.rate = result[0].users[i].ratings[0].rate
          obj.date = result[0].users[i].ratings[0].date
          obj.subject =  obj1.subject
          obj.level = obj1.level
          info.push(obj)
      }
     res.send({data:info})
    
  })
}
////this function give the teacher a schedule of the classes he/she have
exports.seeSchedule = (req,res) => {
  console.log(req,"req--id")
  User.findAll({
    where:{
      is_teacher:true,
      id:req.id
    },
    include:[{
      model:Schedule
    }]
  }).then(result => {
    let info = [];
    
    for (let i = 0; i < result[0].schedules.length; i++) {
      let obj = {}
      obj.day = result[0].schedules[i].day
      obj.startHour = result[0].schedules[i].startHour
      obj.endHour = result[0].schedules[i].endHour
    info.push(obj)
  }

    res.send({data:info})
  })  
}


exports.checkTheUser = (req,res) =>{
  console.log(req)
  User.findOne({
    where:{
      email:req.email,
      password: req.password
    }
  }).then((data) => console.log(data))


}







