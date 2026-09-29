import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Origen Ecuador | Lo nuestro, más cerca",
  description: "Descubre Origen Ecuador: productos locales, Café de Loja y pequeños descubrimientos para tu día a día.",
}

export default async function Home({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)
  if (!region) return null
  const { response: { products } } = await listProducts({
    regionId: region.id,
    queryParams: { handle: "cafe-de-loja", fields: "*variants.calculated_price" },
  })
  return (
    <div className="origen-home">
      <Hero />
      <div className="origen-strip"><span>Identidad local</span><span>Envíos para Ecuador</span><span>Pequeños placeres, todos los días</span></div>
      <section className="origen-selection">
        <div className="origen-selection-copy">
          <p className="origen-eyebrow">NUESTRA PRIMERA SELECCIÓN</p>
          <h2>Una buena historia<br />empieza en casa.</h2>
          <p>Comenzamos en Loja, con un café que invita a bajar el ritmo y disfrutar el momento. Conoce el primer producto de Origen Ecuador.</p>
          <LocalizedClientLink href="/store" className="origen-text-link">Ver todos los productos <span aria-hidden="true">↗</span></LocalizedClientLink>
        </div>
        <ul className="origen-featured">
          {products.map((product) => <li key={product.id}><ProductPreview product={product} region={region} isFeatured /></li>)}
        </ul>
      </section>
    </div>
  )
}
