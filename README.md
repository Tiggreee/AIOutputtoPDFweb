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

### Por que existe
- Ahorrar tiempo cuando necesitas llevar texto de IA a un entregable formal.
- Evitar friccion de copiar en procesadores externos para exportar PDF.
- Mantener privacidad local: el texto se procesa en el navegador.

### Como funciona
1. Escribes o pegas contenido (manual o portapapeles).
2. Ajustas formato rapido (titulo, fuente, espaciado, tamano de pagina).
3. La app genera el PDF en cliente con jsPDF y descarga directa.

### Como se construyo
- Base con HTML/CSS/JS vanilla para mantener simplicidad y control.
- UI inspirada en XP para identidad visual clara y reconocible.
- Internacionalizacion dinamica con fallback robusto.
- Publicacion en GitHub Pages con rama dedicada `gh-pages` (sin Actions).

### Tecnologias usadas
- HTML, CSS, JavaScript vanilla.
- `jsPDF` (via CDN) para generar PDF en cliente.
- Geolocalizacion ligera por IP (`ipapi.co`) + fallback a `navigator.language`.
- GitHub Pages (branch `gh-pages`, modo legacy, sin GitHub Actions).

### Decisiones tecnicas clave
- Cliente-first: cero backend para bajar complejidad y costos.
- Fallback de localizacion para no depender de una sola fuente externa.
- Mensajes de error granulares para mejorar UX y soporte.
- Script de deploy unico (`deploy-pages.sh`) para reducir errores manuales.

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
