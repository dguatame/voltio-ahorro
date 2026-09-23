# Voltio Ahorro

Landing de auditoría de luz y gas para quien quiere pagar menos en España.

## Cómo verla

Hace falta Node 20.19 o superior.

```bash
nvm use
npm install
npm start
```

Se abre en `http://localhost:4200`.

## Cómo está organizada

Angular 21, componentes standalone y un formulario reactivo. El CSS está en `src/styles.scss`: al ser una sola página, me resultaba más cómodo retocar ahí que abrir un archivo por sección.

- `src/app/layout` — cabecera y pie
- `src/app/pages` — portada, aviso legal y privacidad
- `src/app/consultation` — formulario y validación del teléfono

Las fotos y los iconos están en `public/images`. Salen del diseño en Figma.

## Decisiones

El diseño sigue el archivo de Figma de Voltio Ahorro: fondo claro, acento ámbar y los títulos en Outfit. Quería que se leyera como una asesoría, no como un comparador ni como una web de placas solares. Por eso el hero lleva una familia mirando la factura, no un tejado.

El botón importante es siempre la auditoría gratis y baja al formulario. El secundario lleva a los tres pasos.

El formulario pide nombre, teléfono, email, tipo de cliente y un mensaje opcional. El teléfono lo valido como número español de 9 dígitos, con o sin prefijo +34. El tipo de cliente arranca en «Particular / Hogar». No hay casilla aparte: al enviar se acepta la política de privacidad, y el enlace abre esa página. No hay API: al enviar se confirma en la misma tarjeta. El hueco del `POST` está comentado en `consultation-form.ts`.

Las cifras del bloque oscuro (340 €, +15.000, 98,7 %, 32 comercializadoras) vienen del diseño. No son el cálculo de un cliente concreto.

No hay banner de cookies porque la página no mete analítica. Eso queda dicho en el aviso legal.

## Publicación

El repositorio es privado: https://github.com/dguatame/voltio-ahorro

La página publicada está en https://voltio-ahorro.vercel.app
