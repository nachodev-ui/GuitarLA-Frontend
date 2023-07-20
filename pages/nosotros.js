import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '@/styles/Nosotros.module.css'

export default function Nosotros() {
  return (
    <Layout
      title={'Nosotros'}
      description={'Sobre nosotros, GuitarLA, tienda de música'}
    >
      <main className="contenedor">
        <h1 className="heading">Nosotros</h1>

        <div className={styles.contenido}>
          <Image
            src="/img/nosotros.jpg"
            width={1000}
            height={800}
            alt="Imagen sobre nosotros"
          />

          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac
              porttitor sem. Vestibulum eget nulla vitae leo ultrices lacinia.
              Proin scelerisque ante sed tempus laoreet. Etiam pellentesque
              tortor nibh, id condimentum nulla ultricies quis.
            </p>

            <p>
              Cras luctus risus eu elementum aliquet. Aenean eget risus dui.
              Vivamus mattis mauris libero, non consequat mauris dapibus quis.
              Vivamus eget pellentesque libero, ac mollis lectus. Aenean
              ultricies vel magna ac pretium. Aliquam erat volutpat. Suspendisse
              in facilisis lectus. Mauris et ullamcorper lorem. Etiam ultrices
              arcu arcu, sit amet malesuada diam pulvinar eu. Nulla non rutrum
              dolor.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}
