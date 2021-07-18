export function calculohoja(auxcentro,auxpunto,DatoCPN,contlenb){
    var puntoscentro=auxcentro,puntosventa=auxpunto;
    var Datos_usuario=DatoCPN;
    var insertarTerminalv2 = document.querySelector(".terminal");
    var productos=[];
    var cordenadas_inicio=[];
    var cordenadas_final=[];
    var cordenadas_resultadoX=[];
    var cordenadas_resultadoY=[];
    var cordenadas_puntos=[];
    var distancias=[];
    var distancias_recorridas=[];
    var camiones=1;
    var Datos_usuariov2=[]
    var aux=0;
    var contador_cordenadas=0;
    var x1,x2,y1,y2,cordenadas_aux=0;
    var Largo_j=(Object.keys(Datos_usuario[0]).length)
    console.log(`Valor del largo j ${Largo_j}`);
    for(let i=0;i<=(Object.keys(Datos_usuario).length);i++){
        distancias_recorridas[i]=0;
        cordenadas_puntos[i]=0;
        Datos_usuariov2[i]=[]
        for(let j=0;j<Largo_j;j++){
            Datos_usuariov2[i][j]=0;
        }
    }
    for(let i=0;i<(Object.keys(Datos_usuario).length);i++){
        for(let j=0;j<Largo_j;j++){
            Datos_usuariov2[i][j]=Datos_usuario[i][j];
            if(i==(Object.keys(Datos_usuario).length)){
                Datos_usuariov2[i+1][j]=0;
            }
        }
    }
    console.log('Entro a la funcion');
    console.log((Object.keys(puntoscentro[0]).length));
    console.log((Object.keys(puntoscentro).length));
    console.log(puntosventa);
    console.log(puntoscentro);
    console.log(Object.keys(Datos_usuario).length);
    console.log(Object.keys(Datos_usuario[0]).length);
    let z=0;
    let zz=0;
    let zzz=0;
    for(let i=0;i<(Object.keys(Datos_usuario).length);i++){
        for(let j=0;j<(Object.keys(Datos_usuario[i]).length);j++){

            if(j==0){
                for(let a=0;a<(Object.keys(puntoscentro).length);a++){
                    for(let b=0;b<(Object.keys(puntoscentro[a]).length);b++){
                        if(Datos_usuario[i][j]==puntoscentro[a][b]){
                            console.log(puntoscentro[a][b+1]);
                            cordenadas_inicio[z]=puntoscentro[a][b+1]
                           z++;
                        }
                    }
                }         
            }
             else if(j==1){
                for(let a=0;a<(Object.keys(puntosventa).length);a++){
                    for(let b=0;b<(Object.keys(puntosventa[a]).length);b++){
                        if(Datos_usuario[i][j]==puntosventa[a][b]){
                            console.log(puntosventa[a][b+1]);
                            cordenadas_final[zz]=puntosventa[a][b+1];
                            cordenadas_puntos[zz]=puntosventa[a][b+1];
                           zz++;
                        }
                    }
                }       
            }
             else if(j==2){
                productos[zzz]=Datos_usuario[i][j];
                zzz++;
            }
        } 
    }
    console.log(cordenadas_inicio);
    console.log(cordenadas_final);
    console.log(productos);
    console.log(cordenadas_puntos);
    let contadorX=0;
    let contadorY=0;
    for(let i=0;i<Object.keys(cordenadas_inicio).length;i++){
        for(let j=0;j<Object.keys(cordenadas_inicio[i]).length;j++){
            if(j==0){
                console.log(cordenadas_inicio[i][j]);
                cordenadas_resultadoY[contadorY]=cordenadas_final[i][j]-cordenadas_inicio[i][j];
                contadorY++;
            }
            else if(j==1){
                console.log(cordenadas_inicio[i][j]);
                cordenadas_resultadoX[contadorX]=cordenadas_final[i][j]-cordenadas_inicio[i][j];
                contadorX++;
            }
        }
    }
    console.log(cordenadas_resultadoX);
    console.log(cordenadas_resultadoY);

    for(let i=0;i<Object.keys(cordenadas_resultadoX).length;i++){
       distancias[i]=Math.sqrt((cordenadas_resultadoX[i] * cordenadas_resultadoX[i]) + (cordenadas_resultadoY[i] * cordenadas_resultadoY[i]));
    }
    console.log(distancias);
        console.log(Datos_usuariov2);
        distancias_recorridas[0]=distancias[0];
        let adv =` ----------------------------------- <br>`;
        insertarTerminalv2.innerHTML += adv;
        adv = `El primer camion empieza su recorrido <br>`;
        console.log("El primer camion empieza su recorrido");
        insertarTerminalv2.innerHTML += adv;
        adv=`<br>`
        insertarTerminalv2.innerHTML += adv;
        for(let i=0;i<(Object.keys(Datos_usuariov2).length);i++){//0 1 2 3}
            console.log(`Valor del contador I ${i}`);
            if(i==(Object.keys(Datos_usuario).length)){
                break;
            }
            for(let j=0;j<(Object.keys(Datos_usuariov2[i]).length);j++){ //Datos_usuario
                console.log(`Valor del contador J ${j}`);
                
                console.log(Datos_usuariov2);
                if(i==(Object.keys(Datos_usuariov2).length)){
                    break;
                }
                if(j==0){
                    if(aux==0){
                    adv = `Saldra del centro ${Datos_usuariov2[i][j]} <br>`;
                    console.log(`Saldra del centro ${Datos_usuariov2[i][j]}`);//1 //
                    insertarTerminalv2.innerHTML += adv;
                    }
                    else if(aux!=0){
                        adv=`Saldra del puesto ${Datos_usuariov2[i-1][j+1]} <br>`;
                        console.log(`Saldra del puesto ${Datos_usuariov2[i-1][j+1]}`);
                        insertarTerminalv2.innerHTML += adv;
                    }
                }
                else if(j==1){
                    adv=`Para ir al puesto ${Datos_usuariov2[i][j]} <br>`
                    insertarTerminalv2.innerHTML += adv;
                    console.log(`Para ir al puesto ${Datos_usuariov2[i][j]}`);//2 //

                }
                else if(j==2){
                    adv=`Para transportar  ${Datos_usuariov2[i][j]} productos <br>`
                    insertarTerminalv2.innerHTML += adv;
                    console.log(`Para transportar  ${Datos_usuariov2[i][j]} productos`);//1000
                    adv=`El camion #${camiones} recorrio una distancia de ${distancias_recorridas[i]} <br>`
                    insertarTerminalv2.innerHTML += adv;
                    console.log(`El camion #${camiones} recorrio una distancia de ${distancias_recorridas[i]}`);
                    aux=Datos_usuariov2[i][j];
                    if(Datos_usuariov2[i+1][j]==0 || Datos_usuariov2[i][j+1]==0 || Datos_usuariov2[i+1][j+1]==0){
                        break;
                    }
                    else if(aux<=1000 && (Datos_usuariov2[i+1][j]+aux)<=1000){
                        adv=`El camion numero #${camiones} tiene espacio disponible para el siguente envio <br>`
                        insertarTerminalv2.innerHTML += adv;
                        console.log(`El camion numero #${camiones} tiene espacio disponible para el siguente envio`);
                        adv=`<br>`
                        insertarTerminalv2.innerHTML += adv;
                        x1=cordenadas_puntos[i][contador_cordenadas];
                        y1=cordenadas_puntos[i][contador_cordenadas+1];
                        x2=cordenadas_puntos[i+1][contador_cordenadas];
                        y2=cordenadas_puntos[i+1][contador_cordenadas+1];
                        cordenadas_aux=(obtenerdistancia(x1,y1,x2,y2));
                        distancias_recorridas[i+1]=distancias[i]+cordenadas_aux;
                        aux=aux+Datos_usuariov2[i][j];
                    }
                    else{
                        camiones++;
                        adv=`El camion no tiene capacidad para hacer la siguente entrega, <br> Por lo tanto el camion #${camiones} se enviara como reemplazo <br>`
                        insertarTerminalv2.innerHTML += adv;
                        adv=`<br>`
                        insertarTerminalv2.innerHTML += adv;
                        console.log(`El camion no tiene capacidad para hacer la siguente entrega, <br> Por lo tanto el camion #${camiones} se enviara como reemplazo`);
                        distancias_recorridas[i+1]=distancias[i+1];
                        aux=0;
                    }
                }

            }
        }
    adv=`<br>`
    insertarTerminalv2.innerHTML += adv;
    adv=`Todos los camiones han regresado de manera satisfactoria, hasta mañana <br>`
    insertarTerminalv2.innerHTML += adv;
    console.log("Todos los camiones han regresado de manera satisfactoria, hasta mañana");
}



function obtenerdistancia(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    return(Math.sqrt(x * x + y * y));
}




