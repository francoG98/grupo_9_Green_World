const {readFileSync,writeFileSync} = require('fs')
const { resolve } = require('path')
const model ={
    
    index: function(){
        let prods = resolve(__dirname,"../data","products.json")
        let data = readFileSync(prods)
        return JSON.parse(data)
    },
    one:function(id){
        let file = resolve(__dirname,'../data','products.json');
        let data = readFileSync(file, {encoding: "utf-8"});
        let products = JSON.parse(data);
        return products.find(product => product.id === id)
      },
    create:function(data){
        let file = resolve(__dirname,'../data','products.json')
        let datosViejos = readFileSync(file, {encoding: "utf-8"})
        let products = JSON.parse(datosViejos)
        let last = products[products.length - 1];
        return Object({
            id: products.length == 0 ? 1 : last.id + 1,
            name: data.name,
            description: data.description,
            image: data.image,
            category: data.category,
            color: data.color,
            price: parseInt(data.price)
        })
    },
    write: function(data) {
        let file = resolve(__dirname,'../data','products.json');
        let info = JSON.stringify(data,null,2);
        return writeFileSync(file, info);
    }       
    
}

module.exports= model