let playerOneMark;
let playerTwoMark;
let isMultiPlayer;
let gameState = [];
let nextTurn;

export function startGame(pickedMark = 'o', multiPlayer = true) {
  isMultiPlayer = multiPlayer;
  playerOneMark = pickedMark;
  playerTwoMark = playerOneMark === 'o' ? 'x' : 'o';
  nextTurn = playerOneMark === 'x' ? 1 : 2;
  gameState = [];
  gameState.length = 9;
  gameState.fill(null);
}

export function s() {}
