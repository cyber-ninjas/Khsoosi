const { db } = require("./database/db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const SECRET_KEY = "any string";
const {
  User,
  Schedule,
  Rating,
  Confirm,
  Subject
} = require("./database/model");
var jwt = require("jsonwebtoken");

//Adding new rating
exports.rating = (req, res) => {
  Rating.create({
    text: req.body.ratingText,
    rate: req.body.rate,
    studentId: req.body.current_studentId,
    teacherId: req.body.current_teacherId,
    userId: req.body.current_teacherId
  })
    .then(function(data) {
      res.status(200);
      res.send(data);
    })
    .catch(function(error) {
      res.status(500);
      res.json({ error: error, stackError: error.stack });
    });
};

exports.updateTeacherProfile = (req, res) => {
  User.update(
    {
      name: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      summary: req.body.summary,
      cvFile: req.body.cvFileUrl,
      img: req.body.imgUrl
    },
    { where: { id: req.body.current_teacherId } }
  )
    .then(() => {
      Schedule.destroy({
        where: {
          userId: req.body.current_teacherId
        }
      });
    })
    .then(() => {
      for (let i = 0; i < req.body.schedules.length; i++) {
        Schedule.create({
          day: req.body.schedules[i].day,
          startHour: req.body.schedules[i].startHour,
          endHour: req.body.schedules[i].endHour,
          userId: req.body.current_teacherId
        });
      }
    })
    .then(function(data) {
      res
        .status(200)
        .json({ result: "The information was successfully updated" });
    })
    .catch(err => res.status(500).json({ error: "Server Error" }));
};

exports.showTeacherInfo = (req, res) => {
  const id = req.params.number;
  User.findOne({
    attributes: [
      "name",
      "phone",
      "location",
      "img",
      "cvFile",
      "email",
      "summary"
    ],
    where: { id: id },
    include: [
      {
        model: Schedule,
        attributes: ["day", "startHour", "endHour"]
      },
      {
        model: Rating,
        attributes: ["rate", "text"]
      },
      {
        model: Subject,
        attributes: ["name", "level"]
      }
    ]
  })
    .then(data => {
      res.status(200);
      res.send(data);
    })
    .catch(error => {
      res.status(404);
      res.json({ error: "Server Error" });
    });
};
//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage

exports.search = (req, res) => {
  let { level, location, name } = req.body;
  location = location || "";
  name = name || "";
  level = level || "";

  db.query(
    `select
users.id,
users.name,
users.img,
users.summary,
users.location,
ROUND(AVG(ratings.rate)) as rate,
subjects.level,
subjects.name AS subjectname
from users
join ratings on users.id= ratings.teacherId
join TeacherSubjects on users.id= TeacherSubjects.userId
join subjects on subjects.id= TeacherSubjects.subjectId
where users.location like '%${location}%' and subjects.name like '%${name}%' and subjects.level like '%${level}%' GROUP BY users.id`
  ).then(([result, metadata]) => {
    console.log(result);
    res.send(result);
  });
};
////this function give the teacher a schedule of the classes he/she have
exports.seeSchedule = (req, res) => {
  // console.log(req.query, 'req--id');

  User.findAll({
    where: {
      is_teacher: true,
      id: req.query.id
    },
    include: [
      {
        model: Schedule
      }
    ]
  }).then(result => {
    let info = [];

    for (let i = 0; i < result[0].schedules.length; i++) {
      let obj = {};
      obj.day = result[0].schedules[i].day;
      obj.startHour = result[0].schedules[i].startHour;
      obj.endHour = result[0].schedules[i].endHour;
      info.push(obj);
    }
    // console.log({ data: info });
    res.send({ data: info });
  });
};

exports.login = (req, res) => {
  const query = req.body;
  console.log(query);
  User.findOne({
    where: {
      email: query.email
    }
  })
    .then(data => {
      if (data) {
        let hash = data.password;
        if (bcrypt.compareSync(query.password, hash)) {
          const token = jwt.sign(
            {
              email: query.email,
              userId: query.id
            },
            SECRET_KEY,
            {
              expiresIn: "1h"
            }
          );
          // console.log({ token: token, user_id: data.id, is_teacher: data.is_teacher }, 'hello');
          res.send({
            token: token,
            user_id: data.id,
            is_teacher: data.is_teacher
          });
        } else {
          res.send({ error: "Your Input not correct" });
        }
      } else {
        res.send({ error: "Please SignUp" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.signup = (req, res) => {
  // console.log('ok');
  const info = req.body;
  User.findOne({ where: { email: info.email } })
    .then(exist => {
      if (exist)
        return res
          .status(401)
          .send({ error: "The email already exist pleas signIn!" });
      password = bcrypt.hashSync(info.password, 10);
      User.create({
        email: info.email,
        password: password,
        name: info.userName,
        phone: info.phone,
        location: info.location,
        is_teacher: info.is_teacher
      })
        .then(user => {})
        .then(created => {
          return res.send({ created: created });
        })
        .catch(err => res.send({ error: "can't store the account" }));
    })
    .catch(err => res.send({ error: "server error" }));
};

exports.pick = (req, res) => {
  console.log("ddddddd\n\n\n\n\n\n", req.body, "\n\n\n\n ddddddd");
  // Confirm.findOne({
  //   where: {
  //     day: req.body.day,
  //     start: req.body.startHour,
  //     end: req.body.endHour,
  //     studentId: req.body.studentId,
  //     teacherId: req.body.teacherId
  //   }
  // }).then(data => {
  //   // res.send(data)
  //   if (data) return res.status(401).send({ error: "You alredy pick up!" });
  //   Confirm.create({
  //     day: req.body.day,
  //     start: req.body.startHour,
  //     end: req.body.endHour,
  //     studentId: req.body.studentId,
  //     teacherId: req.body.teacherId,
  //     confirmed: "Not yet"
  //   })
  //     .then(created => {
  return res.send({ created: "we recive your request wait " });
  // })
  // .catch(err => res.send({ error: "server error" }));
  // });
};

exports.conform = (req, res) => {
  const id = req.query.teacherId;
  db.query(
    `select TeacherConfirms.id, users.name, TeacherConfirms.start, TeacherConfirms.end, TeacherConfirms.day, TeacherConfirms.confirmed from TeacherConfirms  JOIN users on TeacherConfirms.studentId = users.id and TeacherConfirms.teacherId = ${id}`
  ).then(([result, metadata]) => res.send(result));
};

exports.conformAnswer = (req, res) => {
  let query = req.query;
  // console.log(query, 'gfhgfh');
  Confirm.update(
    { confirmed: query.confirmed },
    {
      where: {
        id: query.id
      }
    }
  )
    .then(result => {
      const id = req.query.teacherId;
      db.query(
        `select TeacherConfirms.id, users.name, TeacherConfirms.start, TeacherConfirms.end, TeacherConfirms.day, TeacherConfirms.confirmed from TeacherConfirms  JOIN users on TeacherConfirms.studentId = users.id and   TeacherConfirms.teacherId = ${id} `
      ).then(([result, metadata]) => res.send(result));
    })
    .catch(function(err) {
      req.server.log(["error"], err.stack);
    });
};
