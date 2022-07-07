const mysql = require('mysql')

const config = {
    user: "root",
    password: "",
    server: "127.0.0.1",
    database: "midatabase",
    port: "3306"

}
let todos;
const connector = mysql.createConnection(config);
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
    let sql = `SELECT domains FROM banneddomains WHERE isbanned>0;`
    connector.query(sql,(err,res,field)=>{
        if(err) throw err
        todos=res
        
    })
    console.log("GetBanneds")
    return todos
}
module.exports = conectar
module.exports = insertar;
module.exports = getDomainsBanneds;