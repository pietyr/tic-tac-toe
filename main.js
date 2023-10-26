import './scss/main.scss';

let playerMark = 'o';

const buttonX = document.querySelector('#radio-x');
const buttonO = document.querySelector('#radio-o');
const radioSelector = document.querySelector('.game-settings__radio-selector');

buttonX.addEventListener('click', () => {
  if (playerMark === 'o') {
    // radioSelector.style.animationDirection = 'reverse';
    radioSelector.style.animationPlayState = 'running';
  }
  playerMark = 'x';
});

buttonO.addEventListener('click', () => {
  if (playerMark === 'x') {
    // radioSelector.style.animationDirection = 'normal';
    radioSelector.style.animationPlayState = 'running';
  }
  playerMark = 'o';
});

radioSelector.addEventListener('animationiteration', () => {
  radioSelector.style.animationPlayState = 'paused';
});
