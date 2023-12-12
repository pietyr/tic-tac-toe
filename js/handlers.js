import { startGame, markCell } from './game';

let playerOneMark = document.querySelector(
  '.game-settings__radio-input:checked',
).value;

// Settings DOM nodes
const buttonX = document.querySelector('#radio-x');
const buttonO = document.querySelector('#radio-o');
const radioSelector = document.querySelector('.game-settings__radio-selector');
const xIcon = document.querySelector(
  '.game-settings__radio-label-x > .game-settings__radio-image',
);
const oIcon = document.querySelector(
  '.game-settings__radio-label-o > .game-settings__radio-image',
);
const newGameCPUButton = document.querySelector(
  '.game-settings__button--yellow',
);
const newGamePlayerButton = document.querySelector(
  '.game-settings__button--blue',
);
const gameSettingsBoard = document.querySelector('.game-settings');
const gameBoard = document.querySelector('.game');

const cells = document.querySelectorAll('.game__cell');

export default function addHandlers() {
  // O clicked
  buttonX.addEventListener('click', () => {
    if (playerOneMark === 'o') {
      // radioSelector.style.animationDirection = 'reverse';
      radioSelector.style.animationPlayState = 'running';
      setTimeout(() => {
        xIcon.setAttribute('src', './assets/icon-x--dark.svg');
      }, 100);

      setTimeout(() => {
        oIcon.setAttribute('src', './assets/icon-o--light.svg');
      }, 300);
    }
    playerOneMark = 'x';
  });

  // X clicked
  buttonO.addEventListener('click', () => {
    if (playerOneMark === 'x') {
      // radioSelector.style.animationDirection = 'normal';
      radioSelector.style.animationPlayState = 'running';
      setTimeout(() => {
        oIcon.setAttribute('src', './assets/icon-o--dark.svg');
      }, 100);

      setTimeout(() => {
        xIcon.setAttribute('src', './assets/icon-x--light.svg');
      }, 300);
    }
    playerOneMark = 'o';
  });

  radioSelector.addEventListener('animationiteration', () => {
    radioSelector.style.animationPlayState = 'paused';
  });

  // New Game (VS CPU)
  newGameCPUButton.addEventListener('click', newGameClicked(false));

  // New Game (VS PLAYER)
  newGamePlayerButton.addEventListener('click', newGameClicked(true));
}

function newGameClicked(vsPlayer = true) {
  return function handleClick() {
    gameSettingsBoard.classList.toggle('disabled');
    gameBoard.classList.toggle('disabled');
    startGame(playerOneMark, vsPlayer);
    loadCells();
  };
}

function loadCells() {
  // Cell click event handler
  cells.forEach((cell) => {
    cell.classList.add(`game__cell--x-turn`);
    cell.addEventListener('click', cellClicked);
  });
}

function cellClicked(event) {
  const id = event.target.dataset.cellid;

  // false if was already clicked
  // mark if successful
  const clickResult = markCell(Number(id));

  if (clickResult) {
    // Remove hover class
    event.target.classList.remove('game__cell--x-turn');
    event.target.classList.remove('game__cell--o-turn');

    // Show mark in cell
    event.target.classList.add(`game__cell--${clickResult}-check`);
  }
  /*


    if (
      !(
        e.target.classList.contains(`game__cell--x-check`) ||
        e.target.classList.contains(`game__cell--o-check`)
      )
    ) {
      positions[id] = turn;
      if (turn === 'x') {
        e.target.classList.add('game__cell--x-check');
        changePlayer(turn);
        if (checkWin(id, positions, turn)) {
          gameEnded = true;
          console.log(`${turn} won`);
        }
        turn = 'o';
      } else if (turn === 'o') {
        e.target.classList.add('game__cell--o-check');
        changePlayer(turn);
        if (checkWin(id, positions, turn)) {
          gameEnded = true;
          console.log(`${turn} won`);
        }
        turn = 'x';
      }
    }

    if (solo && turn !== playerMark && !gameEnded) {
      console.log('random');
      computerTurn();
    }

    */
}
