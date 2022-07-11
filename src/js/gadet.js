var socket = io.connect(window.location.hostname + ":8080", { 'forceNew': true });
//esta variable busca en el exploraror la ID
var id = window.location.search.substring(1);
var data2;
socket.on('messages', function (data) {
    data2 = data;
});
socket.on('data', function (data) {
    console.log(data);
    var number = document.querySelector(".gadet--number");
    var name2 = document.querySelector(".name--section");
    number.textContent = data.calification;
    name2.textContent = data.name;
});
function getdata() {
    var info = {
        infoId: id
    };
    console.log(info);
    socket.emit("getdata", info);
    return false;
}
setInterval(function () {
    getdata();
}, 1000);
