const {body} = require("express-validator")
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')
const {compareSync} = require("bcryptjs")
const {Usuario} = require('../database/models/index')

