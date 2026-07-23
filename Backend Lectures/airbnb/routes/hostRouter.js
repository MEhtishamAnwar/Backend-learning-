const express=require("express");
const hostRouter=express.Router();
 const parseUrlencoded=require("body-parser").urlencoded;
rootDir=require("../utils/pathUtil");


hostRouter.use(parseUrlencoded({extended:false}));
const path=require("path");
const { root } = require("postcss");

const registerHome=[];
hostRouter.post("/add-home",)

exports.hostRouter=hostRouter;
exports.registerHome=registerHome;