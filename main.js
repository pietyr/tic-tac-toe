import './scss/main.scss';

let playerMark = 'o';
let player2Mark;

let turn;
let positions;
let solo;
let gameEnded = false;
let nextTurn;

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

newGameCPUButton.addEventListener('click', () => {
  gameSettingsBoard.style.display = 'none';
  gameBoard.style.display = 'grid';
});

newGamePlayerButton.addEventListener('click', () => {
  gameSettingsBoard.style.display = 'none';
  gameBoard.style.display = 'grid';
});

buttonX.addEventListener('click', () => {
  if (playerMark === 'o') {
    // radioSelector.style.animationDirection = 'reverse';
    radioSelector.style.animationPlayState = 'running';
    setTimeout(() => {
      xIcon.setAttribute('src', './assets/icon-x--dark.svg');
    }, 100);

    setTimeout(() => {
      oIcon.setAttribute('src', './assets/icon-o--light.svg');
    }, 300);
  }
  playerMark = 'x';
});

buttonO.addEventListener('click', () => {
  if (playerMark === 'x') {
    // radioSelector.style.animationDirection = 'normal';
    radioSelector.style.animationPlayState = 'running';
    setTimeout(() => {
      oIcon.setAttribute('src', './assets/icon-o--dark.svg');
    }, 100);

    setTimeout(() => {
      xIcon.setAttribute('src', './assets/icon-x--light.svg');
    }, 300);
  }
  playerMark = 'o';
});

radioSelector.addEventListener('animationiteration', () => {
  radioSelector.style.animationPlayState = 'paused';
});

radioSelector.addEventListener('animationstart', () => {});

newGamePlayerButton.addEventListener('click', () => {
  gameSettingsBoard.classList.toggle('disabled');
  gameBoard.classList.toggle('disabled');
  startGame(false, playerMark);
});

newGameCPUButton.addEventListener('click', () => {
  gameSettingsBoard.classList.toggle('disabled');
  gameBoard.classList.toggle('disabled');
  startGame(true, playerMark);
});

// GAME

function startGame(singlePlayer = true, playerMark = 'o') {
  turn = 'x';

  positions = [];
  positions.length = 9;
  positions.fill(null);
  solo = singlePlayer;
  if (solo) {
    if (playerMark !== turn) {
      nextTurn = 'computer';
      computerTurn();
    }
  } else {
    player2Mark = playerMark === 'o' ? 'x' : 'o';
    nextTurn = playerMark === turn ? 1 : 2;
  }
}

function changePlayer(player = 'x') {
  document
    .querySelector('.game__turn-icon')
    .setAttribute(
      'src',
      `./assets/icon-${player === 'x' ? 'o' : 'x'}--light.svg`,
    );
  document.querySelectorAll(`.game__cell--${player}-turn`).forEach((cell) => {
    if (player === 'x') {
      cell.classList.remove('game__cell--x-turn');
      cell.classList.add('game__cell--o-turn');
    } else {
      cell.classList.remove('game__cell--o-turn');
      cell.classList.add('game__cell--x-turn');
    }
  });
}

function checkWin(cellId, positons, turn) {
  function positionToId(row, column) {
    return row * 3 + column;
  }

  function checkRow(row) {
    let hasWon = true;
    for (let i = 0; i <= 2; i++) {
      hasWon = hasWon && positions[positionToId(row, i)] === turn;
    }
    return hasWon;
  }
  function checkColumn(column) {
    let hasWon = true;
    for (let i = 0; i <= 2; i++) {
      hasWon = hasWon && positions[positionToId(i, column)] === turn;
    }
    return hasWon;
  }

  function checkDiagonals() {
    return (
      positions[positionToId(1, 1)] === turn &&
      ((positions[positionToId(0, 0)] === turn &&
        positions[positionToId(2, 2)] === turn) ||
        (positions[positionToId(0, 2)] === turn &&
          positions[positionToId(2, 0)] === turn))
    );
  }

  const row = Math.floor(cellId / 3);
  const column = cellId % 3;
  return checkRow(row) || checkColumn(column) || checkDiagonals();
}

document.querySelectorAll('.game__cell').forEach((cell) => {
  cell.addEventListener('click', (e) => {
    const id = e.target.dataset.cellid;
    console.log(id);
    e.target.classList.remove('game__cell--x-turn');
    e.target.classList.remove('game__cell--o-turn');

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
  });
});

function computerTurn() {
  setTimeout(() => {
    let isChecked = true;
    let cell;
    while (isChecked) {
      console.log('isChecked');
      const id = Math.floor(Math.random() * 9) + 1;
      console.log(id);
      cell = document.querySelector(`.game__cell:nth-of-type(${id})`);
      console.log(cell);
      isChecked =
        cell.classList.contains('game__cell--x-check') ||
        cell.classList.contains('game__cell--o-check');
    }
    cell.click();
  }, 500);
}
