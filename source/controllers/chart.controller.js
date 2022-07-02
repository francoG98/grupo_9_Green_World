module.exports = {
    chart: (req,res) =>{
        return res.render("chart",{
            title: "Carrito de Compras",
            styles: [
                "chart",
                "header",
                "footer"
            ]
        })
    }
}
    