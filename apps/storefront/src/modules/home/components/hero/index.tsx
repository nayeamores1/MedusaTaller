import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Hero() {
  return (
    <section className="origen-hero">
      <div className="origen-hero-copy">
        <p className="origen-eyebrow">ECUADOR, EN LO COTIDIANO</p>
        <h1>Lo nuestro.<br /><em>Más cerca.</em></h1>
        <p className="origen-intro">Pequeños descubrimientos con un gran origen. Una selección local para disfrutar, compartir y volver a elegir.</p>
        <LocalizedClientLink href="/store" className="origen-button">Explorar la tienda <span aria-hidden="true">↗</span></LocalizedClientLink>
        <div className="origen-hero-note"><span /> Desde Ecuador, con identidad.</div>
      </div>
      <LocalizedClientLink href="/products/cafe-de-loja" className="origen-hero-art" aria-label="Descubrir Café de Loja">
        <div className="origen-art-label"><span>LA SELECCIÓN DE LA CASA</span><span>01 / LOJA</span></div>
        <Image src="/images/cafe-loja.svg" alt="Ilustración de nuestro Café de Loja en empaque de 250 g" width={800} height={960} priority />
        <div className="origen-art-caption"><span>Café de Loja <small>Una pausa con origen · 250 g</small></span><span aria-hidden="true">↗</span></div>
      </LocalizedClientLink>
    </section>
  )
}
