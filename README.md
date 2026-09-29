# Origen Ecuador — Taller Medusa + Supabase

Tienda de demostración con Medusa v2, Next.js y PostgreSQL en Supabase.
Incluye Ecuador en USD, Europa en EUR y pago manual de prueba, sin cobros reales.

## Ejecutar en otro equipo

1. Instala Node.js 22 (22.12 o superior) y pnpm 10.30.3.
2. Clona este repositorio y ejecuta `pnpm install`.
3. Copia `apps/backend/.env.example` a `apps/backend/.env` y configura tu conexión PostgreSQL y secretos propios.
4. Copia `apps/storefront/.env.example` a `apps/storefront/.env.local`.
5. Para una base nueva, desde `apps/backend` ejecuta `pnpm medusa db:migrate`, crea tu usuario con `pnpm medusa user -e TU_CORREO -p TU_PASSWORD` y ejecuta `pnpm medusa exec ./src/scripts/add-ec-region.ts`.
6. Obtén una clave pública de Medusa asociada al canal de ventas y configúrala en `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` del storefront.
7. Desde la raíz ejecuta `pnpm dev`. En Windows también puedes usar `INICIAR-TALLER.cmd`.

- Tienda Ecuador: http://localhost:8000/ec
- Tienda Europa: http://localhost:8000/dk
- Administrador: http://localhost:9000/app

Los productos creados en el Admin, pedidos e inventario se guardan en la base de datos, no en Git. Una base nueva requiere crear también el Café de Loja siguiendo la guía. El repositorio no incluye contraseñas ni una copia de la base de datos.

## Documentación

- [Guía original del taller](GUIA-TALLER.md)
- [Configuración, pruebas y resultado](LEEME-TALLER.md)

Proyecto basado en el starter oficial de Medusa. Personalización: Origen Ecuador, colores verde y crema e ilustración propia del Café de Loja.
