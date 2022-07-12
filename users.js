module.exports = class Usuarios {
<<<<<<< HEAD
    constructor(name = "null user",id= 0,calification = 0){
=======
    constructor(name = "",id= "",calification = 0){
>>>>>>> b6d91db75e6401a18172b6f4792186752af942dd
        this.name = name;
        this.id = id;
        this.calification = calification;
    }
    agregarJson(json){
        this.name=json.name;
        this.id=json.id;
        this.calification = json.calification;
    }
}