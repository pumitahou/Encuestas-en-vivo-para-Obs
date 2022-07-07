const express = require('express');
const usuarios = require('./users.js')
const path = require('path');
const session = require('express-session');
const sqlSeccion = require('express-mysql-session');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8080;
const password="1234"
const TWO_Hours = 1000 * 60 *60 *2
const { createHash } = require('crypto');
//test
const mysql = require('mysql');
let todos;
const config = {
    user: "root",
    password: "",
    server: "127.0.0.1",
    database: "midatabase",
    port: "3306"

}
const sessionStore =new sqlSeccion(config);

const connector = mysql.createConnection(config);

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

const conectar = ()=> {
    connector.connect(err => {
        if(err) throw err
        console.log("coneccion establecida")
    })
}
const insertar = (dominio,baneado) => {
    let sql = `INSERT INTO banneddomains (domains,isbanned) VALUES("${dominio}","${baneado}");`
    connector.query(sql,(err,res,field)=>{
        if(err) throw err
        console.log("sended");
    })
    console.log("sended");
}
const getDomainsBanneds = () => {
    let sql = `SELECT * FROM banneddomains WHERE isbanned>0;`
    return new Promise(resolve=>{
        connector.query(sql,(err,res,field)=>{
            if(err) throw err
            resolve(res)
        })
    })
}
function getUserWithMail(mail){
    //TODO: recuerda parsear el string que recive la funcion
    let sql = `SELECT * FROM clients WHERE email="${mail}";`
    return new Promise(resolve=>{
        connector.query(sql,(err,res,field)=>{
            if(err) throw err
            resolve(res)
        })
    })
}
function VerifyUser(email,password){
    let correoparseado = email.replace(/['"` // \\;]/g, '').toLowerCase() 
    console.log(correoparseado)
    let sql = `SELECT * FROM clients WHERE email="${correoparseado}";`
    let isValid = false;
    return new Promise(resolve => {
        connector.query(sql,(err,res,field)=>{
            if(err) throw err
            
            if(res==0){
                isValid = false
            } else {
                let passwordhash =hash(password) 
                let respuestasql = res[0];
                if(passwordhash === respuestasql['password']){
                    isValid = true

                    
                }
            }

            resolve(isValid)
        })
        
    }
    )
}


//TODO: aqui comienza el codigo

app.use(session({
    key:'coockie_usuario',
    secret: '123213232131242132132',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge  : new Date(Date.now() + TWO_Hours), //1 Hour
        expires : new Date(Date.now() + TWO_Hours), //1 Hour
    }
}))

app.get('/ban/:dominio/:condition',(req,res)=>{
    insertar("alguntest","1")
    res.send("inserted");
})


app.get('/getbanneds', async (req,res)=>{
    let html = "";
    res.header(200)
    let response = await getDomainsBanneds()
    for(let i=0; i<response.length;i++){
        domain=response[i]
        html+=`<p>${domain['domains']} ${domain["isbanned"]}</p>`
    }
    res.send(html);
})



let vecesqueentra=0
const Errors = {
    "dont exist":{error:{message:"this id dont exist"}},
    "exist":{error:{message:"ya existe"}},
    "incorrect password":{error:{message:"no puedes entrar, la contraseña no es correcta"}},
    "incorrect data":{error:{message:"error no introduciste los valores correctos"}},
    "ErrorLogin":{error:{message:"Error la contraseña o el correo mal puesto"}}
}
const okeyMessages = {
    "Okey":"okey"
}

app.use(express.static('src'))
// app.use(express.static(path.join(__dirname, 'src')))
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


// app.get('/',(req,res) => {
//     req.session.usuario = "juanperez"
//     req.session.rol = "acmin"
//     req.session.visitas = req.session.visitas ? ++req.session.visitas : 1
//     console.log(req.session)
//     res.send(`<p> ${req.session.usuario}</p>`)
//     // res.sendFile(path.join(__dirname,'src/index.html'));
// });

app.get('/cocckie',(req,res) => {
    console.log(req.session.userID)
    req.session.usuario = req.connection.remoteAddress
    req.session.rol = "acmin"
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1
    req.session.userID = 1;
    res.send(`<p> ${req.session.usuario} entro este numero de veces ${req.session.visitas}</p>`)
    // res.sendFile(path.join(__dirname,'src/index.html'));
});


app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/login.html'))
})

app.get('/dashboard',(req,res)=>{
    if(req.session.isAuth){
        res.send(`Welcome ${req.session.name}`)
    } else {
        res.redirect("/login")
    }
})

app.post('/login',async (req,res)=>{
    //TODO:La funcion tiene que estar echa para evitar inyectciones sql
    /*TODO:
    esta opcion lo que hace es crear una session que funciona como validador de la pagina web

    1. email
    2. name
    3. hash
    */
    const respuesta = req.body
    const email = respuesta['name'].replace(/['"` // \\;]/g, '').toLowerCase()
    if(respuesta['name']===undefined || respuesta['password']===undefined){
        res.json(Errors['ErrorLogin']);
        return;
    }
    let validation = await VerifyUser(email,respuesta['password'])
    if(validation || req.session.isAuth === false){
        let objectsession = await getUserWithMail(email);
        let objeto = objectsession[0]
        req.session.isAuth = true
        req.session.email = objeto['email']
        req.session.name = objeto['name']
        req.session.hash = objeto['password']
        res.redirect("/login")   
    }
    res.send(validation)
    
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
app.get('/logout',(req,res)=>{
    req.session.isAuth = false;
    res.redirect("/")
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
            console.log(socket.handshake.address)
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