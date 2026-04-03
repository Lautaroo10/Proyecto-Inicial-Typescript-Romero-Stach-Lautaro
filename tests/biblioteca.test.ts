import { describe, it, expect , vi } from "vitest"
import { LibroLiteratura , Libro , LibroHistorico, Usuario , Biblioteca } from "../src/biblioteca"

describe("Libro", () => {

    it("debería cambiar a no disponible cuando se presta y volver a estar disponible cuando se devuelve", () => {
        const libro = new LibroLiteratura("El Principito",  "pepe", 100, 200, "Infantil",true)

        libro.prestar()
        expect(libro.estaDisponible()).toBe(false)

        libro.devolver()
        expect(libro.estaDisponible()).toBe(true)
    })

})

it("cuando un usuario toma un libro, debe quedar en su lista y el libro debe quedar no disponible", () => {
    const biblioteca = new Biblioteca()
    const usuario = new Usuario("Lautaro", true)
    const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil", true)

    biblioteca.agregarLibro(libro)
    biblioteca.agregarUsuario(usuario)
    biblioteca.prestarLibro(libro, usuario)

    expect(usuario.getLibrosPrestados()).toContain(libro)
    expect(biblioteca.getLibros()).toContain(libro)   
    expect(libro.estaDisponible()).toBe(false)       
})


it("un usuario puede tomar mas de un libro y deben quedar no disponibles", () => {
    const biblioteca = new Biblioteca()
    const usuario = new Usuario("Lautaro", true)
    const libro1 = new LibroLiteratura("El Principito", "pepe", 2005, 200, "Infantil", true)
    const libro2 = new LibroLiteratura("Harry Potter", "JK.Rowlling", 1998, 500, "Infantil", true)

    biblioteca.agregarLibro(libro1)
    biblioteca.agregarLibro(libro2)
    biblioteca.agregarUsuario(usuario)

    biblioteca.prestarLibro(libro1, usuario)
    biblioteca.prestarLibro(libro2, usuario)

    expect(usuario.getLibrosPrestados()).toEqual([libro1, libro2])
    expect(libro1.estaDisponible()).toBe(false)   
    expect(libro2.estaDisponible()).toBe(false)
})


describe("Biblioteca", () => {

    it("Cuando dos usuarios quieren agarrar el mismo libro , al segundo no le debe dejar ", () => {
        const biblioteca = new Biblioteca()
        const usuario1 = new Usuario("Lautaro", true)
        const usuario2 = new Usuario ("Lisandro" , true)
        const libro1 = new LibroLiteratura("Harry Potter",  "JK.Rowlling", 1998, 500 , "Infantil",true)
        const consolog = vi.spyOn(console , "log")

        biblioteca.agregarLibro(libro1)
        biblioteca.agregarUsuario(usuario1)
        biblioteca.agregarUsuario(usuario2)

        biblioteca.prestarLibro(libro1, usuario1)
        biblioteca.prestarLibro(libro1,usuario2)

        expect(usuario1.getLibrosPrestados()).toContain(libro1)
        expect(usuario2.getLibrosPrestados()).not.toContain(libro1)
        expect(consolog).toHaveBeenCalledWith("Este libro no esta disponible")
    })
})







it("cuando un usuario devuelve un libro, debe salir de su lista y volver a la biblioteca", () => {
    const biblioteca = new Biblioteca()
    const usuario = new Usuario("Lautaro", true)
    const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil", true)

    biblioteca.agregarLibro(libro)
    biblioteca.agregarUsuario(usuario)
    biblioteca.prestarLibro(libro, usuario)
    biblioteca.devolverLibro(libro, usuario)

    expect(usuario.getLibrosPrestados()).not.toContain(libro)
    expect(biblioteca.getLibros()).toContain(libro)
    expect(libro.estaDisponible()).toBe(true)
})




