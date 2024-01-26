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
  const put = (x, y, marker) => gameBoard[y][x] = marker;
  return { get, put, clear }
})();

export const clearBoard = () => gameBoard.clear();

/**
 * Module pattern for check if someone wins 
 */
const check = (function () {
  function rows() {
    return false;
  }
  function
})();


/**
 *  Factory function for creating a player  
 */
