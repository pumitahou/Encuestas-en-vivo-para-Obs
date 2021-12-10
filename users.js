module.exports = class Usuarios {
    constructor(name = "",id= "",calification = 0){
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