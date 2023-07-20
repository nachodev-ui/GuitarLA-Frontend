import { useEffect, useState } from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '@/styles/Carrito.module.css'

export default function Carrito({ carrito, actualizarCantidad, eliminarProducto }) {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0,
    )

    setTotal(calculoTotal)
  }, [carrito])

  return (
    <Layout title="Carrito de compras">
      <main className="contenedor">
        <h1 className="heading">Carrito</h1>

        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h2>Artículos</h2>

            {carrito.length === 0
              ? 'Carrito vacío'
              : carrito.map((producto) => (
                  <div key={producto.id} className={styles.producto}>
                    <div>
                      <Image
                        src={producto.imagen}
                        alt={`Imagen de ${producto.nombre}`}
                        width={150}
                        height={100}
                      />
                    </div>
                    <div>
                      <p className={styles.nombre}>{producto.nombre}</p>

                      <div className={styles.cantidad}>
                        <p>Cantidad: </p>
                        <select
                          className={styles.select}
                          onChange={(e) =>
                            actualizarCantidad({
                              id: producto.id,
                              cantidad: +e.target.value,
                            })
                          }
                          value={producto.cantidad}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <p className={styles.precio}>
                        Valor: $<span>{producto.precio}</span>
                      </p>
                      <p className={styles.subtotal}>
                        Subtotal: $
                        <span>{producto.cantidad * producto.precio}</span>
                      </p>
                    </div>

                    <button 
                      className={`${styles.eliminar} ${styles.rebote}`} 
                      onClick={() => eliminarProducto(producto.id)}
                      type='button'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-trash"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </div>
                ))}
          </div>

          <aside className={styles.resumen}>
            <h3>Resumen del pedido</h3>
            <p>Total a pagar: ${total}</p>
          </aside>
        </div>
      </main>
    </Layout>
  )
}
