import { describe, it, expect } from "vitest"
import { LibroLiteratura , Libro , LibroHistorico, Usuario , Biblioteca } from "../src/biblioteca"

describe("Libro", () => {

    it("debería cambiar a no disponible cuando se presta y cuando se devuelva volver a estar disponible", () => {
    const libro = new LibroLiteratura("AnitaDeMares", true, "pepe", 100)

    libro.prestar()
    expect(libro.estaDisponible()).toBe(false)

    libro.devolver() 

    expect(libro.estaDisponible()).toBe(true)
})

})



describe("Usuario", () => {

    it("Usuario debe poder agarrar un libro y tenerlo en su lista de libros", () =>{
        const usuario = new Usuario("Lautaro")
        const libro = new LibroLiteratura("Pepito",true,"lauti" , 100)

        usuario.tomarLibro(libro)


        expect(usuario.getLibrosPrestados()).toContain(libro)

    })

})



describe("Biblioteca", ( ) =>{

    it("El usuario debe poder agarrar un libro que este disponible en la biblioteca y quedar registrado" , () => {
        const biblioteca = new Biblioteca()
        const usuario1 = new Usuario("Lautaro")
        const libro1 = new LibroLiteratura("principito",true,"pepe",100)

        biblioteca.agregarLibro(libro1)
        biblioteca.agregarUsuario(usuario1)

        biblioteca.prestarLibro(libro1 , usuario1)

        expect(biblioteca.getLibros()).not.toContain(libro1)
        expect(biblioteca.getUsuario()).toContain(usuario1)
        expect(libro1.estaDisponible()).toBe(false)
        expect(usuario1.getLibrosPrestados()).toContain(libro1)
    })
})




