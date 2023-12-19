import {
  startGame,
  markCell,
  getGameState,
  getNextTurnMark,
  isNextComputer,
  playComputer,
  isWon,
  isSinglePlayer,
  getMark,
} from './game';

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

const restartButton = document.querySelector('.game__restart');

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
    gameSettingsBoard.classList.add('disabled');
    gameBoard.classList.remove('disabled');
    startGame(playerOneMark, vsPlayer);
    loadCells();
    if (!vsPlayer && playerOneMark === 'o') {
      switchHovers(getNextTurnMark(), getGameState());
      setTimeout(computerMove, 500);
    }
  };
}

function loadCells() {
  // Cell click event handler
  cells.forEach((cell) => {
    cell.classList.add(`game__cell--x-turn`);
    cell.addEventListener('click', cellClicked);
  });
}

function clearCells() {
  cells.forEach((cell) => {
    cell.classList.remove(`game__cell--x-turn`);
    cell.classList.remove(`game__cell--o-turn`);
    cell.classList.remove(`game__cell--x-check`);
    cell.classList.remove(`game__cell--o-check`);
    cell.removeEventListener('click', cellClicked);
  });
}

function cellClicked(event) {
  const id = Number(event.target.dataset.cellid);

  // false if was already clicked
  // mark if successful
  const clickResult = markCell(id);

  if (clickResult) {
    // Remove hover class
    event.target.classList.remove('game__cell--x-turn');
    event.target.classList.remove('game__cell--o-turn');

    // Show mark in cell
    event.target.classList.add(`game__cell--${clickResult}-check`);

    const wonArray = isWon(id);
    if (Array.isArray(wonArray)) {
      roundWon(id, clickResult, wonArray);
    } else {
      // Change hover marks for unchecked cells
      switchHovers(getNextTurnMark(), getGameState());

      switchTurnIndicator(getNextTurnMark());

      if (isNextComputer()) {
        setTimeout(computerMove, 500);
      }
    }
  }
}

function switchHovers(nextTurnMark, cellState) {
  cells.forEach((cell, index) => {
    if (cellState[index] === null) {
      cell.classList.remove(`game__cell--x-turn`);
      cell.classList.remove(`game__cell--o-turn`);
      if (!isNextComputer()) {
        cell.classList.add(`game__cell--${nextTurnMark}-turn`);
      }
    }
  });
}

function switchTurnIndicator(nextTurnMark) {
  const turnIcon = document.querySelector('.game__turn-icon');
  turnIcon.setAttribute('src', `./assets/icon-${nextTurnMark}--light.svg`);
  turnIcon.setAttribute('alt', `${nextTurnMark.toUpperCase()}`);
}

function computerMove() {
  const [computerPickedId, computerMark] = playComputer();
  const cell = cells[computerPickedId];
  cell.classList.remove('game__cell--x-turn');
  cell.classList.remove('game__cell--o-turn');

  cell.classList.add(`game__cell--${computerMark}-check`);

  const wonArray = isWon(Number(computerPickedId));
  if (Array.isArray(wonArray)) {
    roundWon(Number(computerPickedId), computerMark, wonArray);
  } else {
    const next = getNextTurnMark();
    switchTurnIndicator(next);
    switchHovers(next, getGameState());
  }
}

restartButton.addEventListener('click', () => {
  clearCells();
  const startNewGame = newGameClicked(!isSinglePlayer());
  startNewGame();
});

function roundWon(id, mark, wonArray) {
  // Change cells to mark win
  for (const index of wonArray) {
    cells[index].classList.remove(`game__cell--${mark}-check`);
    cells[index].classList.add(`game__cell--${mark}-win`);
  }
  // Add points
  // Show modal
}
