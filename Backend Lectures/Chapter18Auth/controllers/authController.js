const User=require("../models/user");
const bcrypt=require("bcryptjs");
const { check, validationResult } = require("express-validator");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
     isLoggedIn:false,
     errors:[],
     oldInput:{email:""},
     user:{},
    
  });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
     isLoggedIn:false,
     errors:[],
     oldInput:{firstName:"", lastName:"",email:"", password:"", userType:""},
     user:{},
  });
};

exports.postSignup = [
  check("firstName")
  .trim()
  .isLength({min:2})
   .withMessage("First name should at least 2 alphabets")
   .matches(/^[A-Za-z\s]+$/)
   .withMessage("First name should contain only alphabets"),
     
   check("lastName")
   .matches(/^[A-Za-z\s]*$/)
   .withMessage("Last name should contain only alphabets"),

   check("email")
   .isEmail()
   .withMessage("Please enter the valid email")
   .normalizeEmail(),
   check("password")
   .isLength({min:8})
   .withMessage("Password should be at least 8 character long")
   .matches(/[A-Z]/)
   .withMessage("Password should contain 1 Uppercase letter")
     .matches(/[a-z]/)
   .withMessage("Password should contain 1 lowercase letter")
     .matches(/[0-9]/)
 .matches(/[!@#$%^&*,.?":{}|<>]/)
   .withMessage("Passowrd shold contain at least one special character")
   .trim(),
   check("confirmPassword")
  .custom((value,{req})=>{
    if(value!== req.body.password){
      throw new Error("password do not match");
    }
    return true;
   }),
   check("userType")
   .notEmpty()
   .withMessage("Please select a user type ")
   .isIn(['guest','host'])
   .withMessage("Invaild user type "),

   check("terms")
   .notEmpty()
   .withMessage("Please accept the terms and conditions")

   .custom((value,{req})=>{
       if(value !== "on"){
    throw new Error("Please accept the terms and conditions")

   } 
   return true;
    
         })
   
  
  ,(req, res, next) => {
      const {firstName ,lastName,email,password,userType}=req.body;
  const errors = validationResult(req);
   if(!errors.isEmpty()){
         return res.status(422).render("auth/signup",{
          pageTitle:"Signup",
          currentPage:"signup",
          isLoggedIn:false,
          errors:errors.array().map(err => err.msg),
          oldInput:{firstName,lastName,email,password,userType},
     user:{},
         })
     
   }

   bcrypt.hash(password,12).then(hashedPassword=>{
    const user=new User({firstName,lastName,email,password:hashedPassword,userType})
    return user.save();
   }).then(()=>{
    res.redirect("/login");
   }).catch(err=>{
    console.log(err)
       return res.status(422).render("auth/signup",{
          pageTitle:"Signup",
          currentPage:"signup",
          isLoggedIn:false,
          errors:[err.message],
          oldInput:{firstName,lastName,email,password,userType}
          ,
     user:{},
         })
   })
  

}];


 exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user= await User.findOne({email});
  if(!user){
    return res.status(422).render("auth/login",{
      pageTitle:"Login",
      currentPage:"login",
      isLoggedIn:false,
      errors:["User does not exist"],
      oldInput:{email},
     user:{},
      })
  }
  const isMatch=await bcrypt.compare(password,user.password);
    
  if(!isMatch){
    return res.status(422).render("auth/login",{
      pageTitle:"Login",
      currentPage:"login",
      isLoggedIn:false,
      errors:["Invalid password"],
      oldInput:{email},
     user:{},
      })
  }

      
  console.log(req.body);
  req.session.isLoggedIn = true;
 req.session.user=user;
  res.redirect("/");
};
 
exports.postLogout=(req,res,next)=>{
  // res.cookie("isLoggedIn",false)
  req.session.destroy(()=>{
    console.log("session destroyed")
    res.redirect("/login")
  })


}