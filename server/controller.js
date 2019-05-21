const cd = require('./database/db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'any string';
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
} = require('./database/model');
var jwt = require('jsonwebtoken');

const Op = Sequelize.Op;

//Adding new rating
exports.rating = (req, res) => {
	Rating.create({
		text: req.body.ratingText,
		rate: req.body.rate,
		studentId: req.body.studentId,
		teacherId: req.body.teacherId
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
			 for(let i = 0; i < req.body.schedule.length; i++){
				Schedule.create({
					day: req.body.schedule[i].day,
					startHour: req.body.schedule[i].startHour,
					endHour: req.body.schedule[i].endHour,
					userId: req.body.current_teacherId
				});
			 }
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

//search== its will search for the teacher that have the same location, subject and level
//that the student ask for in the search feild in the homepage
exports.search = (req, res) => {
	const query = req.query;
	Subject.findAll({
		where: {
			name: `${query.name}`,
			level: `${query.level}`
		},
		include: [
			{
				model: User,
				where: {
					location: `${query.location}`
				},
				include: [
					{
						model: Rating
					}
				]
			}
		]
	}).then((result) => {
		if (result.length < 1) return res.send({ err: 'please fill the field' });
		console.log(result);
		let info = [];
		var obj1 = {};
		obj1.subject = result[0].name;
		obj1.level = result[0].level;

		for (let i = 0; i < result[0].users.length; i++) {
			let obj = {};
			obj.id = result[0].users[i].id;
			obj.name = result[0].users[i].name;
			obj.phone = result[0].users[i].phone;
			obj.location = result[0].users[i].location;
			obj.img = result[0].users[i].img;
			obj.cvFile = result[0].users[i].cvFile;
			obj.summary = result[0].users[i].summary;
			obj.reatingText = result[0].users[i].ratings[0].text;
			obj.rate = result[0].users[i].ratings[0].rate;
			obj.date = result[0].users[i].ratings[0].date;
			obj.subject = obj1.subject;
			obj.level = obj1.level;
			info.push(obj);
		}
		res.send({ data: info });
	});
};
////this function give the teacher a schedule of the classes he/she have
exports.seeSchedule = (req, res) => {
	console.log(req.query, 'req--id');
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
	}).then((result) => {
		let info = [];

		for (let i = 0; i < result[0].schedules.length; i++) {
			let obj = {};
			obj.day = result[0].schedules[i].day;
			obj.startHour = result[0].schedules[i].startHour;
			obj.endHour = result[0].schedules[i].endHour;
			info.push(obj);
		}
		console.log({ data: info });
		res.send({ data: info });
	});
};

exports.login = (req, res) => {
	const query = req.query;

	User.findOne({
		where: {
			email: query.email
		}
	})
		.then((data) => {
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
							expiresIn: '1h'
						}
					);
					console.log({ token: token, user_id: data.id, is_teacher: data.is_teacher }, 'hello');
					res.send({ token: token, user_id: data.id, is_teacher: data.is_teacher });
				} else {
					res.send({ err: "you'r password wrong" });
				}
			} else {
				res.send({ err: 'please sigunup' });
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
};

exports.signup = (req, res) => {
	console.log('ok');
	const info = req.body;
	User.findOne({ where: { email: info.email } })
		.then((exist) => {
			if (exist) return res.status(401).send({ error: 'The email already exist pleas signIn!' });
			password = bcrypt.hashSync(info.password, 10);
			User.create({
				email: info.email,
				password: password,
				name: info.userName,
				phone: info.phone,
				location: info.location,
				is_teacher: info.is_teacher
			})
				.then((user) => {})
				.then((created) => {
					return res.send({ created: created });
				})
				.catch((err) => res.send({ error: "can't store the account" }));
		})
		.catch((err) => res.send({ error: 'server error' }));
};
