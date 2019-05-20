
var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/search").get(controller.search);
khsoosiRouter.route("/rating").post(controller.rating);
//khsoosiRouter.route("/schedule").post(controller.schedule);

module.exports = khsoosiRouter;
  