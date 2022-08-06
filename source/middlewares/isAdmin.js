const isAdmin = (req,res,next) => {
    if(!req.session.user.admin){
      return res.redirect('/users/login')
    }
    return next()
  }
  module.exports = isAdmin