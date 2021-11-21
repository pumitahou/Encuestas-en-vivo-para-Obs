const button = document.querySelector(".formulario__button");
const estadoID = document.querySelector('.estado--id');
const estadoNombre = document.querySelector('.estado--nombre');
const estadoEstado = document.querySelector(".estado--estado");
button.addEventListener('click', () => {
    let formularioName = document.querySelector(".formulario__nombre");
    let formularioID = document.querySelector(".formulario__id");
    let secretCode = document.querySelector(".formulario__secret");
    const formulario = {
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
    let urlFull = `${url}/${code}`;
    fetch(urlFull, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
    }).then(res => {
        estadoEstado.textContent = `${window.location.host}/gadet?${formulario.id}`;
        console.log(res);
    });
}
