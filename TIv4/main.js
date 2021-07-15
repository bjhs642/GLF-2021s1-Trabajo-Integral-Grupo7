var DatoGen = []; //AQUI SE JUNTAN LOS DATOS, EL INDICE ES EL MISMO QUE PARA LAS VARIABLES AUXILIARES
var auxcop = []; //texto GUARDA LISTADO C o P, UTILIZAR SEGUN INDICE
    var auxcentro = []; //GUARDA SOLO LOS CENTROS
    var auxpunto = []; //GUARDA SOLO LOS PUNTOS
var auxnum = []; //entero GUARDA NUMERO DE C o P, UTILIZAR SEGUN INDICE
var auxcoor = []; //array de enteros GUARDA COORDENADAS, SEGUN INDICE

var auxlargo; //VARIABLE TEMPORAL USO BREVE

var DatoCPN = []; //AQUI SE JUNTAN LOS DATOS, EL INDICE ES EL MISMO QUE PARA LAS VARIABLES AUXILIARES
var auxc = []; //entero usa numero para identificar CENTRO
var auxp = []; //entero usa numero para identificar PUNTO
var auxn = []; //entero CANTIDAD

let insertarTerminal = document.querySelector(".terminal");
let adv;

var contenidodatoscpn; //se guarda como texto
var contenidodatosgen; //se guarda como texto

import { calculohoja } from './hojaderuta.js'

/////////CORREGIR ERROR LINEA 212

document.getElementById('datoscpn')
  .addEventListener('change', leerArchivodatoscpn, false);
  
document.getElementById('datosgen')
  .addEventListener('change', leerArchivodatosgen, false);
  
function leerArchivodatosgen(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    contenidodatosgen = e.target.result;
    separargen();
    mostrarContenidogen();
    calculohoja(auxcentro,auxpunto);//Calcula la hoja de ruta que se pida
  };
  lector.readAsText(archivo);
}

function mostrarContenidogen() {
  var elemento = document.getElementById('contenido-archivogen');
  elemento.innerHTML = contenidodatosgen;
}

