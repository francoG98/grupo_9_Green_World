const path = require ("path")
const express = require ("express")
const app = express()
const port = process.env.PORT || 4422

app.listen(4422, ()=>console.log ("Abriendo l servidor http://localhost:4422"))
const public = path.resolve (__dirname, "../public")
app.use (express.static(public))
app.get("/", (req, res) =>res.sendFile(path.resolve(__dirname,"views/home.html")))
app.get("/chart", (req, res) =>res.sendFile(path.resolve(__dirname,"views/chart.html")))
app.get("/login", (req, res) =>res.sendFile(path.resolve(__dirname,"views/login.html")))
app.get("/product", (req, res) =>res.sendFile(path.resolve(__dirname,"views/productBacklog.html")))
app.get("/register", (req, res) =>res.sendFile(path.resolve(__dirname,"views/register.html")))
app.get("/store", (req, res) =>res.sendFile(path.resolve(__dirname,"views/store.html")))
