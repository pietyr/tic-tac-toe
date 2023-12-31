const playersMark = []; // 0 - player1, 1 - CPU / player2
playersMark.length = 2;
let isMultiPlayer;
let gameState = [];
let nextTurn;
let startTurn;
const points = {
  x: 0,
  o: 0,
  ties: 0,
};

export function startGame(pickedMark = 'o', multiPlayer = true) {
  isMultiPlayer = multiPlayer;
  playersMark[0] = pickedMark;
  playersMark[1] = pickedMark === 'o' ? 'x' : 'o';
  nextTurn = pickedMark === 'x' ? 0 : 1;
  startTurn = nextTurn;
  gameState = [];
  gameState.length = 9;
  gameState.fill(null);
  points.x = 0;
  points.o = 0;
  points.ties = 0;
}

export function nextRound() {
  nextTurn = startTurn;
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

export function isWon(lastCheckedID) {
  const lastID = Number(lastCheckedID);
  const state = gameState[lastID];

  const won =
    checkRow(lastID, state) ||
    checkColumn(lastID, state) ||
    checkDiagonals(lastID, state);

  if (won) {
    points[playersMark[gameState[lastID]]] += 1;
  }

  return won;
}

function getId(row, column) {
  return row * 3 + column;
}

function getColumn(id) {
  return id % 3;
}

function getRow(id) {
  return Math.floor(id / 3);
}

function checkRow(id, state) {
  const row = getRow(id);
  const wonID = [];
  for (let i = 0; i <= 2; i += 1) {
    const tempId = getId(row, i);
    if (gameState[tempId] !== state) {
      return false;
    }
    wonID.push(tempId);
  }
  return wonID;
}

function checkColumn(id, state) {
  const column = getColumn(id);
  const wonID = [];
  for (let i = 0; i <= 2; i += 1) {
    const tempId = getId(i, column);
    if (gameState[tempId] !== state) {
      return false;
    }
    wonID.push(tempId);
  }
  return wonID;
}

function checkDiagonals(id, state) {
  if (id % 2 === 0) {
    // 0, 4, 8 - \ left diagonal \
    // 2, 4, 6 - / right diagonal /

    const inLeftDiagonal = id === 0 || id === 4 || id === 8;
    const inRightDiagonal = id === 2 || id === 4 || id === 6;

    const leftDiagonalWon =
      inLeftDiagonal &&
      gameState[0] === state &&
      gameState[4] === state &&
      gameState[8] === state;

    if (leftDiagonalWon) {
      return [0, 4, 8];
    }

    const rightDiagonalWon =
      inRightDiagonal &&
      gameState[2] === state &&
      gameState[4] === state &&
      gameState[6] === state;

    if (rightDiagonalWon) {
      return [2, 4, 6];
    }
  }
  return false;
}

export function isSinglePlayer() {
  return !isMultiPlayer;
}

export function getMark(playerId) {
  return playersMark[playerId];
}

export function getPoints() {
  return { ...points };
}

export function isDraw() {
  const draw = !gameState.includes(null);
  if (draw) {
    points.ties += 1;
  }
  return draw;
}
