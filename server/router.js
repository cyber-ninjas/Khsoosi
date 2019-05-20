var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/rating").post(controller.rating);
khsoosiRouter.route("/login").get(controller.login);
khsoosiRouter.route("/search").get(controller.search);
khsoosiRouter.route("/classes").get(controller.seeSchedule);

module.exports = khsoosiRouter;
