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
    for (let i = 0; i < result.length; i++) {
      let obj = {}
      obj.subject = result[i].name
      obj.level = result[i].level
      obj.name = result[i].users[0].name
      obj.phone = result[i].users[0].phone
      obj.location = result[i].users[0].location
      obj.img = result[i].users[0].img
      obj.cvFile = result[i].users[0].cvFile
      obj.summary = result[i].users[0].summary
      obj.reatingText = result[i].users[0].ratings[0].text
      obj.rate = result[i].users[0].ratings[0].rate
      obj.date = result[i].users[0].ratings[0].date
      info.push(obj)
    }
    res.send(result)
    console.log({ data: info }, "hello woerdjfakljlkj")
  })
}
exports.seeSchedule = (req, res) => {

}
