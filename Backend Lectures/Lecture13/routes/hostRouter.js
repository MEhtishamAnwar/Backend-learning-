const express = require("express");
const hostRouter = express.Router();
const parseUrlencoded = require("body-parser").urlencoded;
const homeController = require("../controllers/homes");
hostRouter.use(parseUrlencoded({ extended: false }));
hostRouter.post("/add-home", homeController.getAddHome);
exports.hostRouter = hostRouter;
