import { clearBoard, createPlayer } from "./gameLogic.js";
const cells = document.querySelectorAll(".board--box");
const reset = document.querySelector(".reset");
const dom = (function () {
  function changeTurn(marker) {
    const title = document.querySelector('.game > h1');
    let turn;
    if (marker === "x")
      turn = "1's"
    else
      turn = "2's"
    title.textContent = `Player ${turn} turn`
  }
  function popup(message) {
    const dialog = document.createElement('dialog');
    const p = document.createElement('p');
    const button = document.createElement('button');
    button.textContent = "Close";
    p.textContent = message;
    dialog.classList.add("popup");
    dialog.appendChild(p);
    dialog.appendChild(button);
    document.body.appendChild(dialog);
    button.addEventListener('click', () => {
      document.body.removeChild(dialog);
    })
  }
  return { changeTurn, popup }
})();

const box = (function () {
  const getX = cell => parseInt(cell.getAttribute("data--x"));
  const getY = cell => parseInt(cell.getAttribute("data--y"));

  function addMarker(evTarget, marker) {
    const container = evTarget;
    const img = document.createElement('img');
    let image;
    if (marker === "x")
      image = "./assets/xRed.svg";
    else
      image = "./assets/oGreen.svg";
    img.setAttribute("src", image);
    container.appendChild(img);
  }

  function clear(cells) {
    clearBoard();
    cells.forEach(cell => {
      cell.innerHTML = "";
    })
  }
  return { getX, getY, addMarker, clear }
})()
const game = (function () {
  let winner, shifts = 0;
  const players = [createPlayer("x"), createPlayer("o")];
  let currentPlayer = 0;
  function restart() {
    box.clear(cells);
    winner = undefined;
    shifts = 0;
  }
  function winning(winner) {
    dom.popup(`The winner is ${winner.getMarker()}`);
    restart();
  }

  function tie() {
    dom.popup("It's a tie");
    restart();
  }
  function turn(ev) {
    const element = ev.target;
    if (element.childElementCount === 0 && element.className === "board--box") {
      const x = box.getX(element);
      const y = box.getY(element);
      box.addMarker(element, players[currentPlayer].getMarker());
      if (players[currentPlayer].play(x, y))
        return winning(players[currentPlayer]);
      shifts++;
      if (shifts === 9)
        return tie();
      currentPlayer = (currentPlayer === 0) ? 1 : 0;
      dom.changeTurn(players[currentPlayer].getMarker());
    } else
      dom.popup("Please click in a empty cell");
  }
  function play(ev) {
    if (shifts < 9 && winner === undefined)
      turn(ev);
  }
  return { play, restart }
})();

cells.forEach(cell => {
  cell.addEventListener('click', (ev) => {
    game.play(ev);
  })
})
reset.addEventListener('click', () => {
  game.restart();
})