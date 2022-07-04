var formulario = document.querySelector(".formulario");
var formulario_centro = document.querySelector(".formulario--centro");
var datos = {
    name: '',
    password: ''
};
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    var name_input = document.querySelector("#name");
    var password_input = document.querySelector("#password");
    if (name_input.value === '' || password_input.value === '') {
        mensajenotificar("Completa los campos","error--alert")
        return;
    }
    datos['name'] = name_input.value;
    datos['password'] = password_input.value;
    sendform(datos)
});
function sendform(data){
    fetch(document.URL,{
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }).then(res =>{
        mensajenotificar("enviado","espera")
    
    })
}
function mensajenotificar(mensaje, estado){
    let alerta = document.createElement('P');
    alerta.classList.add(estado)
    alerta.innerText = mensaje
    formulario_centro.appendChild(alerta);
    setTimeout(() => {
        alerta.remove()
    }, 2000);
}
