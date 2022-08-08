

let currentDate;
let dias_semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
let year = document.getElementById("txt_year");
let btn = document.getElementById('btn');

year.value = new Date().getFullYear();


 
/**
 * Crea un div por cada mes 
 * llama a la función creartabla que creara una tabla dentro de cada div
 */
function crearMeses() {
    for (let a = 1; a <= 12; a++) {
        let cont_tabla = document.createElement("div");
        cont_tabla.setAttribute("id", "div-mes");
        cont_tabla.setAttribute("class", "div-mes");
        crearTabla(cont_tabla, getNombre(a), a);
        document.getElementById("container-tabla").appendChild(cont_tabla);
    }
}


/**
 * Crea una tabla para cada mes 
 * llama a rellenar cabecera la cual rellena la cabecera de la tabla con los dias de la semana
 * @param {*} mes número del mes
 * @param {*} nombre nombre del mes
 */
function crearTabla(mes, nombre, a){
    let tabla = document.createElement("table");
    let nombre_mes = document.createElement("caption");
    let contenido = document.createTextNode(nombre); 
    nombre_mes.appendChild(contenido);
    tabla.appendChild(nombre_mes);
    rellenarTablaCabecera(tabla);
    rellenarDias(tabla, a);
    mes.appendChild(tabla);
}


function rellenarTablaCabecera(tabla){
    let fila = document.createElement("tr");

    for(const dia of dias_semana){
    let cabecera = document.createElement("th");
       let d = document.createTextNode(dia);
       cabecera.appendChild(d);
       fila.appendChild(cabecera);
    }
    tabla.appendChild(fila);
}



function rellenarDias(tabla, a){
    let numero_dias = getTotalDays(a);
    let espacios = startDay(a)-1;
    
    let contador = 0;
    let d = 1;
    let fila;
    let columna;
    let dia;
    for (let f = 0; f < 6; f++) {
      fila = document.createElement("tr");
        for (let c = 0; c < 7; c++) {
            columna = document.createElement("td");
            if (contador <= espacios || d > numero_dias) {
                //crear espacio vacio
                dia = document.createTextNode(".");
                columna.appendChild(dia);
                contador++;
            } else {
                dia = document.createTextNode(d);
                columna.appendChild(dia);
                d++;
            }
            fila.appendChild(columna);
        }
        tabla.appendChild(fila);
    }
}

function getNombre(n){
    switch(n){
        case 1: return "Enero"; 
        case 2: return "Febrero"; 
        case 3: return "Marzo"; 
        case 4: return "Abril"; 
        case 5: return "Mayo"; 
        case 6: return "Junio"; 
        case 7: return "Julio"; 
        case 8: return "Agosto"; 
        case 9: return "Septiembre"; 
        case 10: return "Octubre"; 
        case 11: return "Noviembre"; 
        case 12: return "Diciembre"; 
    }
}


/*total dias de mes*/
function getTotalDays(month) {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      return 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      return 30;
    } else {
      return isLeap() ? 29 : 28;
    }
  }
  

  /*Anyo bisiesto*/
  function isLeap() {
    return ((currentDate.getFullYear() % 100 !== 0) && (currentDate.getFullYear() % 4 == 0)
      || (currentDate.getFullYear() % 400 == 0));
  }
  

  /*dia que empieza el mes*/
  function startDay(monthNumber) {
    let start = new Date(currentDate.getFullYear() + '-' + monthNumber + '-' + 1);
    return ((start.getDay() - 1) == -1) ? 6 : start.getDay() - 1;
  }



  function nuevaFecha(){
    //remover toda la tabla que hubiera
    let element = document.getElementById("container-tabla");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let nuevo_year = year.value;
    currentDate = new Date(nuevo_year + '-' + 01 + '-' + 01);
    crearMeses();
  }


nuevaFecha();

btn.addEventListener('click', () => nuevaFecha());

