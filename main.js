import './scss/main.scss';

let playerMark = 'o';

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

// GAME

let turn = 'x';
const positions = [];
positions.length = 9;
positions.fill(null);

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
    const hasWon = true;
    for (let i = 0; i <= 2; i++) {
      if (positions[positionToId(row, i)] !== turn) {
        return false;
      }
    }
    return hasWon;
  }
  function checkColumn(column) {
    const hasWon = true;
    for (let i = 0; i <= 2; i++) {
      if (positions[positionToId(i, column)] !== turn) {
        return false;
      }
    }
    return hasWon;
  }

  const row = Math.floor(cellId / 3);
  const column = cellId % 3;
  return checkRow || checkColumn;
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
          console.log(`${turn} won`);
        }
        turn = 'o';
      } else if (turn === 'o') {
        e.target.classList.add('game__cell--o-check');
        changePlayer(turn);
        if (checkWin(id, positions, turn)) {
          console.log(`${turn} won`);
        }
        turn = 'x';
      }
    }
  });
});
