

export default function GameOver ({winner, onRematchClick}) {
    return(
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p> Player {winner} won!</p>}
            {!winner && <p> We have a draw</p>}
            <button onClick={onRematchClick}>Rematch</button>
        </div>
    )
}