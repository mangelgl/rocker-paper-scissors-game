const paperButton = document.querySelector('#paper');
const rockButton = document.querySelector('#rock');
const scissorsButton = document.querySelector('#scissors');
const score = document.querySelector('#score');
const playAgainButton = document.querySelector('#playAgain');
let userHand, cpuHand, vecesJugado = 0, colorBotonPlayAgain;

const rulesButton = document.querySelector('.rules');
const modalWindow = document.querySelector('#ventanaModal');
const closeButton = document.querySelector('#close-modal');

score.innerHTML = '<span>0</span>';

/**
 * Ventana modal
 */
rulesButton.addEventListener('click', () => {
    modalWindow.classList.add('flex');
});

closeButton.addEventListener('click', () => {
    modalWindow.classList.remove('flex');
    modalWindow.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener('click',function(event) {
    if (event.target === modalWindow) {
        modalWindow.classList.remove('flex');
    }
});

/**
 * LÓGICA DE JUEGO
 */
[paperButton, rockButton, scissorsButton].forEach( btn => {
    btn.addEventListener('click', () => {
        userHand = btn.id, 
        cpuHand = generateRandomHand(),
        vecesJugado += 1;
        selectWinner(userHand, cpuHand);
    });
});

playAgainButton.addEventListener('click', () => {
    document.querySelector('#userHand').classList.remove(`${userHand}`);
    document.querySelector('#cpuHand').classList.remove(`${cpuHand}`);
    document.querySelector('.playAgainText').classList.remove(`${colorBotonPlayAgain}TextColor`);
    cambiarTablero('seleccion');
});

const hands = ["rock", "paper", "scissors"];
const winners = {
    "rock" : "scissors",
    "paper" : "rock",
    "scissors" : "paper"
};

function selectWinner(userHand, cpuHand) {
    const resultText = document.querySelector('.result-text');
    const playAgainText = document.querySelector('.playAgainText');

    if ( userHand === cpuHand ) {
        colorBotonPlayAgain = 'win';
        resultText.innerText = "DRAW";
        playAgainText.classList.add('winTextColor');
    }
    
    if ( winners[userHand] === cpuHand ) {
        cambiarScore('w');
        colorBotonPlayAgain = 'win';
        resultText.innerText = 'YOU WIN';
        playAgainText.classList.add('winTextColor');
    }

    if ( winners[cpuHand] === userHand ) {
        cambiarScore('l');
        colorBotonPlayAgain = 'lose';
        resultText.innerText = 'YOU LOSE';
        playAgainText.classList.add('loseTextColor');
    }

    cambiarTablero('juego', userHand, cpuHand);
}

function generateRandomHand() {
    return hands[Math.floor(Math.random()*3)];
}

function cambiarScore(resultado) {
    const anteriorScore = parseInt(score.innerText);
    if ( resultado === 'w' ) {
        score.innerText = anteriorScore + 1;
    }
    if ( resultado === 'l' && anteriorScore === 0 ) {
        score.innerText = anteriorScore;
    }
    if ( resultado === 'l' && anteriorScore !== 0 ) {
        score.innerText = anteriorScore - 1;
    }
}

function cambiarTablero(modo, userHand, cpuHand) {
    let tableroJuego = document.querySelector('.result-box'),
    tableroSeleccion = document.querySelector('.game-box');

    if ( modo === 'juego' ) {
        document.querySelector('.game-container').style.background = 'none';
        cambiarSeleccion(userHand, cpuHand);
        tableroJuego.style.display = 'flex';
        tableroSeleccion.style.display = 'none';
    }

    if ( modo === 'seleccion' ) {
        document.querySelector('.game-container').style.background = 'no-repeat center url("./img/bg-triangle.svg")';
        tableroJuego.style.display = 'none';
        tableroSeleccion.style.display = 'block';
    }

    document.querySelector('.result-text').classList.add('tracking-in-expand-fwd');
}

function cambiarSeleccion(userHand, cpuHand) {
    let userBox = document.querySelector('#userHand'),
    userImg = document.querySelector('#userHand img'),
    cpuBox = document.querySelector('#cpuHand'),
    cpuImg = document.querySelector('#cpuHand img');

    userBox.classList.add(userHand);
    cpuBox.classList.add(cpuHand);
    userImg.src = `img/icon-${userHand}.svg`;
    cpuImg.src = `img/icon-${cpuHand}.svg`;
}