import os
import sys
import json
import mysql.connector


def DbWriter(lista):

    # Creamos el directorio relativo para el archivo con las credenciales de la DB:
    parentDir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    credentials = parentDir + '/conf.json'

    # Levanta los datos de conexion de la database de config.json en un objeto de Python
    with open(credentials) as data_file:
        settings = json.load(data_file)

    # Nos conectamos a la DB con el objeto creado para no hardcodear las PW (casihackeeeer)
    mydb = mysql.connector.connect(
        host=settings["db_host"],
        user=settings["db_user"],
        passwd=settings["db_pass"],
        database=settings["database"]
    )

    # Inicializamos el escribidor (?) de databases
    mycursor = mydb.cursor()

    for item in lista:
        sqlFormula = f"INSERT INTO {item['banco']} VALUES (CURDATE(), %s, %s);"
        # SIEMPRE separar por ',' y feedear tupla, nunca con '%'
        datos = (item['compra'], item['venta'])
        mycursor.execute(sqlFormula, datos)
        mydb.commit()
        print(f"Carga de Banco {item['banco']} finalizada.")

# # DB Schema:
#
# +---------+--------------+------+-----+---------+-------+
# | Field   | Type         | Null | Key | Default | Extra |
# +---------+--------------+------+-----+---------+-------+
# | fecha   | date         | NO   | PRI | NULL    |       |
# | usd_com | decimal(4,2) | YES  |     | NULL    |       |
# | usd_ven | decimal(4,2) | YES  |     | NULL    |       |
# +---------+--------------+------+-----+---------+-------+
