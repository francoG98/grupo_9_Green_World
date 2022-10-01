

let form = document.forms.userEditForm
let inputs = form.elements


//ACA OCULTAMOS EL EMAIL PARA PODER USAR SU VALUE AL INTERACTUAR CON LA API, PERO SIN QUE EL USUARIO PUEDA MODIFICARLO.


inputs.name.addEventListener('input', function(e){
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
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    }else{
        feed.classList.remove("error")
        feed.style.display="none"
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
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.remove("error")
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
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.remove("error")
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
        feed.classList.add("error")
        feed.innerText= msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    }else{
        feed.classList.remove("error")
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
    if (value.length > 0){
        if(value != confPass){
            conFeed.classList.add("error")
            conFeed.innerText="Las contraseñas deben coincidir"
            conFeed.style.color = "red"
            confCheck.style.display="none"
            confXmark.style.display="inline"
        } else{
            conFeed.classList.remove("error")
            conFeed.innerText="Las contraseñas coinciden"
            conFeed.style.color = "#57CC99"
            confCheck.style.display="inline"
            confXmark.style.display="none"
        }    
        if(!validator.isLength(value,{min:8})){
            msg= "La contraseña debe contener al menos 8 caracteres"
        } else if (!validator.isStrongPassword(value, config)){
            msg = "La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial"
        }
        if(msg){
            feed.classList.add("error")
            feed.innerText= msg
            feed.style.color = "red"
            checkIcon.style.display= "none"
            notCheckIcon.style.display= "inline"
        } else{
            feed.classList.remove("error")
            feed.innerText= "La contraseña es Segura"
            feed.style.color= "#57CC99"
            checkIcon.style.display= "inline"
            notCheckIcon.style.display= "none"
        }
    } else{
        feed.classList.remove("error")
        feed.innerText= "No se cambiara la contraseña"
        feed.style.color= "#57CC99"
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
        conFeed.classList.remove("error")
        conFeed.innerText="No se cambiara la contraseña"
        conFeed.style.color = "#57CC99"
        confCheck.style.display="inline"
        confXmark.style.display="none"
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
        feed.classList.add("error")
        feed.innerText=msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.remove("error")
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
inputs.actualPass.addEventListener("input",function(e){
    let value = e.target.value
    let feed = document.querySelector("p.actualPass")
    let msg = null
    let checkIcon = document.querySelector("label.actualPass i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.actualPass i.fa-circle-xmark")
    feed.style.display="block"
    if(validator.isEmpty(value)){
        msg= "Para actualizar tus datos debes ingresar tu contraseña actual"
    }else if(!validator.islength(value,{min:8})){
        msg="Tu contraseña actual tiene al menos 8 caracteres"
    }
    if(msg){
        feed.classList.add("error")
        feed.innerText=msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.classList.remove("error")
        feed.innerText= null
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



form.addEventListener("submit", async function (e){
    e.preventDefault()
    
    let isCorrect = false

    if(e.target.querySelectorAll("p.error").length < 1){
        isCorrect = true
    }
    if(isCorrect){
        Swal.fire({
            title: 'Felicidades!',
            text: 'Actualizaste los datos de tu cuenta!',
            icon: 'success',
            confirmButtonText: 'Continuar'
          }).then(()=>{
            e.target.submit()
          })
        
    } else{
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema con los campos, fijate cuales tienen error',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }

})