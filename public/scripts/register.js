//FORMAS PARA SELECCIONAR ELEMENTOS DEL FORMULARIO

//document.getElementById("register-form") -PRIMERA FORMA
//document.querySelector("#register-form") -SEGUNDA FORMA
//document.forms.registerForm - TERCERA FORMA LA QUE LE GUSTA A EDU (despues del forms. va el id del elemento)

let form = document.forms.registerForm
let inputs = form.elements //para pasarse a array debe ser una coleccion/objeto, algo que sea iterable

let userExists = async function (email) {
    let exists = await axios.post(`/users/api/userExists/${email}`)
    
    return exists
}


inputs.name.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.name")
    let msg = null
    let checkIcon = document.querySelector("label.name i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.name i.fa-circle-xmark")
    feed.style.display="block"
    
    if(validator.isEmpty(value)){
        msg = "El nombre no puede quedar vacío."
    } else if(!validator.isLength(value,{min:2})){
        msg = "El nombre debe contener al menos 2 caracteres"
    }

    if(msg){
        feed.classList.remove("valid")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText = "El campo Nombre es correcto"
        feed.style.color= "#57CC99"  
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.name.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.name.addEventListener("focus",function(){
        feed.style.display="block"
    })

})
        
    


inputs.lastname.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.lastname")
    let msg = null
    let checkIcon = document.querySelector("label.lastname i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.lastname i.fa-circle-xmark")
    feed.style.display="block"

    if(validator.isEmpty(value)){
        msg = "El apellido no puede quedar vacío."
    } else if(!validator.isLength(value,{min:2})){
        msg = "El apellido debe contener al menos 2 caracteres"
    }
    if(msg){
        feed.classList.remove("valid")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText = "El campo Apellido es correcto"
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.lastname.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.lastname.addEventListener("focus",function(){
        feed.style.display="block"
    })
})
inputs.email.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.email")
    let msg = null
    let checkIcon = document.querySelector("label.email i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.email i.fa-circle-xmark")

    if(validator.isEmpty(value)){
        msg = "El email no puede quedar vacío."
    } else if(!validator.isEmail(value)){
        msg = "El formato de email no es válido"
    }//else if(){} //ACA PONER SI SE ENCUENTRA REGISTRADO
    if(msg){
        feed.classList.remove("valid")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText = "El campo Email es correcto"
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.email.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.email.addEventListener("focus",function(){
        feed.style.display="block"
    })
})






//VALIDACION PARA IMAGENES
inputs.avatar.addEventListener("change", function(e){
    let file = e.target.files
    console.log(file)
    let type = file[0].type 
    let validTypes=["image/jpeg","image/png","image/svg+xml"]
    let feed = document.querySelector("p.avatar")
    let msg = null
    let checkIcon=document.querySelector("label.avatar i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.avatar i.fa-circle-xmark")
   

    if(!validTypes.includes(type)){
        msg = "La imagen no tiene una extensión válida"
    } else if(!file){
        msg = null
    }
    if(msg){
        feed.classList.remove("valid")
        feed.innerText= msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    }else{
        feed.classList.add("valid")
        feed.innerText= null
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.avatar.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.avatar.addEventListener("focus",function(){
        feed.style.display="block"
    })
})





inputs.password.addEventListener("input", function(e){
    let value = e.target.value
    let feed = document.querySelector("p.password")
    let conFeed= document.querySelector("p.passConfirm")
    let confPass = inputs.passConfirm.value
    let msg = null
    
    let checkIcon = document.querySelector("label.password i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.password i.fa-circle-xmark")

    let confCheck=document.querySelector("label.passConfirm i.fa-circle-check")
    let confXmark= document.querySelector("label.passConfirm i.fa-circle-xmark")

    let config = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false}

    if(value != confPass){
        conFeed.classList.remove("valid")
        conFeed.innerText="Las contraseñas deben coincidir"
        conFeed.style.color = "red"
        confCheck.style.display="none"
        confXmark.style.display="inline"
    } else{
        conFeed.classList.add("valid")
        conFeed.innerText="Las contraseñas coinciden"
        conFeed.style.color = "#57CC99"
        confCheck.style.display="inline"
        confXmark.style.display="none"
    }    
    if(validator.isEmpty(value)){
        msg = "La contraseña no puede quedar vacía"
    } else if(!validator.isLength(value,{min:8})){
        msg= "La contraseña debe contener al menos 8 caracteres"
    } else if (!validator.isStrongPassword(value, config)){
        msg = "La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial"
    }
    if(msg){
        feed.classList.remove("valid")
        feed.innerText= msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText= "La contraseña es Segura"
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.password.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.password.addEventListener("focus",function(){
        feed.style.display="block"
    })
})

inputs.passConfirm.addEventListener("input", function(e){
    let value = e.target.value
    let feed = document.querySelector("p.passConfirm")
    let msg = null
    let pass = inputs.password.value
    let checkIcon = document.querySelector("label.passConfirm i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.passConfirm i.fa-circle-xmark")
    feed.style.display="block"
    if(value != pass){
        msg = "Las contraseñas deben coincidir"
    }
    if(msg){
        feed.classList.remove("valid")
        feed.innerText=msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText="Las contraseñas coinciden"
        feed.style.color = "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.passConfirm.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.passConfirm.addEventListener("focus",function(){
        feed.style.display="block"
    })
})



//En esta funcion de abajo vamos a corroborar que el email no se encuentre ya registrado en la base de datos




let emailFound= async function(exists){
    let feed = document.querySelector("p.email")
    let msg = null
    let checkIcon = document.querySelector("label.email i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.email i.fa-circle-xmark")
    if(exists.data.exists){
        msg = "Este correo ya se encuentra registrado"
    }
    if(msg){
        feed.classList.remove("valid")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.add("valid")
        feed.innerText = "El campo Email es correcto"
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"

    }

}
form.addEventListener("submit", async function(e){
    e.preventDefault()

    let email = document.querySelector("input#email").value
    if(email){
        let exists = await userExists(email)
        emailFound(exists)
    }else{
        document.querySelector("p.email").classList.remove("valid")
    }
    
    let isCorrect = false

    if(e.target.querySelectorAll("p.valid").length === 6){
        isCorrect= true
    }

    if(isCorrect){
        Swal.fire({
            title: 'Felicidades!',
            text: 'Creaste tu cuenta en Green World!',
            icon: 'success',
            confirmButtonText: 'Continuar'
          }).then(()=>{
            e.target.submit()
          })
        
    } else{
        Swal.fire({
            title: 'Error!',
            text: 'Tenes campos sin completar o completados erroneamente',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
})


