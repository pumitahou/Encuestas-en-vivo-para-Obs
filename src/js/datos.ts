var button = document.querySelector(".formulario__button");
var estadoID = document.querySelector('.estado--id');
var estadoNombre = document.querySelector('.estado--nombre');
var estadoEstado = document.querySelector(".estado--estado")
button.addEventListener('click',()=>{
    let formularioName = document.querySelector(".formulario__nombre") as HTMLInputElement;
    let formularioID = document.querySelector(".formulario__id") as HTMLInputElement;
    let secretCode = document.querySelector(".formulario__secret") as HTMLInputElement;
    const formulario = {
        name:formularioName.value,
        id:formularioID.value,
        calification:0
    }
    console.log(estadoID.textContent)
    console.log(typeof(formulario.id))
    estadoNombre.textContent = formulario.name;
    estadoID.textContent = formulario.id;
    console.log(formulario)
    AddUser(document.URL,secretCode.value,formulario);
})

function AddUser(url,code,formulario){
    let urlFull = `${url}/${code}`
    fetch(urlFull,{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formulario)
    }).then(res => {
        estadoEstado.textContent = `${window.location.host}/gadet?${formulario.id}`
        console.log(res);
    })
}