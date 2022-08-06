const {readFileSync,writeFileSync} = require('fs')
const { resolve } = require('path')
const{hashSync}= require("bcryptjs")
const model ={
    index: function(){
        let users = resolve(__dirname,"../data","users.json")
        let data = readFileSync(users)
        return JSON.parse(data)
    },
    one:function(id){
        let file = resolve(__dirname,'../data','users.json');
        let data = readFileSync(file, {encoding: "utf-8"});
        let users = JSON.parse(data);
        return users.find(element => element.id === id)
      },
    create: function(data){
       let file = resolve(__dirname,'../data','users.json');
       let info = readFileSync(file,{encoding: "utf-8"});
       let users = JSON.parse(info);
       let last= users[users.length - 1];
       return Object({
           id: users.length == 0 ? 1 : last.id + 1,
           name: data.name,
           lastname: data.lastname,
           email: data.email,
           cultivo :data.cultivo,
           password: hashSync(data.password,10),
           image: data.image,
           admin: data.email.includes('@gworld.com')
       })
    },
    write: function(data) {
      let file = resolve(__dirname,'../data','users.json');
      let info = JSON.stringify(data,null,2);
      return writeFileSync(file, info);
    },
    }
module.exports = model