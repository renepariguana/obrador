# APP Web — Recreación de Diseño Web

Cuando el usuario proporcione una imagen de referencia (captura de pantalla) y opcionalmente algunas clases CSS o notas de estilo:

1. **Generar** un único archivo `index.html` usando Tailwind CSS (vía CDN). Incluye todo el contenido en línea — sin archivos externos a menos que se solicite.
2. **Capturar** la página renderizada usando Puppeteer. Si la página tiene secciones distintas, captúralas individualmente también.
3. **Comparar** tu captura con la imagen de referencia. Busca discrepancias en espaciado, fuentes, colores, alineación, sombras y responsive.
4. **Corregir** cada discrepancia. Edita el código HTML/Tailwind.
5. **Volver a capturar** y comparar de nuevo.
6. **Repetir** hasta que el resultado esté dentro de ~2–3px de la referencia.

NO te detengas después de una sola pasada. Realiza siempre al menos 2 rondas de comparación.

**Valores por defecto**: Tailwind CSS vía CDN, imágenes de `https://placehold.co/`, diseño responsive mobile-first, un solo `index.html`.
