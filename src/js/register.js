let formulario = document.querySelector(".formulario")
let email_form = document.querySelector("#email");
let password_form = document.querySelector("#password");
let passwordvalidation_form = document.querySelector("#passwordvalidation");
let name_form = document.querySelector("#name");
formulario.addEventListener('submit',(e)=>{
    e.preventDefault()

    const datos = {
        email: email_form.value,
        password: password_form.value,
        passwordvalidation: passwordvalidation_form.value,
        name: name_form.value
    }
    sendform(datos)
})

function sendform(data) {
    fetch(document.URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(function (res) {
        console.log(res);
    })["catch"](function (err) {
    });
}