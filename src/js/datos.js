var button = document.querySelector(".formulario__button");
var estadoID = document.querySelector('.estado--id');
var estadoNombre = document.querySelector('.estado--nombre');
var estadoEstado = document.querySelector(".estado--estado");
button.addEventListener('click', function () {
    var formularioName = document.querySelector(".formulario__nombre");
    var formularioID = document.querySelector(".formulario__id");
    var secretCode = document.querySelector(".formulario__secret");
    var formulario = {
        name: formularioName.value,
        id: formularioID.value,
        calification: 0
    };
    console.log(estadoID.textContent);
    console.log(typeof (formulario.id));
    estadoNombre.textContent = formulario.name;
    estadoID.textContent = formulario.id;
    console.log(formulario);
    AddUser(document.URL, secretCode.value, formulario);
});
function AddUser(url, code, formulario) {
    var urlFull = url + "/" + code;
    fetch(urlFull, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
    }).then(function (res) {
        estadoEstado.textContent = window.location.host + "/gadet?" + formulario.id;
        console.log(res);
    });
}
