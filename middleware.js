module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in tp create new listings");
        return res.redirect("/login");
      }
      next();
}