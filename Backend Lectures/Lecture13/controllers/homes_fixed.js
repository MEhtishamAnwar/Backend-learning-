const path = require("path");
const rootDir = require("../utils/pathUtil");
const HomeModel = require("../models/home");

exports.getAddHome = (req, res, next) => {
    console.log(req.url, req.method);

    const home = new HomeModel(
        req.body.houseName,
        req.body.housePrice,
        req.body.houseAddress
    );
    home.save();

    const homes = HomeModel.fetchAll();
    res.render("homeAdd", { registerHome: homes });
};

exports.homeReg = (req, res, next) => {
    const homes = HomeModel.fetchAll();
    res.render("home", { registerHome: homes });
};

exports.errorPage = (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
};