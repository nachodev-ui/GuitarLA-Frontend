import Layout from '@/components/Layout'
import Guitarra from '@/components/Guitarra'
import styles from '@/styles/Grid.module.css'

export default function Tienda({ guitarras }) {
  return (
    <Layout
      title={'Tienda Virtual'}
      description={
        'Tienda virtual, tienda de guitarras, instrumentos musicales y más'
      }
    >
      <main className="contenedor">
        <h1 className="heading">Nuestra colección</h1>

        <div className={styles.grid}>
          {guitarras?.map((guitarra) => (
            <Guitarra key={guitarra.id} guitarra={guitarra.attributes} />
          ))}
        </div>
      </main>
    </Layout>
  )
}

// Esto es para obtener los datos de la API y pasarlos como props a la página,
// para que se renderice con los datos de la API. Solo funciona al hacer build.
// export async function getStaticProps() {
//   const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`,)
//   const { data: guitarras } = await respuesta.json()

//   return {
//     props: {
//       guitarras,
//     },
//   }
// }

export async function getServerSideProps() {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`,
  )
  const { data: guitarras } = await respuesta.json()

  return {
    props: {
      guitarras,
    },
  }
}
