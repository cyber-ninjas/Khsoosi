
var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/search").get(controller.search);
khsoosiRouter.route("/login").get(controller.login);
khsoosiRouter.route("/classes").get(controller.seeSchedule);
khsoosiRouter.route("/teacherProfile").get(controller.showteacherProfilePicture);
module.exports = khsoosiRouter;
  