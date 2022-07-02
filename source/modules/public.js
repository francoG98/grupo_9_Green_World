const {static} = require("express");
const {join} = require("path");
const public = join(__dirname, "../../public")

module.exports = static(public);
