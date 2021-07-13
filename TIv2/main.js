var DatoGen = []; //AQUI SE JUNTAN LOS DATOS
var auxcop = []; //texto
var auxnum = []; //entero
var auxcoor = []; //array de enteros

var DatoCPN = []; //AQUI SE JUNTAN LOS DATOS
var auxc = []; //entero usa numero para identificar
var auxp = []; //entero usa numero para identificar
var auxn = []; //entero

var contenidodatoscpn; //se guarda como texto
var contenidodatosgen; //se guarda como texto

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
        aux[1] = parseInt(aux[1]);
        aux[2] = aux[2].split(',');
        aux[2][0] = parseInt(aux[2][0]);
        aux[2][1] = parseInt(aux[2][1]);
        if(contlenb === 3 && (aux[0] === 'C' || aux[0] === 'P') && aux[1] > 0 && aux[1] % 1 === 0 && aux[2][0] % 1 === 0 && aux[2][1] % 1 === 0){ //comprueba que esten los 3 datos de cada conjunto y que el número correspondiente sea mayor que 0 y entero
            auxcop[i] = aux[0];
            auxnum[i] = aux[1];
            auxcoor[i] = aux[2];
            DatoGen[i] = aux;
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO"); //FALTA LA COMPROBACIÓN PARA VER CUAL DATO SE INGRESO MAL
        }
        console.log(contlenb);
        console.log(DatoGen);
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
            auxc[i] = aux[0];
            auxp[i] = aux[1];
            auxn[i] = aux[2];
            DatoCPN[i] = aux;
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO"); //FALTA LA COMPROBACIÓN PARA VER CUAL DATO SE INGRESO MAL
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
    if(coorden.length === 2 && coorden[0] % 1 === 0 && coorden[1] % 1 === 0){
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
        console.log(DatoGen);
    }
    else{
        console.log("ERROR");
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