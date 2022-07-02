const {readFileSync,writeFileSync} = require('fs')
const { resolve } = require('path')

module.exports={
    categorias: function(){
        let cats = resolve(__dirname,"../data","categories.json")
        let data = readFileSync(cats);
        return JSON.parse(data)
    }
    
}