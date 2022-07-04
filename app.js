const conectar = require('./mysql_connector.js')
const express = require('express');
const usuarios = require('./users.js')
const path = require('path');
const insertar = require('./mysql_connector.js');
const getDomainsBanneds = require('./mysql_connector.js');
const session = require('express-session');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const password="1234"
const TWO_Hours = 1000 * 60 *60 *2
//test

conectar()

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secreta',
    cookie:{
        maxAGE:TWO_Hours,
        sameSite:true,
        secure: 'development'
    }
}))

app.get('/ban/:dominio/:condition',(req,res)=>{
    insertar("randomdadfdfadfdf.exe","0").se
    res.send("inserted");
})
app.get('/getbanneds',(req,res)=>{
    let html = "";
    let response = getDomainsBanneds()
    for(let i=0; i<response.length;i++){
        domain=response[i]
        html+=`<p>${domain["domains"]}</p>`
    }
    res.send(html);
})



let vecesqueentra=0
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
// app.use(express.static(path.join(__dirname, 'src')))
console.log()
const list = {}
app.use(express.json())

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

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/login.html'))
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    res.send("ok")
})

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
        if(list[newUserequest.id]==undefined){

            list[newUserequest.id]=new usuarios(newUserequest.name,newUserequest.id,newUserequest.calification);
            res.json[okeyMessages["Okey"]]
            return
        }

        res.json(Errors["exist"])
        return
    }
    res.json(Errors["incorrect password"])
    console.log(list)
    return
})

//error 404 , retorna un render
app.use(function(req, res, next) {
    res.status(404);
    res.send(`<h1>gente que entro al 404 y se equivoco: ${vecesqueentra} </h1>`)
    vecesqueentra+=1
    res.sendFile(path.join(__dirname,'./src/404.html'))
});


io.on('connection',(socket)=>{
    // console.log("alguien se ha conectado con socket");
    socket.emit('messages',{
        data:"null",
        nothing:list
    })

    //esta funcion lo que hace es devolver el valor de un usuario de la variable list que es la lista de los usuarios

    socket.on('getdata',data => {
        if(data.infoId!=undefined){
            socket.emit('data',list[data.infoId]);
            return
        }
        socket.emit('data',Errors["dont exist"]);    
    })
    socket.on('setcalification',data => {
        let request={
            id:data.id,
            calification:data.calification
        };
        request.calification = clamp(request.calification,0,10);
        console.log(request)

        if(list[request.id]!=undefined){
            list[request.id].calification = request.calification
            return
        }
        socket.emit('data',Errors["dont exist"])
        return
    })
})

server.listen(port,()=>{
    console.log(`listening in port: ${port} .`);
});