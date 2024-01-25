
/**
 * Module pattern for the board of the game
 * private members: board 
 * public members: get, clear, put(x,y, marker)
 */
const board = (function () {
  const createBoard = () => [[null, null, null], [null, null, null], [null, null, null]];
  let board = createBoard();
  //public members
  const get = () => board;
  const clear = () => board = createBoard();
  const put = (x, y, marker) => board[y][x] = marker;
  return { get, clear, put }
})();

function getWhoStarts(player1, player2) {
  let choose = prompt(`Who start x or o"`);
  if (choose === "x") player1.setShift(true);
  else player2.setShift(true);
}
/**
 * Function factory for a player
 */
function createPlayer(marker) {
  const X = 0;
  const Y = 1;
  let shift = false;
  const coordinates = [];
  //Public members
  const getMarker = () => marker;
  const getShift = () => shift;
  const setShift = bool => shift = bool;
  function getCoordinates() {
    coordinates[X] = parseInt(prompt("Give me the x coordinate"));
    coordinates[Y] = parseInt(prompt("Give me the y coordinate"));
    return coordinates;
  };
  return { getCoordinates, getMarker, getShift, setShift }
}

const check = (function () {
  let marker;
  const IN_A_ROW = 3;
  const boardGame = board.get();
  function row(y) {
    let matches = 0;
    for (let x = 0; x < IN_A_ROW; x++)
      if (boardGame[y][x] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    return false;
  }

  function column(x) {
    let matches = 0;
    for (let y = 0; y < IN_A_ROW; y++)
      if (boardGame[y][x] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    return false;
  }

  function cross() {
    let matches = 0;
    let y = 0;
    for (let xy = 0; xy < IN_A_ROW; xy++)
      if (boardGame[xy][xy] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    matches = 0;
    for (let x = IN_A_ROW - 1; x >= 0; x--) {
      if (boardGame[y][x] === marker)
        matches++;
      y++;
    }
    if (matches === IN_A_ROW) return true
    return false
  }
  const setMarker = (mark) => marker = mark;

  function all(x, y, marker) {
    setMarker(marker);
    if (row(y) || column(x) || cross()) return true
    return false;
  }

  return { all };
})();

const game = (function () {
  function shift(player) {

  }
  function round(player1, player2) {

  }
  function reset() { }
})();