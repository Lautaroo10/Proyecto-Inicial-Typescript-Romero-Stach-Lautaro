export abstract class Libro implements Prestable {
    protected titulo : string
    protected disponible : boolean
    protected autor : string

    constructor(titulo:string , disponible:boolean , autor:string) {
        this.titulo = titulo
        this.disponible = disponible
        this.autor=autor
    }

    public estaDisponible(): boolean {
        return this.disponible
    }

    prestar():void{
        if(this.disponible){
            this.disponible=false
        }else{
            console.log("Este libro ya esta prestado")
        }
    }

    devolver(): void {
        if (!this.disponible) {
            this.disponible = true
        } else {
            console.log("El libro ya estaba disponible")
        }
    }
}


export class LibroLiteratura extends Libro{
    protected paginas : number

    constructor( titulo : string , disponible : boolean ,autor:string , paginas:number){
        super(titulo,disponible,autor)
        this.paginas=paginas
    }
}


export class LibroHistorico extends Libro{
    protected anio : number

    constructor( titulo : string , disponible : boolean ,autor:string , anio:number){
        super(titulo,disponible,autor)
        this.anio=anio
    }
}


export class Usuario{

    protected nombre : string
    protected librosPrestados: Libro[] = []


    constructor(nombre:string){
        this.nombre=nombre
    }

    getNombre():string{
        return this.nombre
    }

    getLibrosPrestados(): Libro[] {
    return this.librosPrestados
}

    tomarLibro(libro:Libro){
        this.librosPrestados.push(libro)
    }

    devolverLibro(libro: Libro) {
        this.librosPrestados = this.librosPrestados.filter(l => l !== libro)
        libro.devolver()
    }

}


export class Biblioteca {
    libros : Libro[] = []
    usuarios : Usuario[] = []


    
    getLibros(): Libro[] {
        return this.libros 
    }

    getUsuario() : Usuario[]{
        return this.usuarios
    }



    agregarLibro(libro:Libro){
        this.libros.push(libro)
    }

    agregarUsuario(usuario:Usuario){
        this.usuarios.push(usuario)
    }

    prestarLibro(libro: Libro, usuario: Usuario){
    if (!this.libros.includes(libro)) {
        console.log("El libro no pertenece a la biblioteca")
        return
    }

    if (!this.usuarios.includes(usuario)) {
        console.log("El usuario no está registrado")
        return
    }

    if(libro.estaDisponible()){
        libro.prestar()
        usuario.tomarLibro(libro)
        this.libros = this.libros.filter(l => l !== libro)
    } else {
        console.log("Este libro no esta disponible")
    }
}

    devolverLibro(libro: Libro, usuario: Usuario) {
        usuario.devolverLibro(libro)
    }
}

export interface Prestable{
    prestar():void
    devolver():void
}

