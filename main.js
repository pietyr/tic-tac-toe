import './scss/main.scss';
import addHandlers from './js/handlers';

window.addEventListener('DOMContentLoaded', addHandlers);

// GAME
/*


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
*/
