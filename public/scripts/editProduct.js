let form = document.forms.editProductForm
let inputs = form.elements //para pasarse a array debe ser una coleccion/objeto, algo que sea iterable

inputs.name.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.name")
    let msg = null
    let checkIcon = document.querySelector("label.name i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.name i.fa-circle-xmark")
    feed.style.display="block"
    
    if(validator.isEmpty(value)){
        msg = "El producto debe tener nombre."
    } else if(!validator.isLength(value,{min:5})){
        msg = "El nombre debe contener al menos 5 caracteres"
    }

    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
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

inputs.description.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.description")
    let msg = null
    let checkIcon = document.querySelector("label.description i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.description i.fa-circle-xmark")
    feed.style.display="block"
    
    if(validator.isEmpty(value)){
        msg = "El producto debe tener una descripción."
    } else if(!validator.isLength(value,{min:20})){
        msg = "La descripción debe contener al menos 20 caracteres"
    }

    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.innerText = "El campo Descripción es correcto"
        feed.style.color= "#57CC99"  
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.description.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.description.addEventListener("focus",function(){
        feed.style.display="block"
    })

})

inputs.price.addEventListener("input", function(e){ 
    let value = e.target.value
    let feed = document.querySelector("p.price")
    let msg = null
    let checkIcon = document.querySelector("label.price i.fa-circle-check")
    let notCheckIcon = document.querySelector("label.price i.fa-circle-xmark")
    feed.style.display="block"
    
    if(validator.isEmpty(value)){
        msg = "El producto debe tener precio"
    }

    if(msg){
        feed.innerText = msg 
        feed.style.color="red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    } else{
        feed.innerText = "El campo Precio es correcto"
        feed.style.color= "#57CC99"  
        checkIcon.style.display= "inline"
        notCheckIcon.style.display= "none"
    }
    inputs.price.addEventListener("blur",function(){
        feed.style.display="none"
    })
    inputs.price.addEventListener("focus",function(){
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
        feed.innerText= msg
        feed.style.color = "red"
        checkIcon.style.display= "none"
        notCheckIcon.style.display= "inline"
    }else{
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

