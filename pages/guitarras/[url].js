import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Guitarras.module.css'
import Layout from '@/components/Layout'

export default function Producto({ guitarra, agregarCarrito }) {
  const [cantidad, setCantidad] = useState(0) // Hook de estado para la cantidad de guitarras a comprar
  const { nombre, descripcion, imagen, precio } = guitarra[0].attributes // DestructuringS

  const handleChangeQuantity = (e) => {
    setCantidad(+e.target.value) // El + convierte el string a number
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cantidad <= 0 || isNaN(cantidad)) {
      alert('Cantidad no válida')
      return
    }

    // Construir el objeto de la compra
    const guitarraCompra = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    // Pasando la información
    agregarCarrito(guitarraCompra)
  }

  return (
    <Layout title={`Guitarra ${nombre}`}>
      <div className={styles.guitarra}>
        <Image
          src={imagen.data.attributes.url}
          alt={`Imagen guitarra ${nombre}`}
          width={600}
          height={400}
        />

        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>

          <form onSubmit={handleSubmit} className={styles.formulario}>
            <label htmlFor="cantidad">Cantidad: </label>

            <select id="cantidad" onChange={handleChangeQuantity}>
              <option value="0">Seleccione una cantidad</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <input type="submit" value="Agregar al carrito" />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.API_URL}/guitarras`)
  const { data } = await response.json()

  const paths = data.map((guitarra) => ({
    params: {
      url: guitarra.attributes.url,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { url } }) {
  const response = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`,
  )
  const { data: guitarra } = await response.json()

  return {
    props: {
      guitarra,
    },
  }
}
