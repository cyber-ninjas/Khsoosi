
var khsoosiRouter = require("express").Router();
var controller = require("./controller");

khsoosiRouter.route("/signup").post(controller.signup);
khsoosiRouter.route("/search").get(controller.search);

module.exports = khsoosiRouter;
  