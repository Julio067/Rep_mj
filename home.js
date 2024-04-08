const totalCartas=20
let cartas=[]
let selectCards=[]
let valueCards=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10]
let Movi=0
let intentos=0
let puntos=0
let temporizador=false
let timer=50
let tiempoAcabado=0

let MostrarAciertos=document.getElementById('puntos')
let MostrarDesaciertos=document.getElementById('intentos')
let MostrarTiempo=document.getElementById('tiempo')
let cardsss=' <div class="carta"><div class="detras"></div><div class="cara"></div></div>'

/*funcion del juego*/
function contarTiempo(){
    tiempoAcabado = setInterval(()=>{
        timer--;
        MostrarTiempo.innerHTML = 'Tiempo: ' + timer + " segundos";
        if(timer == 0){
            setInterval(location.reload())
            alert("LO SIENTO HAS PERDIDO 😥")
        }
    },1000);
}

function mostrarCartas(e){
    /*temporizador*/
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    
    if(Movi<2){
        Movi++
        if(selectCards[0] !== e.target){
            e.target.classList.add('active');
            selectCards.push(e.target);
            if(Movi==2){
                if(selectCards[0].querySelectorAll('.cara')[0].innerHTML == selectCards[1].querySelectorAll('.cara')[0].innerHTML){
                    selectCards[0].removeEventListener('click', mostrarCartas);
                    selectCards[1].removeEventListener('click', mostrarCartas);
                    selectCards=[]
                    Movi=0
                    puntos++
                    MostrarAciertos.innerHTML='Aciertos: '+puntos
                }else{
                    setTimeout(()=>{
                        selectCards[0].classList.remove('active')
                        selectCards[1].classList.remove('active')
                        selectCards=[]
                        Movi=0
                    },600);
                    intentos++
                    MostrarDesaciertos.innerHTML='intentos: '+intentos
                }
                if (puntos == 10){
                    setInterval(location.reload());
                    alert("FELICIDADES GANASTE 🥳")
                   
                }
               
            }
        }
    }
}

/*numeros aleatorios*/
function numeroRandom(n){
    valueCards.sort(()=>Math.random()-0.5)
}
numeroRandom(valueCards)

/*mostrar cartas*/
for(let i=0;i<totalCartas;i++){
    let div = document.createElement('div')
    div.innerHTML = cardsss;
    cartas.push(div)
    document.querySelector('#game').append(cartas[i])
    cartas[i].querySelectorAll('.cara')[0].innerHTML = valueCards[i]
    cartas[i].querySelectorAll('.carta')[0].addEventListener('click', mostrarCartas)
}
