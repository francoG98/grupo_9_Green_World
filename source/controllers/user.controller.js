module.exports = {
    login: (req,res) =>{
        return res.render("users/login",{
            title: "Inicia Sesión",
            styles: [
                "main-login",
                "header",
                "footer"
            ]
        })
    },
    register: (req,res) =>{
        return res.render("users/register",{
            title: "Registrate",
            styles: [
                "main-forms",
                "header",
                "footer"
            ]
        })
    }
}
    