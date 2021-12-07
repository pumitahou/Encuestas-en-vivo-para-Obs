let socket = io.connect(window.location.hostname + ":8080",{'forceNew':true})
//esta variable busca en el exploraror la ID
let id = window.location.search.substring(1);
let data2;

socket.on('messages',data => {
    data2=data

    
})

socket.on('data',data => {
    console.log(data)
    let number = document.querySelector(".gadet--number")
    let name2 = document.querySelector(".name--section")
    number.textContent = data.calification
    name2.textContent = data.name
})

function getdata(){
    let info ={
        infoId:id
    }
    console.log(info)
    
    socket.emit("getdata",info)
    return false;
}

setInterval(() => {
    getdata();
}, 1000);