# Scrapers

En esta sección están todos los scripts que scrapean las páginas púbicas de cada banco. Si bien las librerías y los métodos utilizados son casi los mismo para todos, hay mucha diferencia en cómo cada banco muestra la información (cada página un mundo diferente), por eso hay básicamente un script para cada banco. La idea es poder unificarlo todo en algo un poco más prolijo, de momento corren todos en un cron y -aunque desprolijo- funciona.

La base de datos en la cual guarda la data scrapeada es propia, aunque podrías feedear los datos de la conexión en cada (banco)Writer.py para customizarla. Las credenciales de acceso tienen que estar en un .json en el directorio superior (../scraper).

Hay bastantes cosas hardcodeadas y algunas cosas bastante crudencias, pero hey... it works! Estoy trabajando en un proyecto un poco más mostrable que podés ver [acá](https://github.com/Nachichuri/BankScraper).

Cualquier sugerencia es bienvenida en nachichuri@gmail.com

### Dependencias:


<details>
  <summary>Python 3</summary>
</details>

<details>
  <summary>MariaDB/MySQL</summary>
</details>

<details>
  <summary>BeautifulSoup4</summary>
    pip install beautifulsoup4
  </details>

<details>
  <summary>MySQL Connector</summary>
    pip install mysql-connector
</details>

<details>
  <summary>LXML</summary>
    pip install lxml
</details>

<details>
  <summary>ChromeDriver</summary>
    Tenés que descargar la versión compatible con tu navegador y agregar la ubicación en el $PATH, también podés usar geckodriver.
</details>