const cd = require("./database/db");
const Sequelize = require("sequelize");
const { User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject } = require("./database/model");
const Op = Sequelize.Op;
//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage
exports.search = (req, res) => {
//   console.log(req,"serach controllar")
  User.findAll({

    where: {
      location: `${req.location}`,
    },
    include: [{
      model: Subject,

      where: {
        name: `${req.name}`,
        level: `${req.level}`
      }
    }]
  }).then(result => {
   
    var info = [];
    for (let i = 0; i < result.length; i++) {
      let obj = {}
      obj.summary = result[i].summary
      obj.name = result[i].name
      obj.phone = result[i].phone
      obj.location = result[i].location
      obj.img = result[i].img
      obj.cvFile = result[i].cvFile
      obj.level = result[i].subjects[0].level
      info.push(obj)
    }
   res.send(result[0].subjects[0].level)
   console.log({data:info},"hello woerdjfakljlkj")
  })

}
