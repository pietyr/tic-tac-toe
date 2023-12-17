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

export function isNextComputer() {
  return gameState.includes(null) && !isMultiPlayer && nextTurn === 1;
}

export function playComputer() {
  if (!gameState.includes(null)) {
    return false;
  }
  if (!isMultiPlayer && nextTurn === 1) {
    let id;
    do {
      id = Math.floor(Math.random() * 9);
    } while (gameState[id] !== null);
    gameState[id] = 1;
    nextTurn = 0;
    return [id, playersMark[1]];
  }
  return false;
}
