const {resolve} = require ("path")
const express = require ("express")
const {port, callback} = require("./modules/port")
const public = require ("./modules/public")
const app = express()
const method = require("method-override")


app.listen(port, callback)
app.set ("views", resolve(__dirname, "views"));
app.set ("view engine", "ejs");



app.use(public)

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(method("m"))



//LO DE ACA ABAJO SON LAS RUTAS
app.use(require("./routes/home.routes"))
app.use( "/users", require("./routes/user.routes"))
app.use(require("./routes/chart.routes"))
app.use("/products",require("./routes/products.routes"))










