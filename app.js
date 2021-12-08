const express = require('express');
const usuarios = require('./users.js')
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const password="1234"
const Errors = {
    "dont exist":{error:{message:"this id dont exist"}},
    "exist":{error:{message:"ya existe"}},
    "incorrect password":{error:{message:"no puedes entrar, la contraseña no es correcta"}},
    "incorrect data":{error:{message:"error no introduciste los valores correctos"}}
}
const okeyMessages = {
    "Okey":"okey"
}
app.use(express.static('src'))
const list = [new usuarios("example",1,0)]
app.use(express.json())
function ExistID(listaDeusuarios,number){
    for(let index = 0; index<listaDeusuarios.length;index++){
        if(listaDeusuarios[index].id==number){
            return index
        }
    }
    return -1;
}
// este segmento de codigo limita en ciertos rangos un valor como por ejemplo metes el valor de 10, pero el clamp esta en 1 a 5, de resultado de dara 5
// y en el caso de -423 te dara 1
function clamp(num, min, max) {
    if(num < min){
        num=min
    }
    if(num > max){
        num = max
    }
    return num
}

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'src/index.html'));
});


app.get('/crear',(req,res) => {
    // res.sendFile(path.join(__dirname,'src/js/datos.js'))
    res.sendFile(path.join(__dirname,'src/panel.html'));
});

app.get('/gadet',(req,res)=>{
    res.sendFile(path.join(__dirname,"src/gadet.html"))
})
app.get('/client',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/client.html'))
})

app.post('/crear/:password',(req,res)=>{
    // remember change the password
    if(req.params.password==password){
        let newUserequest = req.body
        let tempUserrequest = new usuarios(newUserequest.name,newUserequest.id,newUserequest.calification);
        list.push(tempUserrequest)
        res.json[okeyMessages["Okey"]]
        return
    }
    res.json(Errors["incorrect password"])
    return
})

app.use(function(req, res, next) {
    res.status(404);
    res.sendFile(path.join(__dirname,'src/404.html'))
});

io.on('connection',(socket)=>{
    // console.log("alguien se ha conectado con socket");
    socket.emit('messages',{
        data:"null",
        nothing:list
    })

    //esta funcion lo que hace es devolver el valor de un usuario de la variable list que es la lista de los usuarios

    socket.on('getdata',data => {
        let index = ExistID(list,data.infoId);
        if(index>=0){
            socket.emit('data',list[index]);
        } else {
            socket.emit('data',Errors["dont exist"]);    
        }
    })
    socket.on('setcalification',data => {
        let request={
            id:data.id,
            calification:data.calification
        };
        request.calification = clamp(request.calification,0,10);
        console.log(request)
        let index = ExistID(list,request.id);
        if(index>=0){
            
            list[index].calification = request.calification
        } else {
            socket.emit('data',Errors["dont exist"])
        }
    })
})

server.listen(port,()=>{
    console.log(`listening in port: ${port} .`);
});