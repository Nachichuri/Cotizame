
export function chartDraw(banco, color, fechas, cotizaciones) {
  
  let lista_fechas = fechas.split(',');
  let lista_cotizaciones = cotizaciones.split(','); 

  // Todas las variables para graficar el Chart.js
  var ctx = document.getElementById("dolarChart");

  // Gradiente glorioso
  var chart = document.getElementById("dolarChart").getContext("2d"),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

  gradient.addColorStop(0, color + "80");
  gradient.addColorStop(0.5, color + "4D");
  gradient.addColorStop(1, color + "00");

  // Configuración del chart
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: lista_fechas,
      datasets: [
        {
          data: lista_cotizaciones,
          borderColor: color,
          fill: true,
          backgroundColor: gradient,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              max: Math.max(...lista_cotizaciones.map(Number)) + 0.2,
            },
          },
        ],
      },
      title: {
        display: true,
        position: "top",
        text: "Precio de venta del dólar Banco " + banco,
      },
      legend: {
        display: false,
      },
    },
  });
}


// FailedAttempt a hacerlo con la API - REVISAR problemas de conexion

// // La variable para storear la URL de la API
// const api_url = "https://divisa.me/api-completa";

// // Parseamos la info cruda que pulleamos desde la API
// async function getApiData(banco) {
//   const valores_finales = [[], [], []];

//   const response = await fetch(api_url);
//   const data = await response.json();
//   const ultima_quincena = data.bancos[banco].slice(0, 15);

//   // Armamos los dos arrays necesarios para el grafico, con fechas y cotizaciones
//   for (let i = 0; i < ultima_quincena.length; i++) {
//     valores_finales[0].unshift(ultima_quincena[i].fecha.slice(5));
//     valores_finales[1].unshift(parseFloat(ultima_quincena[i].usd_ven));
//   }

//   console.log(parseFloat(ultima_quincena[0].usd_ven).toFixed(2));

//   // Levantamos las variables que faltan para los dashboards
//   let fecha_formateada = ultima_quincena[0].fecha
//     .split("-")
//     .reverse()
//     .join("/");
//   let usd_com = parseFloat(ultima_quincena[0].usd_com);
//   let usd_com_antes = parseFloat(ultima_quincena[1].usd_com);
//   valores_finales[2].push(fecha_formateada, usd_com, usd_com_antes);

//   return valores_finales;
// }

// export function chartDraw(banco, color) {
//   getApiData(banco)
//     .then((api_response) => {
//       // Variables
//       let lista_fechas = api_response[0];
//       let lista_usd_ven = api_response[1];
//       let fecha = api_response[2][0];
//       let usd_com = api_response[2][1].toFixed(2);
//       let usd_ven = lista_usd_ven[lista_usd_ven.length - 1].toFixed(2);
//       let usd_com_antes = api_response[2][2].toFixed(2);
//       let usd_ven_antes = lista_usd_ven[lista_usd_ven.length - 2].toFixed(2);
//       let variacion = (
//         ((usd_ven - usd_ven_antes) / usd_ven_antes) *
//         100
//       ).toFixed(2);
//       let imp_pais = (usd_ven * 1.3).toFixed(2);

//       // Edición del dashboard
//       document.getElementById("fecha-actual").innerHTML = fecha;
//       document.getElementById("dashboard-compra").innerHTML = "$ " + usd_com;
//       document.getElementById("dashboard-venta").innerHTML = "$ " + usd_ven;
//       document.getElementById("impuesto-pais").innerHTML = "$ " + imp_pais;
//       document.getElementById("dashboard-compra-antes").innerHTML =
//         "$ " + usd_com_antes;
//       document.getElementById("dashboard-venta-antes").innerHTML =
//         "$ " + usd_ven_antes;

//       if (parseFloat(variacion) > 0) {
//         document.getElementById("variacion-dashboard").innerHTML =
//           variacion +
//           "% " +
//           "<i style='font-size:0.97rem' class='fa fa-arrow-up'></i>";
//         document.getElementById("variacion-dashboard").classList.add("aprecia");
//       } else if (variacion == 0) {
//         document.getElementById("variacion-dashboard").innerHTML =
//           variacion + "%";
//       } else {
//         document.getElementById("variacion-dashboard").innerHTML =
//           variacion +
//           "% " +
//           "<i style='font-size:0.97rem' class='fa fa-arrow-down'></i>";
//         document.getElementById("variacion-dashboard").classList.add("devalua");
//       }

//       $("#dashboard-venta-antes").on("mouseenter mouseleave", function (e) {
//         var text =
//           e.type === "mouseleave"
//             ? "$ " + usd_ven_antes
//             : "$ " + (usd_ven_antes * 1.3).toFixed(2);
//         $(this).stop().hide().text(text).fadeIn();
//       });

//       // Todas las variables para graficar el Chart.js
//       var ctx = document.getElementById("dolarChart");

//       // Gradiente glorioso
//       var chart = document.getElementById("dolarChart").getContext("2d"),
//         gradient = chart.createLinearGradient(0, 0, 0, 450);

//       gradient.addColorStop(0, color + "80");
//       gradient.addColorStop(0.5, color + "4D");
//       gradient.addColorStop(1, color + "00");

//       // Configuración del chart
//       var myChart = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: api_response[0],
//           datasets: [
//             {
//               data: api_response[1],
//               borderColor: color,
//               fill: true,
//               backgroundColor: gradient,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   beginAtZero: false,
//                   max: api_response[1][14] + 0.1,
//                 },
//               },
//             ],
//           },
//           title: {
//             display: true,
//             position: "top",
//             text: "Precio de venta del dólar Banco " + banco,
//           },
//           legend: {
//             display: false,
//           },
//         },
//       });
//     })
//     .catch((e) => {
//       console.log("Ocurrió un error :/ Intentá mas tarde");
//       console.log(e);
//     });
// }
