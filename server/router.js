
var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/search").get(controller.search);
khsoosiRouter.route("/rating").post(controller.rating);
//khsoosiRouter.route("/schedule").post(controller.schedule);
khsoosiRouter.route("/login").get(controller.login);
khsoosiRouter.route("/classes").get(controller.seeSchedule);

module.exports = khsoosiRouter;
  