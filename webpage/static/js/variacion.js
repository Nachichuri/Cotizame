$(document).ready(function () {

    // Activamos los Tooltips
    $('[data-toggle="tooltip"]').tooltip(); 
    
    // Rice de Index agregando flechitas y colores a las variaciones porcentuales
    // Llamo los ids
    let vpbbva = $("#vpbbva");
    let vpbrubank = $("#vpbrubank");
    let vpciudad = $("#vpciudad");
    let vpcredicoop = $("#vpcredicoop");
    let vpgalicia = $("#vpgalicia");
    let vphsbc = $("#vphsbc");
    let vpicbc = $("#vpicbc");
    let vpmacro = $("#vpmacro");
    let vpnacion = $("#vpnacion");
    let vppatagonia = $("#vppatagonia");
    let vpprovincia = $("#vpprovincia");
    let vpsantander = $("#vpsantander");

    // TODO: Cambiar a clase única
    
    //Defino lista
    let listaVariaciones = [vpbbva, vpbrubank, vpciudad, vpcredicoop, vpgalicia, vphsbc, vpicbc, vpmacro, vpnacion, vppatagonia, vpprovincia, vpsantander];
    for (var i = 0; i<listaVariaciones.length; i++) {

        if(parseFloat(listaVariaciones[i].text().replace(",",".")) > 0 ){
            listaVariaciones[i].addClass('aprecia').append('% <i style="font-size:0.75rem" class="fa fa-arrow-up"></i>') ;
        } else if(parseFloat(listaVariaciones[i].text().replace(",",".")) == 0) {
            listaVariaciones[i].append('%');
        } else {
            listaVariaciones[i].addClass('devalua').append('% <i style="font-size:0.75rem" class="fa fa-arrow-down"></i>');
        }
    };
    
   
    // Rice de cada dashboard agregando flechitas y colores a las variaciones porcentuales, y el cambio a +imp pais
    // Buscamos los elementos:
    let vp_dashboard = $("#variacion-dashboard");
    let cotiz_antes = $("#dashboard-venta-antes");

    // Chequeamos si hubo variaciones, en tal caso agregamos la flechita y la clase con color
    if (parseFloat(vp_dashboard.text().replace(",", ".")) > 0) {
        vp_dashboard.addClass('aprecia').append('% <i style="font-size:0.75rem" class="fa fa-arrow-up"></i>');
    } else if (parseFloat(vp_dashboard.text().replace(",", ".")) == 0) {
        vp_dashboard.append('%');
    } else {
        vp_dashboard.addClass('devalua').append('% <i style="font-size:0.75rem" class="fa fa-arrow-up"></i>');
    }

    // Vamos a hacer una pequeña adición al hacer que en evento hover sobre el span de la cotizacion del dia anterior, muestre la cotizacion con el impuesto pais
    let usd_ven_antes = parseFloat(cotiz_antes.text().replace(",", "."));
    let usd_ven_con_imp = (usd_ven_antes * 1.65).toFixed(2).replace(".", ",")

    $("#dashboard-venta-antes").on("mouseenter mouseleave", function (e) {
        var text =
          e.type === "mouseleave"
            ? usd_ven_antes.toFixed(2).toString().replace(".", ",")
            : usd_ven_con_imp
        $(this).stop().hide().text(text).fadeIn();
      });

    // Hacemos un botoncito para que muestre el impuesto pais con switch
    $('#customSwitches').prop('checked', false);

    $('#customSwitches').bind('change', function () {
        if ($(this).is(':checked')) {
            $('.valor-venta').each(function() {
                if (Date.parse($(this).parent().children('.slot-fecha').text()) > Date.parse('2020-09-15')) {
                    let valor_con_imp_pais = (parseFloat($(this).text().replace(",", ".")) * 1.65).toFixed(2).toString().replace(".",",")
                    $(this).html(valor_con_imp_pais)
                } else {
                    let valor_con_imp_pais = (parseFloat($(this).text().replace(",", ".")) * 1.3).toFixed(2).toString().replace(".",",")
                    $(this).html(valor_con_imp_pais)
                }
            });
        } else {
            $('.valor-venta').each(function() {
                if (Date.parse($(this).parent().children('.slot-fecha').text()) > Date.parse('2020-09-15')) {
                    let valor_sin_imp_pais = (parseFloat($(this).text().replace(",", ".")) / 1.65).toFixed(2).toString().replace(".",",")
                    $(this).html(valor_sin_imp_pais)
                } else {
                    let valor_con_imp_pais = (parseFloat($(this).text().replace(",", ".")) / 1.3).toFixed(2).toString().replace(".",",")
                    $(this).html(valor_con_imp_pais)
                }
            });
        }
     });

     // Botones para descargar las tablas

     $("#spreadsheet").click(function(){
        if($("#customSwitches").is(':checked'))
            $("#tabla-cotizaciones").table2excel({
                // exclude CSS class
                exclude: ".noExl",
                name: "Worksheet Name",
                filename: "Cotizaciones "+$("#table-bank-name").html()+" hasta "+$("td:first").html()+"+impPAIS"+".xls", //do not include extension
                fileext: ".xls" // file extension
         }); 
         else
         $("#tabla-cotizaciones").table2excel({
            // exclude CSS class
            exclude: ".noExl",
            name: "Worksheet Name",
            filename: "Cotizaciones "+$("#table-bank-name").html()+" hasta "+$("td:first").html()+".xls", //do not include extension
            fileext: ".xls" // file extension
      });
    });

    $("#csv").click(function(){
        if($("#customSwitches").is(':checked'))
            $("#tabla-cotizaciones").csvExport({
                title: "Cotizaciones "+$("#table-bank-name").html()+" hasta "+$("td:first").html()+"+impPAIS"+".csv", //do not include extension
         }); 
         else
         $("#tabla-cotizaciones").csvExport({
            title: "Cotizaciones "+$("#table-bank-name").html()+" hasta "+$("td:first").html()+".csv", //do not include extension
      });
    });

    // Por una cuestión de Django, el nombre del banco Nación se renderea sin tilde porque es el nombre que tiene en los modelos... Vamos a acomodarlo:
    if ($("#table-bank-name").html() == "Nacion")
        $("#table-bank-name").html("Nación")
    
    if ($("#dashboard-nombre-banco").html() == "Nacion")
        $("#dashboard-nombre-banco").html("Nación")

});