import Square from "./Square";
import { useState } from "react";
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  let isWinner = false;
  let winner = null;
  let info = `Next - ${isNextX ? "x" : "o"}`;

  const checkDraw = () => {
    return squares.every((square) => square !== null);
  };

  const checkWinner = () => {
    const winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (let combination of winnerCombinations) {
      let [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        isWinner = true;
        return squares[a];
      }
    }
    return null;
  };

  const setSquareValue = (i) => {
    if (isWinner) {
      window.location.reload();
      return;
    }
    if (null in squares) window.location.reload();

    let newSquares = squares.slice();
    newSquares[i] = isNextX ? "x" : "o";
    setIsNextX(!isNextX);
    setSquares(newSquares);
  };

  winner = checkWinner();
  if (winner) {
    info = `Winner - ${winner}`;
  } else if (checkDraw()) {
    info = "Draw! Reloading...";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  return (
    <div>
      <h2>{info}</h2>
      {squares.map((squares, index) => {
        return (
          <span key={index}>
            <Square
              value={squares}
              setSquareValue={() => setSquareValue(index)}
            />
            {(index == 2 || index == 5) && <br />}
          </span>
        );
      })}
    </div>
  );
}
