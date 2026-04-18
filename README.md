# AI Output to PDF (Classic XP Style)

Web app sencilla para convertir texto de IA a PDF, sin vueltas y con look clasico inspirado en Windows XP.

## Pitch rapido
Convierte output de IA en PDF en segundos, con una interfaz retro reconocible, pegado desde portapapeles, personalizacion basica y enfoque en privacidad local (todo en navegador).

Ideal para notas, reportes y entregables rapidos sin depender de backends complejos.

URL publica:
- https://tiggreee.github.io/AIOutputtoPDFweb/



---

Si llegaste hasta aqui, ya no eres usuario casual: eres del team que si ahonda.

## Detalle tecnico

### Que hace
- Pegar texto manual o desde portapapeles.
- Ajustar titulo, tamano de fuente, espaciado y formato de pagina (A4/Letter).
- Generar y descargar PDF al instante.
- Mostrar conteo de caracteres y palabras en vivo.
- Adaptar el texto de la interfaz segun pais/idioma detectado (con fallback seguro).

### Stack y tecnologias
- HTML, CSS, JavaScript vanilla.
- `jsPDF` (via CDN) para generar PDF en cliente.
- Geolocalizacion ligera por IP (`ipapi.co`) + fallback a `navigator.language`.
- GitHub Pages (branch `gh-pages`, modo legacy, sin GitHub Actions).

### UX y seguridad aplicadas
- Mensajes de estado claros (exito/error) sin colores agresivos.
- Manejo de errores de portapapeles: permiso, contexto inseguro, vacio, fallo de lectura.
- Manejo de errores de PDF: motor no disponible o fallo de generacion.
- Aviso de privacidad: el texto se procesa en navegador.

### Ejecutar local
- Abre [index.html](index.html) en navegador.
- Para mejor soporte de portapapeles, usa el sitio publicado o localhost.

### Deploy rapido (sin Actions)
```bash
bash deploy-pages.sh
```