describe("Membrecia", () => {

    it("Dependdiendo si el usuario tiene membrecia , se le hace el descuento del 20 porciento", () => {

        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", true)
        const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil" , true)
        const precio = usuario.getPrecioFinal(libro)

        biblioteca.agregarLibro(libro)
        biblioteca.agregarUsuario(usuario)
        biblioteca.prestarLibro(libro, usuario)
        expect(precio).toBe(160)
    })
} )



describe("Membrecia", () => {

    it("Dependdiendo si el usuario no tiene membrecia , no se le hace el descuento del 20 porciento", () => {

        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", false)
        const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil",true)
        const precio = usuario.getPrecioFinal(libro)

        biblioteca.agregarLibro(libro)
        biblioteca.agregarUsuario(usuario)
        biblioteca.prestarLibro(libro, usuario)
        expect(precio).toBe(200)
    })
} )




describe("Detalles", () => {

    it("Cuando le pedimos el detalle al libro literario , nos lo tiene que dar", () => {

        const libro1 = new LibroLiteratura("El Principito",  "pepe", 100, 200, "Infantil",true)

        expect(libro1.getDetalles()).toContain("El Principito")
        expect(libro1.getDetalles()).toContain("pepe")
        expect(libro1.getDetalles()).toContain(100)
        expect(libro1.getDetalles()).toContain(200)
        expect(libro1.getDetalles()).toContain("Infantil")
        expect(libro1.getDetalles()).toContain(true)
        
    })
} )




describe("Detalles", () => {

    it("Cuando le pedimos el detalle al libro historico , nos lo tiene que dar", () => {

        const libro1 = new LibroHistorico("Biblia", "Dios", 1, 200, "ac" , true)

        expect(libro1.getDetalles()).toContain("Biblia")
        expect(libro1.getDetalles()).toContain("Dios")
        expect(libro1.getDetalles()).toContain(1)
        expect(libro1.getDetalles()).toContain(200)
        expect(libro1.getDetalles()).toContain("ac")
        expect(libro1.getDetalles()).toContain(true)
    })
})



describe("Detalles", () => {

    it("Que el usuario pueda pedir los detalles", () => {

        const libro1 = new LibroHistorico("Biblia", "Dios", 1, 200, "ac" , true)
        const usuario = new Usuario("Lautaro",true)

        expect(usuario.verDetalles(libro1)).toBe(`Título: Biblia | Autor: Dios | Año: 1 | Precio: 200 | Período: ac | Disponible: true`)
    })
})



describe("Libro - prestar cuando ya está prestado", () => {
    it("debería loguear un mensaje si el libro ya está prestado", () => {
        const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil", false)
        const consolog = vi.spyOn(console, "log")

        libro.prestar()

        expect(consolog).toHaveBeenCalledWith("Este libro ya esta prestado")
        consolog.mockRestore()
    })
})


describe("Biblioteca - prestarLibro cuando el libro no pertenece", () => {
    it("debería loguear un mensaje si el libro no está en la biblioteca", () => {
        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", true)
        const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil", true)
        const consolog = vi.spyOn(console, "log")

        biblioteca.agregarUsuario(usuario)
        biblioteca.prestarLibro(libro, usuario)  

        expect(consolog).toHaveBeenCalledWith("El libro no pertenece a la biblioteca")
        consolog.mockRestore()
    })
})


describe("Biblioteca - prestarLibro cuando el usuario no está registrado", () => {
    it("debería loguear un mensaje si el usuario no está registrado", () => {
        const biblioteca = new Biblioteca()
        const usuario = new Usuario("Lautaro", true)
        const libro = new LibroLiteratura("El Principito", "pepe", 100, 200, "Infantil", true)
        const consolog = vi.spyOn(console, "log")

        biblioteca.agregarLibro(libro)
        biblioteca.prestarLibro(libro, usuario)  

        expect(consolog).toHaveBeenCalledWith("El usuario no está registrado")
        consolog.mockRestore()
    })
})


