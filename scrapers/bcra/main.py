from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time
from bcraWriter import DbWriter


def SeleniumWebScraper():
    url = "http://www.bcra.gov.ar/PublicacionesEstadisticas/Tipo_de_cambio_minorista.asp"

    options = webdriver.ChromeOptions()
    options.add_argument('headless')  # Headless == no GUI

    with webdriver.Chrome(options=options) as driver:
        driver.get(url)

        dropdown = Select(driver.find_element_by_xpath(
            "/html/body/div/div[2]/div/div/div/form/div/div[1]/select"))
        dropdown.select_by_visible_text('DOLAR')

        calendar = driver.find_element_by_xpath(
            "/html/body/div[1]/div[2]/div/div/div/form/div/div[2]/input")
        calendar.click()

        selected_date = driver.find_element_by_class_name("tcalToday")
        selected_date.click()

        enter_button = driver.find_element_by_xpath(
            "/html/body/div[1]/div[2]/div/div/div/form/div/div[3]/button")
        enter_button.click()

        time.sleep(2)  # Just in case

        return BeautifulSoup(driver.page_source, "lxml")


def BcraScraper(page):
    small_table = page.find("table", id="tablita").find_all("td")

    usd_com = round(float(small_table[-2].text.replace(",", ".")), 2)
    usd_ven = round(float(small_table[-1].text.replace(",", ".")), 2)

    return (usd_com, usd_ven)


def BankScraper(table, bank_name):
    for element in table:
        if element.find("td").text.strip() == bank_name:
            index = table.index(element)
            usd_com = table[index].find_all("td")[-2].text.strip()
            usd_ven = table[index].find_all("td")[-1].text.strip()
            return (round(float(usd_com.replace(",", ".")), 2),
                    round(float(usd_ven.replace(",", ".")), 2))


def CotizacionesDict(banco, cotizaciones):
    return {"banco": banco,
            "compra": cotizaciones[0],
            "venta": cotizaciones[1]}


def Main():
    page = SeleniumWebScraper()
    big_table = page.find("table", class_="table-hover").find_all("tr")

    return [
        CotizacionesDict("bcra", BcraScraper(page)),
        CotizacionesDict("brubank", BankScraper(big_table, "BRUBANK S.A.U.")),
        CotizacionesDict("credicoop", BankScraper(
            big_table, "BANCO CREDICOOP COOPERATIVO LIMITADO")),
        CotizacionesDict("hsbc", BankScraper(
            big_table, "HSBC BANK ARGENTINA S.A.")),
        CotizacionesDict("macro", BankScraper(big_table, "BANCO MACRO S.A."))
    ]


DbWriter(Main())
