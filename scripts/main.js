import { clearBoard, createPlayer } from "./gameLogic.js";
const cells = document.querySelectorAll(".board--box");

const game = (function () {
  cells.forEach(cell => {
    cell.addEventListener('click', (ev) => {
      if (ev.target.childElementCount === 0) {

      }
    })
  })
})();
