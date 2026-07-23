const express = require("express");
const homeController = require("../controllers/homes");
const router = express.Router();
router.get("/", homeController.homeReg);
module.exports = router;