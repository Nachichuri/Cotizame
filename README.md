# Divisame

## About
Divisame es un proyecto con varias patas que convergen en una pagina web informativa, con las cotizaciones históricas de las diferentes divisas ofrecidas en diferentes bancos argentinos. Almacena, procesa y muestra la información diaria recolectada de los sitios webs públicos de cada banco luego del cierre de cotizaciones.

Más allá de los usos inmediatos de esta información, como cualquier tipo de base de datos, sirve para obtener tendencias de como evolucionan (o en el caso del pobre peso argentino, involuciona) las cotizaciones de las monedas, tendencias generales de los bancos, etc. La idea es ir agregando cada vez más funcionalidades de visualizacion.

Toda la información de Divisame es recopilada de fuentes públicas, y permanece de público acceso para su visualización y uso.

Podés saber más sobre el proyecto leyendo las [F.A.Q](https://divisa.me/faq).

## Under the hood
Divisame funciona con una serie de [scrapers](scrapers) que levantan la información pública de las páginas de cada banco y guardan la información en una base de datos (corren corren en un cron bastante crudo, a futuro tengo que ver como implementarlo mejor).

Las bases de datos son usadas como base para la [página web](webpage), hecha con Django, un framework web basado en Python. La gestión de la información es bastante sencilla y no es realmente necesario un framework para el frontend, y es posible gestionar todo el contenido solamente con [3 templates de Django](/webpage/bancos/templates/).

A su vez, se hace uso de librerías como [Chart.js](https://www.chartjs.org/) para lograr una visualización mucho más agradable de los datos.

Te invito a que veas las partes principales en este repo, ¡y cualquier sugerencia es bienvenida!

### ¿Dudas, sugerencias o críticas?

Contactame a nachichuri@gmail.com :smile: