const middleware = (req, res, next)=>{
    let user = null;

    if(req.session && req.session.user){
        user = req.session.user
    }

    res.locals.user = user


    return next()
}// si lo vamos a usar a nivel aplicacion necesitamos colocarle next para que siga.

module.exports = middleware