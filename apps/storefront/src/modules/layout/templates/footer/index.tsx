import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="origen-footer">
      <div className="origen-footer-top">
        <div>
          <LocalizedClientLink href="/" className="origen-wordmark">origen<span>ECUADOR</span></LocalizedClientLink>
          <p>Lo que elegimos cuenta de dónde venimos.</p>
        </div>
        <nav aria-label="Enlaces del pie de página">
          <LocalizedClientLink href="/store">La tienda</LocalizedClientLink>
          <LocalizedClientLink href="/products/cafe-de-loja">Café de Loja</LocalizedClientLink>
          <LocalizedClientLink href="/account">Mi cuenta</LocalizedClientLink>
          <LocalizedClientLink href="/cart">Carrito</LocalizedClientLink>
        </nav>
      </div>
      <div className="origen-footer-bottom"><span>© {new Date().getFullYear()} Origen Ecuador</span><span>Tienda de demostración · Ecuador</span></div>
    </footer>
  )
}
