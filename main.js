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
