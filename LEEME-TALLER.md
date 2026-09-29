# Taller Medusa + Supabase

Proyecto del taller, con Node 22 y pnpm 10.30.3.

## Estructura

- `apps/backend`: Medusa v2 y Admin en el puerto 9000.
- `apps/storefront`: tienda Next.js en el puerto 8000.
- Supabase se usa exclusivamente como PostgreSQL mediante Session pooler, puerto 5432.
- Sin servidor Redis, Stripe, Supabase Auth, Realtime ni Storage.
- Los archivos subidos a Medusa se guardan localmente. Las imágenes de ejemplo del starter son remotas.

## Iniciar

Abre `INICIAR-TALLER.cmd` y mantén abierta la ventana.
También puedes ejecutar `pnpm dev` desde esta carpeta, con Node 22 activo.

| Pantalla | URL |
| --- | --- |
| Admin | http://localhost:9000/app |
| Tienda Ecuador | http://localhost:8000/ec/store |
| Tienda Europa | http://localhost:8000/dk/store |
| Health | http://localhost:9000/health |

Cuenta del taller: `admin@medusajs.com` / `supersecret`.

## Configuración

La conexión está en `apps/backend/.env`. Las variables públicas de la tienda
están en `apps/storefront/.env.local`. Ambos archivos están excluidos de Git.
`supabase-taller.env` conserva la conexión suministrada durante la preparación;
si cambias la contraseña de Supabase, actualiza también el `.env` del backend.

El SSL usa `sslmode=no-verify` y `rejectUnauthorized: false`, tal como pide la guía.
Es la configuración de desarrollo del taller.

## Comandos del taller

Desde `apps/backend`, con pnpm disponible:

```powershell
pnpm medusa db:migrate
pnpm medusa user -e admin@medusajs.com -p supersecret
pnpm medusa exec ./src/scripts/add-ec-region.ts
```

La versión del starter instalada ejecuta el seed inicial durante las migraciones.
No hay que repetir la creación del administrador si la cuenta ya existe.
El script de Ecuador puede repetirse: busca la región, la región fiscal,
la zona de servicio y la opción Standard antes de crearlas.

## Entrega

Los bloques A–D se completaron con la base Supabase del taller:

- Admin accesible con la cuenta indicada y cuatro productos originales del starter.
- La raíz de la tienda redirige a `/ec`; Ecuador usa USD y `/dk` conserva EUR.
- Región fiscal de Ecuador y opción Standard de 10 USD.
- El script de Ecuador se ejecutó dos veces: una región Ecuador y una opción Standard.
- Café de Loja creado desde el Admin, con precio 15 USD / 15 EUR e inventario inicial de 20.
- Pedido de prueba **#1**, total **25 USD**: un café de 15 USD y envío de 10 USD.
- Pago manual autorizado, sin cobro real; pedido pendiente de preparación.
- Inventario posterior: 20 en stock, 1 reservado y 19 disponibles.

Pedido: `order_01M3BPQ46J1DZKXYC8A11KJCEV`.

La personalización **Origen Ecuador** incluye portada verde y crema,
identidad de marca, navegación principal en español e ilustración SVG propia
del Café de Loja. El catálogo y el checkout conservan el funcionamiento del starter;
algunas pantallas del starter permanecen en inglés.

La guía original está en `GUIA-TALLER.md`. Este proyecto es una demostración local:
no tiene correo transaccional externo, pasarela de cobro real ni despliegue público.
