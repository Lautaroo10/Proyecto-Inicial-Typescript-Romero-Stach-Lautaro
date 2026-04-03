export interface Prestable{
    prestar():void
    devolver():void
}

export abstract class Libro implements Prestable {
    protected titulo : string
    protected disponible : boolean
    protected autor : string
    protected precio : number

    constructor(titulo:string ,  autor:string , precio : number , disponible:boolean) {  
        this.titulo = titulo
        this.disponible = disponible
        this.autor=autor
        this.precio = precio
    }

    estaDisponible(): boolean {
        return this.disponible
    }

    getPrecio():number{
        return this.precio
    }

    abstract getDetalles(): string

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
    protected genero: string

    constructor( titulo : string ,  autor:string , paginas:number , precio:number , genero:string , disponible:boolean){
        super(titulo,autor,precio,disponible)
        this.paginas=paginas
        this.genero=genero
    }

    getDetalles(): string {
        return `Título: ${this.titulo} | Autor: ${this.autor} | Paginas: ${this.paginas} | Precio: ${this.precio} | Genero: ${this.genero} | Disponible: ${this.disponible}`
    }   
}


export class LibroHistorico extends Libro{
    protected anio : number
    protected periodo: string

    constructor( titulo : string ,autor:string , anio:number , precio:number , periodo:string , disponible:boolean){
        super(titulo,autor,precio,disponible)
        this.anio=anio
        this.periodo=periodo
    }

    getDetalles(): string {
    return `Título: ${this.titulo} | Autor: ${this.autor} | Año: ${this.anio} | Precio: ${this.precio} | Período: ${this.periodo} | Disponible: ${this.disponible}`
    }   

    
}


export class Usuario{

    protected nombre : string
    protected librosPrestados: Libro[] = []
    protected membrecia : boolean


    constructor(nombre:string , membrecia : boolean){
        this.nombre=nombre
        this.membrecia=membrecia
    }

    getNombre():string{
        return this.nombre
    }

    tieneMembrecia():boolean{
        return this.membrecia
    }

    getLibrosPrestados(): Libro[] {
        return this.librosPrestados
    }

    getPrecioFinal(libro: Libro): number {
    const precio = libro.getPrecio()
    if(this.membrecia){
        return precio * 0.8
    } else {
        return precio
    }
}

    tomarLibro(libro:Libro){
        this.librosPrestados.push(libro)
    }

    devolverLibro(libro: Libro) {
        this.librosPrestados = this.librosPrestados.filter(l => l !== libro)
        libro.devolver()
    }

    verDetalles(libro:Libro) : string {
        return libro.getDetalles()
    }

    
}


export class Biblioteca {
    libros : Libro[] = []
    usuarios : Usuario[] = []
    listaDeEspera : Map<Libro, Usuario[]> = new Map


    getLibros(): Libro[] {
        return this.libros 
    }

    getUsuarios() : Usuario[]{
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
            const precioFinal = usuario.getPrecioFinal(libro)
            if(usuario.tieneMembrecia()){
                console.log(`Precio original: $${libro.getPrecio()} - Precio con descuento de membresía (20%): $${precioFinal}`)
            } else {
                console.log(`Precio: $${precioFinal}`)
            }

            libro.prestar()
            usuario.tomarLibro(libro)
        } else {
            console.log("Este libro no esta disponible")
        }
    }

    devolverLibro(libro: Libro, usuario: Usuario) {
        usuario.devolverLibro(libro)
    }
}


