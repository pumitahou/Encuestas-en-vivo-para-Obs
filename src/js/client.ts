let buttons = document.querySelectorAll(".botonera--botton")
let id_arg = window.location.search.substring(1);
let socket = io.connect('http://localhost:8080',{'forceNew':true})
for (let index = 1; index <= buttons.length; index++) {
    buttons[index].addEventListener('click',function(){
        let calification_dat = 9-index;
        socket.emit("setcalification",{
            id:id_arg,
            calification:calification_dat
        })
    },false)
}
console.log("okey")