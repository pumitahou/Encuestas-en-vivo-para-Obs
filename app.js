const express = require('express');
const usuarios = require('./users.js')
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;

app.use(express.static('src'))

const list = [new usuarios("example",1,0)]


app.use(express.json())
// recursos
// app.get('/archivo/js/:jsfile',(req,res)=>{
//     res.sendFile(path.join(__dirname,`src/js/${req.params.jsfile}`))
// })
// app.get('/archivo/css/:css',(req,res)=>{
//     res.sendFile(path.join(__dirname,`src/css/${req.params.css}`))
// })


// esta funcion verifica si existe cierta ID y en caso de ser cierto retorna su indice en el Array, pero de lo contrario retorna -1
function ExistID(listaDeusuarios,number){
    for(let index = 0; index<listaDeusuarios.length;index++){
        if(listaDeusuarios[index].id==number){
            return index
        }
    }
    return -1;
}
// console.log(ExistID(list,1))

function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
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
    if(req.params.password=="1234"){
        let validacion = new usuarios();
        let newUserequest = req.body
        if(validacion.validar(newUserequest)){
            // res.json({
            //     accepted:{
            //         message:"creando usuario"
            //     }
            // })

            //creando el usuario

            // comprobando si existe para agregarlo o no

            // pd: tiene fallos y los agrega de todos modos

            let tempUserrequest = new usuarios(newUserequest.name,newUserequest.id,newUserequest.calification);
            let existUser = false;
            for (let i = 0; i<list.length;i++){
                if(tempUserrequest.existe(list[i])){
                    console.log("si existe")
                    existUser = true;
                }
            }
            if(existUser){
                console.log("ya existe")
                res.json({
                    error:{
                        message:"ya existe"
                    }
                })
            } else {
                list.push(tempUserrequest)
                res.json({
                    accepted:{
                        message:"creando usuario"
                    }
                })
            }
        } else {
            res.json({
                error:{
                     message:"error no introduciste los valores correctos"
                 }
             })
        }



        
    } else {
        res.json({
           error:{
                message:"no puedes entrar, la contraseña no es correcta"
            }
        })
    }
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
        let dataId = data.infoId
        let index= ExistID(list,dataId);
        if(ExistID(list,dataId)>=0){
            socket.emit('data',list[index]);
        } else {
            socket.emit('data',{
                error:{
                    message:"this id doesn't exist"
                }
            });    
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
            socket.emit('data',{
                error:{
                    message:"this id doesn't exist"
                }
            })
        }
    })
})



server.listen(port,()=>{
    console.log(`listening in port: ${port} .`);
});