const cd = require("./database/db");
const Sequelize = require("sequelize");
const { User, Schedule, Role, Permission, Subject, Rating, PermissionRole, UserRole, TeacherSubject } = require("./database/model");
const Op = Sequelize.Op;

//Adding new rating 
exports.rating = (req, res) => {
  Rating.create({
    text: req.body.ratingText,
    rate: req.body.rate
  }).then(function (data) {
    res.status(200);
    res.send(data)
  }).catch(function (error) {
    res.status(500);
    res.json({ error: error, stackError: error.stack });
  });
}

//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage
exports.search = (req, res) => {
  console.log(req, "serach controllar")
  //   User.findAll({
  //       where: {
  //       location: `${req.location}`,
  //     },
  //     include: [{
  //       model: Subject,
  //       where: {
  //         name: `${req.name}`,
  //         level: `${req.level}`
  //       }
  //     }]
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
      include: [{
        model: Rating
      }]
    }]
  }).then(result => {
      console.log(result)
       var info = [];
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
     console.log({data:info},"hello woerdjfakljlkj")
  })
}
exports.seeSchedule = (req, res) => {

}
