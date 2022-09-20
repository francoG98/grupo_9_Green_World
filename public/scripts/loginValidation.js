let form = document.forms.loginForm
let inputs = form.elements

let userExists = async function (email) {
    let exists = await axios.post(`/users/api/userExists/${email}`)
    
    return exists
}

inputs.email.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.email")
    let msg = null
    if(validator.isEmpty(value)){
        msg = "El email no puede quedar vacío"
    } else if(!validator.isEmail(value)){
        msg = "Debes introducir un email válido"
    }//else if(){} //ACA PONER SI SE ENCUENTRA REGISTRADO
    if(msg){
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        
    } else{
        feed.classList.remove("error")
        feed.innerText = null
    }
   
})

inputs.password.addEventListener("input",function(e){
    let value = e.target.value
    let feed = document.querySelector("p.password")
    let msg = null

    if(validator.isEmpty(value)){
        msg ="La contraseña no puede quedar vacía"
    }
    if(msg){
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        
    } else{
        feed.classList.remove("error")
        feed.innerText = null
    }
})

let emailNotFound = async function(exists){
    let feed = document.querySelector("p.email")
    let email = document.querySelector("input#email").value
    let msg = null
    if(!exists.data.exists){
        msg = `El correo ${email} no se encuentra registrado en Green World`
    }
    if(msg){
        feed.classList.add("error")
        feed.innerText = msg 
        feed.style.color="red"
        
    } else{
        feed.classList.remove("error")
        feed.innerText = null
    }
}

form.addEventListener("submit", async function(e){
    e.preventDefault()
    let email = document.querySelector("input#email").value
    let exists = await userExists(email)
    emailNotFound(exists)
    let isCorrect = false

    if(e.target.querySelectorAll("p.error").length < 1){
        isCorrect = true
    }
    if(isCorrect){
        Swal.fire({
            title: 'Felicidades!',
            text: 'Si pusiste bien la contraseña vas a iniciar sesion!',
            icon: 'success',
            confirmButtonText: 'Continuar'
          }).then(()=>{
            e.target.submit()
          })
        
    } else{
        Swal.fire({
            title: 'Error!',
            text: 'Email o Contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }

})

