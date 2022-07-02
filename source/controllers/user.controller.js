module.exports = {
    login: (req,res) =>{
        return res.render("login",{
            title: "Inicia Sesión",
            styles: [
                "main-login",
                "header",
                "footer"
            ]
        })
    },
    register: (req,res) =>{
        return res.render("register",{
            title: "Registrate",
            styles: [
                "main-register",
                "header",
                "footer"
            ]
        })
    }
}
    