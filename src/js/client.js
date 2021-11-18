const button = document.querySelector(".boton__mandar")
let id_arg = window.location.search.substring(1);
let socket = io.connect(window.location.hostname + ":8080",{'forceNew':true})
console.log("okey")


button.addEventListener('click', function () {
    let calification_dat = document.querySelector(".calificacion").value;
    socket.emit("setcalification",{
        id:id_arg,
        calification:calification_dat
    })
})

