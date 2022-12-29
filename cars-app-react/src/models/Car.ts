export default class Car{
    public id : string;
    public marca : string;
    public modelo : number;
    public color : string;
    public matricula : string;
    public kilometros_Recorridos : number;

    // constructor(id : string, marca: string, kilometros_Recorridos : number) {
    //     this.id = id;
    //     this.marca = marca;
    //     this.kilometros_Recorridos = kilometros_Recorridos;
    // }

    constructor(id : string, marca: string, modelo: number, color : string, matricula : string, kilometros_Recorridos : number) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.matricula = matricula;
        this.kilometros_Recorridos = kilometros_Recorridos;
    }
}