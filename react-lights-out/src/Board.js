import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = []
      for (let j = 0; j < ncols; j++) {
        const chance = Math.random();
        const lightValue = chance < chanceLightStartsOn ? true : false;
        row.push(lightValue);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let light of row) {
        if (light) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);


      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const flipSurrounding = (y, x, boardCopy) => {
        const upperCell = y - 1;
        const lowerCell = y + 1;
        const rightCell = x - 1;
        const leftCell = x + 1;
        flipCell(upperCell, x, boardCopy);
        flipCell(lowerCell, x, boardCopy);
        flipCell(y, rightCell, boardCopy);
        flipCell(y, leftCell, boardCopy);
      }

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(row => [...row]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipSurrounding(y, x, boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }

  const gameWon = hasWon();
  // if the game is won, just show a winning msg & render nothing else
  
  // TODO

  // make table board

  // TODO
  return (
    <div className="Board">
      {gameWon ? (
        <h1>Congrats! You Won!</h1>
      ) : (
        board.map((row, y) => (
          row.map((cell, x) => (
            <Cell key={`${y}-${x}`} isLit={cell} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}/>
          ))
        ))
      )}
    </div>

  )
}

export default Board;
