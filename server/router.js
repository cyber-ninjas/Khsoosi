
var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/search").get(controller.search);
khsoosiRouter.route("/login").get(controller.login);
khsoosiRouter.route("/classes").get(controller.seeSchedule);
khsoosiRouter.route("/profileUpdata").get(controller.pick);
khsoosiRouter.route("/conform").get(controller.conform);
khsoosiRouter.route("/conformAnswer").get(controller.conformAnswer);

module.exports = khsoosiRouter;
  