import React, { useState, useEffect } from "react";
import "./App.css";

const INITIAL_STATE = Array(9).fill("");

const Player = {
  X: "X",
  O: "O",
};

const WINNING = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const State = {
  Playing: "Playing",
  Draw: "Draw",
  XWon: "XWon",
  OWon: "OWon",
};

function App() {
  const [cells, setCells] = useState(INITIAL_STATE);
  const [turn, setTurn] = useState(Player.X);
  const [state, setState] = useState(State.Playing);
  const [scoreboard, setScoreboard] = useState({
    [Player.X]: 0,
    [Player.O]: 0,
  });

  const handleClick = (i) => {
    if (state !== State.Playing) return;
    const draft = [...cells];
    if (cells[i] == "") {
      setTurn((turn) => (turn === Player.X ? Player.O : Player.X));
      draft[i] = turn;
      setCells(draft);
    }
  };

  const handleReset = () => {
    setState(State.Playing);
    setCells(INITIAL_STATE);
  };

  useEffect(() => {
    let winner = undefined;

    [Player.X, Player.O].forEach((player) => {
      const hasWon = WINNING.some((win) =>
        win.every((cell) => cells[cell] === player)
      );

      if (hasWon) {
        winner = player;
      }
    });

    if (winner === Player.X) {
      setState(State.XWon);
      setScoreboard((x) => ({
        ...scoreboard,
        [Player.X]: x[Player.X] + 1,
      }));
    } else if (winner === Player.O) {
      setState(State.OWon);
      setScoreboard((o) => ({
        ...scoreboard,
        [Player.O]: o[Player.O] + 1,
      }));
    } else if (cells.every((cell) => cell !== "")) {
      setState(State.Draw);
    }
  }, [cells]);

  return (
    <main className="App">
      <div className="Header">
        <p className="Button">{`${turn} TURN`}</p>
        <div className="Button" onClick={handleReset}>
          <img src="https://icongr.am/fontawesome/repeat.svg?size=20&color=currentColor" />
        </div>
      </div>
      <div className="Board">
        {cells.map((cell, index) => (
          <div className="Cell" key={index} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="Container-result">
        <div className="Result Result-X">{`X won: ${
          scoreboard[Player.X]
        }`}</div>
        <div className="Result Result-O">{`O won: ${
          scoreboard[Player.O]
        }`}</div>
        {/* <div className="Result">{`${scoreboard}`}</div> */}
      </div>
    </main>
  );
}

export default App;
