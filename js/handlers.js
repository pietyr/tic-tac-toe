import { startGame } from './game';

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
  newGameCPUButton.addEventListener('click', () => {
    gameSettingsBoard.classList.toggle('disabled');
    gameBoard.classList.toggle('disabled');
    startGame(true, playerOneMark);
  });

  // New Game (VS PLAYER)
  newGamePlayerButton.addEventListener('click', () => {
    gameSettingsBoard.classList.toggle('disabled');
    gameBoard.classList.toggle('disabled');
    startGame(false, playerOneMark);
  });
}
