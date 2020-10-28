'use strict';

//Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


const init = function () {
    //Start
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = '0';
    score1El.textContent = '0';
    current0El.textContent = '0';
    current1El.textContent = '0';

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    document.getElementById(`name--0`).textContent = `player 1`;
    document.getElementById(`name--1`).textContent = `player 2`;
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generating random dice roll
        let randomNo = Math.ceil(Math.random() * 6);
        console.log(randomNo)
        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${randomNo}.png`;
        //check for rolled 1: if true, switch to next player
        if (randomNo !== 1) {
            currentScore += randomNo;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score to active players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check if players score is >=100
        if (scores[activePlayer] >= 100) {
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            document.getElementById(`name--${activePlayer}`).textContent = `Winner!!!`;
        } else {
            //swithch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);