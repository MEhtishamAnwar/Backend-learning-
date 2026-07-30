exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
  
    
  });
};
 exports.postLogin = (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
};