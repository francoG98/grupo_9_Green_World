const {resolve} = require ("path")
const express = require ("express")
const {port, callback} = require("./modules/port")
const public = require ("./modules/public")
const app = express()
const method = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const recordameMiddleware = require("./middlewares/recordameMiddleware")
const cors = require("cors") //PARA PODER REALIZAR APIS A PARTIR DE NUESTRA A

app.listen(port, callback)
app.set ("views", resolve(__dirname, "views"));
app.set ("view engine", "ejs");



app.use(public)

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(method("m"))
app.use(session({
    secret: "nodejs", 
    saveUninitialized: true,
    resave: true
})) // nos da la posibilidad de acceder a req.session
app.use(cookieParser())
app.use(recordameMiddleware)
app.use(require("./middlewares/user"))
app.use(cors())


//LO DE ACA ABAJO SON LAS RUTAS
app.use(require("./routes/home.routes"))
app.use( "/users", require("./routes/user.routes"))
app.use(require("./routes/chart.routes"))
app.use("/products",require("./routes/products.routes"))

//ACA VAMOS A PONER LAS RUTAS DE LAS APIS
app.use(require("./routes/apis/apiProduct.routes"))

app.use(require("./routes/apis/apiUser.routes"))









