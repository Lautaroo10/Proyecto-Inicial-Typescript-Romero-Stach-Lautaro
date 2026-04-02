import { describe, it, expect } from "vitest"
import { LibroLiteratura , Libro , LibroHistorico, Usuario , Biblioteca } from "../src/biblioteca"

describe("Libro", () => {

    it("debería cambiar a no disponible cuando se presta y volver a estar disponible cuando se devuelve", () => {
        const libro = new LibroLiteratura("El Principito", true, "pepe", 100, 200, "Infantil")

        libro.prestar()
        expect(libro.estaDisponible()).toBe(false)

        libro.devolver()
        expect(libro.estaDisponible()).toBe(true)
    })

})

describe("Biblioteca", () => {

    it("cuando un usuario toma un libro, debe quedar en su lista y no estar más en la biblioteca", () => {
        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", true)
        const libro = new LibroLiteratura("El Principito", true, "pepe", 100, 200, "Infantil")

        biblioteca.agregarLibro(libro)
        biblioteca.agregarUsuario(usuario)

        biblioteca.prestarLibro(libro, usuario)

        expect(usuario.getLibrosPrestados()).toContain(libro)
        expect(biblioteca.getLibros()).not.toContain(libro)
    })

})




describe("Membrecia", () => {

    it("Dependdiendo si el usuario tiene membrecia o no , se le hace el descuento del 20 porciento", () => {

        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", true)
        const libro = new LibroLiteratura("El Principito", true, "pepe", 100, 200, "Infantil")
        const precio = usuario.getPrecioFinal(libro)

        
        biblioteca.agregarLibro(libro)
        biblioteca.agregarUsuario(usuario)
        biblioteca.prestarLibro(libro, usuario)
        expect(precio).toBe(160)




    })






} )

