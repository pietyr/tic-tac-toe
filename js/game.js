const playersMark = []; // 0 - player1, 1 - CPU / player2
playersMark.length = 2;
let isMultiPlayer;
let gameState = [];
let nextTurn;

export function startGame(pickedMark = 'o', multiPlayer = true) {
  isMultiPlayer = multiPlayer;
  playersMark[0] = pickedMark;
  playersMark[1] = pickedMark === 'o' ? 'x' : 'o';
  nextTurn = pickedMark === 'x' ? 0 : 1;
  gameState = [];
  gameState.length = 9;
  gameState.fill(null);

  if (!isMultiPlayer && nextTurn === 1) {
    playComputer();
  }
}

export function markCell(cellId) {
  if (isMultiPlayer || nextTurn === 0) {
    // Player can move
    if (gameState[cellId] === null) {
      gameState[cellId] = nextTurn;
      const thisTurn = nextTurn;
      nextTurn = nextTurn === 0 ? 1 : 0;
      return playersMark[thisTurn];
    }
    // Cell already checked
    return false;
  }
  // Computer has not made his move
  return false;
}

export function getGameState() {
  return gameState;
}

export function getNextTurnMark() {
  return playersMark[nextTurn];
}

export function playComputer() {
  // TODO
}