function separargen(){
    var auxa = contenidodatosgen.split('\r\n'); //separa los datos por conjunto
    //var cont = 0; //AUXILIAR PARA COMPROBACION DE ERRORES creo que no sera utilizado
    var contlen = auxa.length;
    console.log(contlen);
    console.log(auxa);
    
    for(var i = 0; i < contlen; i++){ //separa los datos
        var aux = auxa[i].split(';');
        var contlenb = aux.length;
        console.log(aux);
        console.log("Valor de Aux.lenght");
        console.log(aux.length);
        aux[1] = parseInt(aux[1]);
        aux[2] = aux[2].split(',');
        aux[2][0] = parseInt(aux[2][0]);
        aux[2][1] = parseInt(aux[2][1]);
        var contlencor = aux[2].length;
        if(contlenb === 3 && (aux[0] === 'C' || aux[0] === 'P') && aux[1] > 0 && aux[1] % 1 === 0 && aux[2][0] % 1 === 0 && aux[2][1] % 1 === 0 && contlencor === 2){ //comprueba que esten los 3 datos de cada conjunto y que el número correspondiente sea mayor que 0 y entero
            auxlargo = DatoGen.length;
            auxcop[auxlargo] = aux[0];
                if(auxcop[auxlargo] === 'C'){
                    var largoc = auxcentro.length;
                    auxcentro[largoc] = aux;
                }
                else{
                    var largop = auxpunto.length;
                    auxpunto[largop] = aux;
                }
            auxnum[auxlargo] = aux[1];
            auxcoor[auxlargo] = aux[2];
            DatoGen[auxlargo] = aux;
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO");
           
            adv = `ERROR: "EL DATO EN LA LINEA ${i+1} ESTA MAL INGRESADO" <br>`;
            insertarTerminal.innerHTML += adv; 
            
            if(contlenb > 3 || contlenb < 3){
                adv = `ERROR: "SE DEBEN INGRESAR 3 DATOS POR FILA" <br>`;
                insertarTerminal.innerHTML += adv; 
            }
            else if(aux[0] !== 'C' && aux[0] !== 'P'){
                adv = `ERROR: "SOLO INGRESAR "C" O "P"" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[1] <= 0){
                adv = `ERROR: "EL NÚMERO DE CADA "C" O "P" DEBE SER MAYOR QUE 0" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[1] % 1 !== 0){
                adv = `ERROR: "EL NÚMERO DE CADA "C" O "P" DEBE SER ENTERO" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[2][0] % 1 !== 0 || aux[2][1] % 1 !== 0){
                adv = `ERROR: "LA COORDENADA DEBE SER EN NÚMEROS ENTEROS" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(contlencor > 2 || contlencor < 2){
                adv = `ERROR: "LA COORDENADA DEBE SER X,Y" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
        }
        console.log(contlenb);
        console.log(DatoGen);
        console.log("CENTROS");
        console.log(auxcentro);
        console.log("PUNTOS");
        console.log(auxpunto);
    }
}

function leerArchivodatoscpn(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    contenidodatoscpn = e.target.result;
    separarcpn();
    mostrarContenidocpn();
  };
  lector.readAsText(archivo);
}

function mostrarContenidocpn() {
  var elemento = document.getElementById('contenido-archivocpn');
  elemento.innerHTML = contenidodatoscpn;
}

function separarcpn(){
    var auxa = contenidodatoscpn.split('\r\n'); //separa los datos por conjunto
    //var cont = 0; //AUXILIAR PARA COMPROBACION DE ERRORES creo que no se usara
    var contlen = auxa.length;
    console.log(contlen);
    console.log(auxa);
    
    for(var i = 0; i < contlen; i++){ //separa los datos
        var aux = auxa[i].split(';');
        var contlenb = aux.length;
        aux[0] = parseInt(aux[0]);
        aux[1] = parseInt(aux[1]);
        aux[2] = parseInt(aux[2]);
        if(contlenb === 3 && aux[0] > 0 && aux[0] % 1 === 0 && aux[1] > 0 && aux[1] % 1 === 0 && aux[2] <= 1000 && aux[2] >= 0 && aux[2] % 1 === 0){ //comprueba los datos del conjunto
            auxlargo = DatoCPN.length;
            auxc[auxlargo] = aux[0];
            auxp[auxlargo] = aux[1];
            auxn[auxlargo] = aux[2];
            DatoCPN[auxlargo] = aux;
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO");
           
            adv = `ERROR: "EL DATO EN LA LINEA ${i+1} ESTA MAL INGRESADO" <br>`;
            insertarTerminal.innerHTML += adv; 
            
            if(contlenb > 3 || contlenb < 3){
                adv = `ERROR: "SE DEBEN INGRESAR 3 DATOS POR FILA" <br>`;
                insertarTerminal.innerHTML += adv; 
            }
            else if(aux[0] <= 0){
                adv = `ERROR: "EL NÚMERO DE "C" DEBE SER MAYOR QUE 0" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[0] % 1 !== 0){
                adv = `ERROR: "EL NÚMERO DE "C" DEBE SER ENTERO" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[1] <= 0){
                adv = `ERROR: "EL NÚMERO DE "P" DEBE SER MAYOR QUE 0" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[1] % 1 !== 0){
                adv = `ERROR: "EL NÚMERO DE "P" DEBE SER ENTERO" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[2] > 1000){
                adv = `ERROR: "LA CANTIDAD DE PRODUCTOS DEBE SER MENOR QUE 1000" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[2] < 0){
                adv = `ERROR: "LA CANTIDAD DE PRODUCTOS DEBE SER MAYOR O IGUAL A 0" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
            else if(aux[2]% 1 !== 0){
                adv = `ERROR: "LA CANTIDAD DE PRODUCTOS DEBE SER ENTERA" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
        }
        console.log(contlenb);
        console.log(DatoCPN);
    }
}

function agregar(){
    var cenopun = document.getElementById('cop').value;
    var aux = document.getElementById('coord').value;
    var cont = 0;
    console.log(cenopun);
    console.log(aux);
    
    var coorden = aux.split(',');
    coorden[0] = parseInt(coorden[0]);
    coorden[1] = parseInt(coorden[1]);
    //COMPROBACION DE DATOS
    if(coorden.length === 2 && coorden[0] % 1 === 0 && coorden[1] % 1 === 0){ //CORREGIR NÚMERO IDENTIFICADOR QUE EN ALGUNOS CASOS FALLA
        console.log("OK");
        var auxa = DatoGen.length;
            for(let i = 0; i<auxa; i++){
                if(auxcop[i] === cenopun){
                    cont++;
                }
            }
            cont = cont+1;
            console.log(cont);
            var arraux = [cenopun, cont, coorden];
        DatoGen[auxa] = arraux;
        
        if(cenopun === 'C'){
            var largoc = auxcentro.length;
            auxcentro[largoc] = arraux;
        }
        else{
            var largop = auxpunto.length;
            auxpunto[largop] = arraux;
        }
        console.log(DatoGen);
        console.log("CENTROS");
        console.log(auxcentro);
        console.log("PUNTOS");
        console.log(auxpunto);
    }
    else{
        console.log("ERROR");
        adv = `ERROR: "ERROR AL AGREGAR EL DATO" <br>`;
        insertarTerminal.innerHTML += adv; 
                
        if(coorden.length < 2 || coorden.length > 2){
                adv = `ERROR: "LA COORDENADA DEBE SER X,Y" <br>`;
                insertarTerminal.innerHTML += adv; 
            }
            else if(coorden[0] % 1 !== 0 || coorden[1] % 1 !== 0){
                adv = `ERROR: "LA COORDENADA DEBE SER EN NÚMEROS ENTEROS" <br>`;
                insertarTerminal.innerHTML += adv;     
            }
    }
}

function mensaje(){ //FUNCIÓN TEMPORAL PARA TEST
    if(DatoGen !== undefined && DatoCPN !== undefined){
        console.log(DatoGen);
        console.log(DatoCPN);
        let insertarTerminal = document.querySelector(".terminal");
        let adv = `DATOS GENERALES (Parametros) <br>`;
        insertarTerminal.innerHTML += adv;
        for(let i = 0; i<DatoGen.length; i++){
            insertarTerminal = document.querySelector(".terminal");
            adv = DatoGen[i];
            insertarTerminal.innerHTML += adv;
            adv = `<br>`;
            insertarTerminal.innerHTML += adv;
        }
        adv = `DATOS DEMANDA DE PRODUCTOS DEL DÍA (Datos) <br>`;
        insertarTerminal.innerHTML += adv;
        for(let i = 0; i<DatoCPN.length; i++){
            insertarTerminal = document.querySelector(".terminal");
            adv = DatoCPN[i];
            insertarTerminal.innerHTML += adv;
            adv = `<br>`;
            insertarTerminal.innerHTML += adv;
        }
    }
    else{
        console.log("NULL");
    }
}

window.onload = async ()=>{ //CREO QUE ESTA OK
  var botonFinalizar = document.getElementById("finalizar");
  var botonAgregar = document.getElementById("agregar");
  
  botonAgregar.addEventListener("click", function() {
      agregar();
  });
  
  botonFinalizar.addEventListener("click", function() {
      mensaje();
  });
};