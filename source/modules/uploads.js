const { static } = require ('express');
const { resolve } = require ('path');
const public = resolve (__dirname, "../../public/assets");
module.exports = static(public);