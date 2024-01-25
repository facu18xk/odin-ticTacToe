
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
  function row(y) {
    let matches = 0;
    for (let x = 0; x < IN_A_ROW; x++)
      if (board.get()[y][x] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    return false;
  }

  function column(x) {
    let matches = 0;
    for (let y = 0; y < IN_A_ROW; y++)
      if (board.get()[y][x] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    return false;
  }

  function cross() {
    let matches = 0;
    let y = 0;
    for (let xy = 0; xy < IN_A_ROW; xy++)
      if (board.get()[xy][xy] === marker)
        matches++;
    if (matches === IN_A_ROW) return true;
    matches = 0;
    for (let x = IN_A_ROW - 1; x >= 0; x--) {
      if (board.get()[y][x] === marker)
        matches++;
      y++;
    }
    if (matches === IN_A_ROW) return true
    return false
  }

  function all(x, y, mark) {
    marker = mark;
    if (row(y) || column(x) || cross()) return true;
    return false;
  }

  return { all };
})();

const game = (function () {
  let winner = null;
  let over = false;
  function shift(player, player2) {
    const X = 0;
    const Y = 1;
    const coordinates = player.getCoordinates();
    board.put(coordinates[X], coordinates[Y], player.getMarker());
    player.setShift(false);
    player2.setShift(true);
    if (check.all(coordinates[X], coordinates[Y], player.getMarker())) return true;
    return false;
  }
  function round(player1, player2) {
    if (player1.getShift()) {
      if (shift(player1, player2)) {
        winner = player1;
        over = true;
      }
    }
    else {
      if (shift(player2, player1)) {
        winner = player2;
        over = true;
      }
    }
  }

  function play(player1, player2) {
    let rounds = 0;
    while (rounds < 9 && !over) {
      round(player1, player2);
      rounds++;
    }
    if (winner != null)
      alert(`The winner is ${winner.getMarker()}`)
    else
      alert("It's a tie");
  }

  function reset() {
    board.clear();
  }
  return { play, reset }
})();