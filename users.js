
module.exports = class Usuarios {
    constructor(name = "",id= 0,calification = 0){
        this.name = name;
        this.id = id;
        this.calification = calification;
    }
    validar(user){
        if(user.name !== undefined && user.id !==undefined && user.calification !== undefined) {
            return true;
        } else {
            return false;
        }
    }
    agregarJson(json){
        this.name=json.name;
        this.id=json.id;
        this.calification = json.calification;
    }
    existe(user){
        console.log(this)
        console.log(user)
        if(user.name == this.name && user.id == this.id && user.calification !== this.calification) {
            return true;
        } else {
            return false;
        }
        
    }
}