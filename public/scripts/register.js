//FORMAS PARA SELECCIONAR ELEMENTOS DEL FORMULARIO

//document.getElementById("register-form") -PRIMERA FORMA
//document.querySelector("#register-form") -SEGUNDA FORMA
//document.forms.registerForm - TERCERA FORMA LA QUE LE GUSTA A EDU (despues del forms. va el id del elemento)

let form = document.forms.registerForm
let inputs = form.elements //para pasarse a array debe ser una coleccion/objeto, algo que sea iterable

inputs.name.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.name")
    let msg = null
    if(validator.isEmpty(value)){
        msg = "El nombre no puede quedar vacío."
    } else if(!validator.isLength(value,{min:2})){
        msg = "El nombre debe contener al menos 2 caracteres"
    }
    
    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
    } else{
        feed.innerText = "El campo Nombre es correcto"
        feed.style.color= "#57CC99"
    }
})

inputs.lastname.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.lastname")
    let msg = null
    if(validator.isEmpty(value)){
        msg = "El apellido no puede quedar vacío."
    } else if(!validator.isLength(value,{min:2})){
        msg = "El apellido debe contener al menos 2 caracteres"
    }
    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
    } else{
        feed.innerText = "El campo Apellido es correcto"
        feed.style.color= "#57CC99"
    }
})
inputs.email.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.email")
    let msg = null
    if(validator.isEmpty(value)){
        msg = "El email no puede quedar vacío."
    } else if(!validator.isEmail(value)){
        msg = "El formato de email no es válido"
    }//else if(){} //ACA PONER SI SE ENCUENTRA REGISTRADO
    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
    } else{
        feed.innerText = "El campo Email es correcto"
        feed.style.color= "#57CC99"
    }
})
//VALIDACION PARA IMAGENES

inputs.password.addEventListener("input", function(e){
    let value = e.target.value
    let feed = document.querySelector("p.password")
    let conFeed= document.querySelector("p.passConfirm")
    let confPass = inputs.passConfirm.value
    let msg = null
    let config = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false}
    if(value != confPass){
        conFeed.innerText="Las contraseñas deben coincidir"
        conFeed.style.color = "red"
    } else{
        conFeed.innerText="Las contraseñas coinciden"
        conFeed.style.color = "#57CC99"
    }    
    if(validator.isEmpty(value)){
        msg = "La contraseña no puede quedar vacía"
    } else if(!validator.isLength(value,{min:8})){
        msg= "La contraseña debe contener al menos 8 caracteres"
    } else if (!validator.isStrongPassword(value, config)){
        msg = "La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial"
    }
    if(msg){
        feed.innerText= msg
        feed.style.color = "red"
    } else{
        feed.innerText= "La contraseña es Segura"
        feed.style.color= "#57CC99"
    }
})

inputs.passConfirm.addEventListener("input", function(e){
    let value = e.target.value
    let feed = document.querySelector("p.passConfirm")
    let msg = null
    let pass = inputs.password.value
    if(value != pass){
        msg = "Las contraseñas deben coincidir"
    }
    if(msg){
        feed.innerText=msg
        feed.style.color = "red"
    } else{
        feed.innerText="Las contraseñas coinciden"
        feed.style.color = "#57CC99"
    }
})


