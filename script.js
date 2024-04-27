const hands = ["rock", "paper", "scissors"];
const winners = {
    "rock" : "scissors",
    "paper" : "rock",
    "scissors" : "paper"
};

const paperButton = document.querySelector('#paper');
const rockButton = document.querySelector('#rock');
const scissorsButton = document.querySelector('#scissors');

const score = document.querySelector('#score');
const resultContainer = document.querySelector('.result-container');
const handsContainer = document.querySelector('.game-container');

let gameHands, colorBotonPlayAgain;
const playAgainButton = document.querySelector('#playAgain');
const rulesButton = document.querySelector('.rules');
const modalWindow = document.querySelector('#ventanaModal');
const closeButton = document.querySelector('#close-modal');

/**
 * Ventana modal
 */
rulesButton.addEventListener('click', () => {
    modalWindow.removeAttribute('style');
    modalWindow.classList.add('flex');
});

closeButton.addEventListener('click', () => {
    modalWindow.classList.remove('flex');
    modalWindow.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener('click', function(event) {
    if ( event.target === modalWindow ) {
        modalWindow.style.display = "none";
        modalWindow.classList.remove('flex');
    }
});

/**
 * LÓGICA DE JUEGO
 */

[ paperButton, rockButton, scissorsButton ].forEach( btn => {
    btn.addEventListener('click', () => {
        gameHands = selectHand( btn );
        const result = selectWinner( gameHands );

        cambiarTablero( 'resultado' );
        setTableroGameHands( gameHands );
        setTableroStyles( result, gameHands );
    });
});

playAgainButton.addEventListener('click', () => {
    const userHand = gameHands[0], cpuHand = gameHands[1];
    document.querySelector('#userHand').classList.remove(`${userHand}`);
    document.querySelector('#cpuHand').classList.remove(`${cpuHand}`);
    cambiarTablero( 'seleccion' );
});

function generateRandomHand() {
    return hands[Math.floor(Math.random()*3)];
}

function selectHand( btnHand ) {
    return [ btnHand.id, generateRandomHand() ];
}

function selectWinner( gameHands ) {
    const userHand = gameHands[0], cpuHand = gameHands[1];
    let result;

    if ( userHand === cpuHand ) {
        result = 'D';
    }
    
    if ( winners[userHand] === cpuHand ) {
        result = 'W';
        cambiarScore('W');
    }

    if ( winners[cpuHand] === userHand ) {
        result = 'L';
        cambiarScore('L');
    }

    return result;
}

function cambiarScore( resultado ) {
    const anteriorScore = parseInt(score.innerText);
    if ( resultado === 'W' ) {
        score.innerText = anteriorScore + 1;
    }
    if ( resultado === 'L' && anteriorScore === 0 ) {
        score.innerText = anteriorScore;
    }
    if ( resultado === 'L' && anteriorScore !== 0 ) {
        score.innerText = anteriorScore - 1;
    }
}

function cambiarTablero( modo ) {        
    if ( modo === 'resultado' ) {
        handsContainer.style.display = 'none';
        resultContainer.style.display = 'flex';
    }

    if ( modo === 'seleccion' ) {
        resultContainer.style.display = 'none';
        handsContainer.style.display = 'block';
    }
}

function setTableroGameHands( manos ) {
    const userHand = manos[0], cpuHand = manos[1];
    const userHandContainer = document.querySelector('#userHand'),
    cpuHandContainer = document.querySelector('#cpuHand');

    /** Se agregan los botones con la selección de cada jugador */
    userHandContainer.innerHTML = `<img src="img/icon-${userHand}.svg" alt="${userHand}"/>`;
    cpuHandContainer.innerHTML = `<img src="img/icon-${cpuHand}.svg" alt="${cpuHand}"/>`;
}

function setTableroStyles( resultado, manos ) {
    const userHand = manos[0], cpuHand = manos[1];
    const colorBotonPlayAgain = resultado === 'W' ? 'win' : 'lose';
    document.querySelector('.playAgainText').classList.add(`${colorBotonPlayAgain}TextColor`);

    document.querySelector('#userHand').classList.add(`${userHand}`);
    document.querySelector('#cpuHand').classList.add(`${cpuHand}`);
    switch ( resultado ) {
        case 'W':
            document.querySelector('.result-text').innerText = 'YOU WIN';
            break;
        case 'L':
            document.querySelector('.result-text').innerText = 'YOU LOSE';
            break;
        case 'D':
            document.querySelector('.result-text').innerText = 'IT\'S A DRAW';
            break;
    }
}