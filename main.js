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
      if (turn === 'x') {
        e.target.classList.add('game__cell--x-check');
        changePlayer(turn);
        turn = 'o';
      } else if (turn === 'o') {
        e.target.classList.add('game__cell--o-check');
        changePlayer(turn);
        turn = 'x';
      }
    }
  });
});
