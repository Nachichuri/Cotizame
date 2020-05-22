# Divisame

## About
Divisame es una página que tiene el objetivo de funcionar como una base de datos que almacene las cotizaciones de bancos argentinos. Almacena la información diaria mostrada en los sitios webs públicos de cada banco luego del cierre de cotizaciones y su fin es informativo. Saber la cotización diaria es importante para las operaciones que se hagan en el día, y tener fechas históricas puede ayudar con cálculos de pagos de tarjetas de crédito.

Más allá de los usos inmediatos, como cualquier tipo de base de datos, sirve para obtener tendencias de como evolucionan (o en el caso del pobre peso argentino, involuciona) las cotizaciones de las monedas, tendencias generales de los bancos, etc. La idea es ir agregando cada vez más funcionalidades de visualizacion de la data en la página.

Toda la información de Divisame es pública y está disponible para su uso.

Podés saber más sobre el proyecto leyendo las [F.A.Q](https://divisa.me/faq).

## Under the hood
Divisame funciona con una serie de scrapers que simplemente corren en un cron (bastante crudo, a futuro tengo que ver como implementarlo mejor) y guardan la info scrapeada en una DB.

### ¿Dudas, sugerencias o críticas?

Contactame a nachichuri@gmail.com  :smile: