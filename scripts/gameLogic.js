/**
 * Module pattern for the board
 */
const board = (function () {
  const createBoard = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameBoard = createBoard();
  const clear = () => gameBoard = createBoard();
  const get = () => gameBoard;
  const getElement = (x, y) => gameBoard[y][x];
  const put = (x, y, marker) => gameBoard[y][x] = marker;
  return { get, put, clear, getElement }
})();

export const clearBoard = () => gameBoard.clear();

/**
 * Module pattern for check if someone wins 
 */
const check = (function () {
  const THREE_IN_A_ROW = 3;
  function checkEquality(x, y, marker, matches) {
    const currentElement = board.getElement(x, y);
    if (currentElement === marker)
      matches++;
  }
  const winVerification = (matches) => (matches === 3) ? true : false;
  function rows(y, marker) {
    let matches = 0;
    for (let x = 0; x < THREE_IN_A_ROW; x++)
      checkEquality(x, y, marker, matches);
    return winVerification(matches);
  }

  function columns(x, marker) {
    let matches = 0;
    for (let y = 0; y < THREE_IN_A_ROW; y++)
      checkEquality(x, y, marker, matches);
    return winVerification(matches);
  }
  function diagonals(marker) {
    let matches = 0;
    for (let xY = 0; xY < THREE_IN_A_ROW; xY++)
      checkEquality(xY, xY, marker, matches);
    if (winVerification(matches)) return true;
    matches = 0;
    y = 0;
    for (let x = 2; x >= 0; x--) {
      checkEquality(x, y, marker, matches);
      y++;
    }
    return winVerification(matches);
  }

  function all(x, y, marker) {
    if (rows(y, marker) || columns(x, marker) || diagonals(marker))
      return true;
    return false;
  }
  return { all }
})();


/**
 *  Factory function for creating a player  
 */
export function createPlayer(marker) {
  const play = (x, y) => {
    board.put(x, y, marker);
    return check.all(x, y, marker);
  };
  return { play }
}