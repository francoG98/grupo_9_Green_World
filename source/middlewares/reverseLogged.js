const reverseLogged = (req,res,next) => {
    if(req.session.user){
      return res.redirect('/')
    }
    return next()
  }
  module.exports = reverseLogged // Creamos este middleware para prohibnir el acceso a las paginas de login y registro a los usuarios que ya estan logueados.