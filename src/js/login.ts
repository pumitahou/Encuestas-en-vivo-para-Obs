var formulario = document.querySelector(".formulario")!;
var formulario_centro = document.querySelector(".formulario--centro")!;

var datos = {
    name: '',
    password: ''
};

formulario!.addEventListener('submit', function (e) {
    e.preventDefault();
    let name_input: HTMLInputElement = document.querySelector("#name")!;
    let password_input: HTMLInputElement = document.querySelector("#password")!;
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
        res.text().then(x=>{
            
            let respuesa = JSON.parse(x)
            if(respuesa["isValid"]){
                window.location.href = '/dashboard';
            } else{
                mensajenotificar("contraseña incorrecta","error")
            }
            
        }).catch(err=>{
            mensajenotificar("Algo ha salido mal","error")
        })
        
    
    }).catch(err =>{
        console.log(err)
        mensajenotificar("Algo ha salido mal","error")
    })
}
function mensajenotificar(mensaje, estado){
    let alerta = document.createElement('P');
    alerta.classList.add(estado)
    alerta.innerText = mensaje
    formulario_centro!.appendChild(alerta);
    setTimeout(() => {
        alerta.remove()
    }, 2000);
}