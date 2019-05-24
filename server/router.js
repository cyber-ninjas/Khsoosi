var khsoosiRouter = require('express').Router();
var controller = require('./controller');

khsoosiRouter.route('/signup').post(controller.signup);
khsoosiRouter.route('/search').post(controller.search);
khsoosiRouter.route('/rating').post(controller.rating);
khsoosiRouter.route('/updateTeacherProfile').put(controller.updateTeacherProfile);
khsoosiRouter.route('/login').post(controller.login);
khsoosiRouter.route('/classes').get(controller.seeSchedule);
khsoosiRouter.route('/pickTeacher').post(controller.pick);
khsoosiRouter.route('/conform').get(controller.conform);
khsoosiRouter.route('/conformAnswer').get(controller.conformAnswer);

khsoosiRouter.route('/teacherProfile/:number').get(controller.showTeacherInfo);
module.exports = khsoosiRouter;
