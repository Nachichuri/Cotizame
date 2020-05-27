from bs4 import BeautifulSoup
from selenium import webdriver
from ciudadWriter import Writer
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

# URL a scrapear
url = "https://www.bancociudad.com.ar/institucional/?herramienta=cotizaciones#"

# Creamos la instancia de Selenium con Chrome, le pasamos las opciones para que corra headless (sin GUI)
options = webdriver.ChromeOptions()
options.add_argument('headless')
driver = webdriver.Chrome(options=options)

driver.get(url)
timeout = 3
try:
    elemento_presente = EC.presence_of_element_located((By.CLASS_NAME, 'herramientas_cotizaciones'))
    WebDriverWait(driver, timeout).until(elemento_presente)
    print("Página cargada")
except TimeoutException:
    print("Timed out")
finally:
    print("Parseando info...")

cotiz_final = []

# Con el output que nos da Selenium lo parseamos con BeautifulSoup4
soup = BeautifulSoup(driver.page_source, 'lxml')
driver.quit()

# Ese nesting si se puede ver, Banco Ciudad:
tabla = soup.find("div", class_="herramientas_cotizaciones")
divs = tabla.find_all("div", class_="cotizacion")

for item in divs:
    spans = item.find_all("span")
    for span in spans:
        span = span.text
        if '$' in span:
            span = span[2:]
            span = span.replace(',', '.')
            span = float(span)
            cotiz_final.append(span)

cotiz_final = cotiz_final[:len(cotiz_final)-2] # Le sacamos la cotizacion del oro porque who cares, ain't that rich

# Imprimimos en pantalla los valores scrapeados de type float
print("USD C | USD V | EUR C | EUR V | REA C | REA V")
print(cotiz_final)

# Escribimos en la DB
Writer(cotiz_final)
