var DatoGen = [];
var DatoCPN = []; //AQUI SE JUNTAN LOS DATOS

var contenidodatoscpn; //se guarda como texto
var contenidodatosgen;

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

function separargen(){ //CREO QUE SE ESTAN TRABAJANDO COMO TEXTO, FALTA PASARLO A NUMEROS
    var auxa = contenidodatosgen.split('\r\n'); //separa los datos por conjunto
    //var cont = 0; //AUXILIAR PARA COMPROBACION DE ERRORES creo que no sera utilizado
    var contlen = auxa.length;
    console.log(contlen);
    console.log(auxa);
    
    for(var i = 0; i < contlen; i++){ //separa los datos
        var aux = auxa[i].split(';');
        var contlenb = aux.length;
        if(contlenb === 3 && aux[1] > 0 && aux[1] % 1 === 0){ //comprueba que esten los 3 datos de cada conjunto y que el número correspondiente sea mayor que 0 y entero
            DatoGen[i] = aux;                                   //FALTA AGREGAR REVISION A COORDENADAS
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO"); //FALTA LA COMPROBACIÓN PARA VER CUAL DATO SE INGRESO MAL
        }
        console.log(contlenb);
        console.log(DatoGen);
    }
    //FALTA PASAR TEXTO A NÚMEROS
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

function separarcpn(){ //CREO QUE SE ESTAN TRABAJANDO COMO TEXTO, FALTA PASARLO A NUMEROS
    var auxa = contenidodatoscpn.split('\r\n'); //separa los datos por conjunto
    //var cont = 0; //AUXILIAR PARA COMPROBACION DE ERRORES creo que no se usara
    var contlen = auxa.length;
    console.log(contlen);
    console.log(auxa);
    
    for(var i = 0; i < contlen; i++){ //separa los datos
        var aux = auxa[i].split(';');
        var contlenb = aux.length;
        if(contlenb === 3 && aux[0] > 0 && aux[0] % 1 === 0 && aux[1] > 0 && aux[1] % 1 === 0 && aux[2] <= 1000 && aux[2] >= 0 && aux[2] % 1 === 0){ //comprueba los datos del conjunto
            DatoCPN[i] = aux;
        }
        else{
            console.log("ALGUN DATO ESTA MAL INGRESADO"); //FALTA LA COMPROBACIÓN PARA VER CUAL DATO SE INGRESO MAL
        }
        console.log(contlenb);
        console.log(DatoCPN);
    }
    
    //FALTA PASAR TEXTO A NÚMEROS
}

function mensaje(){ //FUNCIÓN TEMPORAL PARA TEST
    if(DatoGen !== undefined && DatoCPN !== undefined){
        console.log(DatoGen);
        console.log(DatoCPN);
    }
    else{
        console.log("NULL");
    }
}

window.onload = async ()=>{ //CREO QUE ESTA OK
  var botonFinalizar = document.getElementById("finalizar");

  botonFinalizar.addEventListener("click", function() {
      mensaje();
  });
};