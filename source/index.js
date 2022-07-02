const {join} = require ("path")
const express = require ("express")
const app = express()
const {port, callback} = require("./modules/port")
const public = require ("./modules/public") 
//falta mehotd-override

app.listen(port, callback)
app.set ("views", join(__dirname, "views"));
app.set ("view engine", "ejs");



app.use(public)
//app.use(express.urlencoded({extended:false})); // req.body (POST) y req.query (GET)
//app.use(express.json())
//app.use(method("m")) 


//LO DE ACA ABAJO SON LAS RUTAS
app.use(require("./routes/home.routes"))
app.use( require("./routes/user.routes"))
app.use(require("./routes/chart.routes"))







app.get("/product", (req, res) =>res.sendFile(path.join(__dirname,"views/productBacklog.html")))

app.get("/store", (req, res) =>res.sendFile(path.join(__dirname,"views/store.html")))
