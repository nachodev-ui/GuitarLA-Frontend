import { useState, useEffect } from 'react'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const carritoLocalStorage =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('carrito')) ?? []
      : []
  const [carrito, setCarrito] = useState(carritoLocalStorage)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarCarrito = (guitarra) => {
    // Comprobar si la guitarra ya existe en el carrito
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Actualizar la cantidad
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          return {
            ...guitarraState,
            cantidad: guitarra.cantidad,
          }
        }

        return guitarraState
      })

      // Se asigna el carrito actualizado al estado
      setCarrito([...carritoActualizado])
      localStorage.setItem('carrito', JSON.stringify(carritoActualizado))
    } else {
      // En caso de que no exista, se agrega la guitarra al carrito
      setCarrito([...carrito, guitarra])
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  }

  const eliminarProducto = (id) => {
    const carritoActualizado = carrito.filter((producto) => producto.id !== id)
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = parseInt(guitarra.cantidad)
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  return hydrated ? (
    <Component
      {...pageProps}
      carrito={carrito}
      agregarCarrito={agregarCarrito}
      eliminarProducto={eliminarProducto}
      actualizarCantidad={actualizarCantidad}
    />
  ) : null
}
