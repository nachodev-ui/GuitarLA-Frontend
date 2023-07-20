import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'

export default function Pagina404() {
  return (
    <Layout title="Página no encontrada">
      <p className="error">Esta página no existe</p>

      <div
        style={{
          textAlign: 'center',
          marginTop: '5rem',
        }}
      >
        <Image
          src="/img/404.png"
          alt="Imagen 404"
          width={300}
          height={300}
          className="error-image"
        />
      </div>

      <Link href="/" className="error-enlace">
        Ir a Inicio
      </Link>
    </Layout>
  )
}
