const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const listaBotoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const conteudoStartPause = document.querySelector('#start-pause span')//seleciona o span do botão start-pause
const imagembtStartPause = document.querySelector('.app__card-primary-butto-icon')
//const iconePausa = new Icone('./imagens/pause.png')

const divTempo = document.querySelector('#timer')

//manipulando audio
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const somPausar = new Audio('./sons/pause.mp3') //referente ao som da pausa
const somPlay = new Audio('./sons/play.wav')
const somBeep = new Audio('./sons/beep.mp3')
musica.loop = true //ele quer que a música fique tocando o tempo inteiro
musica.volume = 0.1 // volume: propriedade que retorna ou define o nível de volume do áudio, variando de 0 a 1.
musica.currentTime = 10 // Move para 10 segundos no áudio


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){//se tiver pausado ele vai dar play
        musica.play() //inicia a reprodução do áudio;
        
    }
    else{//se não tiver pausado pausa
        musica.pause() //pausa a produção do audio
    }
} )

//temporizador
let tempoDecorridoEmSegundos = 1500
let intervaloId = null



/* forma mais fácil de fazer sem função */
 focoBt.addEventListener('click', () => { /* addEventListener adiciona um evento passsou click vai ser no 
// evento de click */
    //  html.setAttribute('data-contexto', 'foco')/* setAtribute passa o atributo que será alterado e qual novo valor */
    //  banner.setAttribute('src', './imagens/foco.png')
    alterarContexto('foco')
    focoBt.classList.add('active')
    // curtoBt.classList.remove('active')
    // longoBt.classList.remove('active')
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
 })

 curtoBt.addEventListener('click', () => {
    //  html.setAttribute('data-contexto', 'descanso-curto')
    //  banner.setAttribute('src', './imagens/descanso-curto.png')
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    // focoBt.classList.remove('active')
    // longoBt.classList.remove('active')
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
 })

 longoBt.addEventListener('click', () => {
    //  html.setAttribute('data-contexto', 'descanso-longo')
    //  banner.setAttribute('src', './imagens/descanso-longo.png')
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    // curtoBt.classList.remove('active')
    // focoBt.classList.remove('active')
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
 })

function alterarContexto(contexto){
    listaBotoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            
            // .innerHTML insere um texto no html até mesmo formatado 
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <br>
            <strong class="app__title-strong">Faça sua pausa curta!</strong>`
            break;

        case "descanso-longo":
            
            titulo.innerHTML = `
            Hora de voltar à superfície.
            <br>
            <strong class="app__title-strong">Faça sua pausa longa!</strong>`
            break;

    
        default:
            break;
    }
}

const contagemRegressiva = () => {
   if(tempoDecorridoEmSegundos <= 0){
    somBeep.play()
    alert('tempo finalizado')
    zerar()
    return //interompe o código
   }else{
    tempoDecorridoEmSegundos -= 1
    console.log(`Temporizador:`+tempoDecorridoEmSegundos)
    mostrarTempo()
   }
   
}

function iniciarOuPausar(){
    if(intervaloId){//pausa o contador
        somPausar.play()
        imagembtStartPause.setAttribute('src', './imagens/pause.png')//como alterar um atributo 
        zerar()
        return
    }else{
        somPlay.play()
        imagembtStartPause.setAttribute('src', './imagens/play_arrow.png')
        conteudoStartPause.textContent = "pausar"
        intervaloId = setInterval(contagemRegressiva, 1000)
    }
    
    
    
}

//função feita para realmente parar o contador
function zerar(){
    clearInterval(intervaloId)//interrompe a execução de um código
    conteudoStartPause.textContent = "Começar"
    intervaloId = null
    
    
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    divTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
