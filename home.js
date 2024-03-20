const totalCartas=20
let cards=[]
let selectCards=[]
let valueCards=[]
let Movi=0
let intentos=0
let puntos=0
let temporizador=false
let timer=60
let tiempoAcabado=null



let MostrarAciertos=document.getElementById('puntos')
let MostrarDesaciertos=document.getElementById('intentos')
let MostrarTiempo=document.getElementById('tiempo')

let cardsss=' <div class="card"><div class="back"></div><div class="face"></div></div>'

/*funcion del juego*/

function contarTiempo(){
    tiempoAcabado = setInterval(()=>{
        timer--;
        MostrarTiempo.innerHTML = 'Tiempo: ' + timer ;
        if(timer == 0){
            clearInterval(tiempoAcabado)
            cardsBloqueadas();
        }
    },1000);
}


function activate(e){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    if(Movi<2){
        if((!selectCards[0] || selectCards[0] !== e.target) && !e.target.classList.contains('active')){
            e.target.classList.add('active');
            selectCards.push(e.target);
            if(++Movi==2){
                if(selectCards[0].querySelectorAll('.face')[0].innerHTML == selectCards[1].querySelectorAll('.face')[0].innerHTML){
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
            }
        }
    }
}

/*numeros aleatorios*/
function numeroRandom(){
    let random=Math.floor(Math.random()*totalCartas*0.5)
    let values=valueCards.filter(value => value === random)
    if(values.length<2){
        valueCards.push(random)
    }else{
        numeroRandom()
    }
}

/*mostrar cartas*/
for(let i=0;i<totalCartas;i++){
    let div = document.createElement('div')
    div.innerHTML = cardsss;
    cards.push(div)
    document.querySelector('#game').append(cards[i])
    numeroRandom()
    cards[i].querySelectorAll('.face')[0].innerHTML = valueCards[i]
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate)
}
