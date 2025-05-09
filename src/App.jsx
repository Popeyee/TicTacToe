
import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X"
  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer;
}

//
export default function App() {
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns);

  let winner;
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  console.log("gb",gameBoard)
  console.log("gt",gameTurns)


  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square
      gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][[combination[0].column]]
    const secondSquareSymbol = gameBoard[combination[1].row][[combination[1].column]]
    const thirdSquareSymbol = gameBoard[combination[2].row][[combination[2].column]]

    if (firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns =  [
        {square : {
          row: rowIndex, 
          col: colIndex}, 
        player: currentPlayer
        },
        ...prevTurns
      ];
      return updatedTurns
    })
  }


  const handleRematchClick = () => {
    setGameTurns([]);
  }

  return (
  <main>
    <div id="game-container">

      <ol id="players" className="highlight-player">
        <Player  
          playerName="Player 1" 
          playerSymbol="X" 
          isActive ={deriveActivePlayer(gameTurns) === "X"}
        />
        <Player  
          playerName="Player 2" p
          playerSymbol="O"
          isActive ={deriveActivePlayer(gameTurns) === "O"} 
        />
      </ol>

      {(winner || hasDraw) && <GameOver winner={winner} onRematchClick={handleRematchClick} /> }
      
      <GameBoard 
        onSelectSquare={handleSelectSquare}
        board = {gameBoard} />
    </div>
    
    <Log turns= {gameTurns}  />
  </main>)
}