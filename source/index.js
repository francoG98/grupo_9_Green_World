const {resolve} = require ("path")
const express = require ("express")
const {port, callback} = require("./modules/port")
const public = require ("./modules/public")
const uploads = require("./modules/uploads")
const app = express()
//falta mehotd-override

app.listen(port, callback)
app.set ("views", resolve(__dirname, "views"));
app.set ("view engine", "ejs");



app.use(public)
app.use (uploads);
app.use(express.urlencoded({extended:false}));
app.use(express.json())
//app.use(method('m'))



//LO DE ACA ABAJO SON LAS RUTAS
app.use(require("./routes/home.routes"))
app.use( require("./routes/user.routes"))
app.use(require("./routes/chart.routes"))
app.use("/products",require("./routes/products.routes"))







app.get("/product", (req, res) =>res.sendFile(path.join(__dirname,"views/productBacklog.html")))


