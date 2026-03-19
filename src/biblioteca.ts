abstract class Libro implements Prestable {
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


class LibroLiteratura extends Libro{
    protected paginas : number

    constructor( titulo : string , disponible : boolean ,autor:string , paginas:number){
        super(titulo,disponible,autor)
        this.paginas=paginas
    }
}


class LibroHistorico extends Libro{
    protected anio : number

    constructor( titulo : string , disponible : boolean ,autor:string , anio:number){
        super(titulo,disponible,autor)
        this.anio=anio
    }
}


class Usuario{

    protected nombre : string
    protected librosPrestados: Libro[] = []


    constructor(nombre:string){
        this.nombre=nombre
    }

    tomarLibro(libro:Libro){
        this.librosPrestados.push(libro)
    }

    devolverLibro(libro: Libro) {
        this.librosPrestados = this.librosPrestados.filter(l => l !== libro)
        libro.devolver()
    }

}


class Biblioteca {
    libros : Libro[] = []
    usuarios : Usuario[] = []

    agregarLibro(libro:Libro){
        this.libros.push(libro)
    }

    agregarUsuario(usuario:Usuario){
        this.usuarios.push(usuario)
    }

    prestarLibro(libro:Libro , usuario:Usuario){
        if(libro.estaDisponible()){
            libro.prestar()
            usuario.tomarLibro(libro)
        }else{
            console.log("Este libro no esta disponible")
        }
    }

    devolverLibro(libro: Libro, usuario: Usuario) {
        usuario.devolverLibro(libro)
    }
}

interface Prestable{
    prestar():void
    devolver():void
}

