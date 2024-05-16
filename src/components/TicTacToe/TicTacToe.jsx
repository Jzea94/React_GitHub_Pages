/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './TicTacToe.css'

const FICHAS = {
  x: 'x',
  o: 'o'
}

const COMBO_WINNNER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Square = ({children, classNameSquare, handleState, index}) => {
  const update = () => {
    handleState(index)
  }
  return (
    <div onClick={update} className={classNameSquare}>
      {children}
    </div>
  )
}

function TicTacToe () {
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? FICHAS.x
  })

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })


  const [winner, setWinner] = useState(null)

  const handleState = (index) => {
    if ( board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === FICHAS.x ? FICHAS.o : FICHAS.x 
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (endGame(newBoard)) {
      setWinner(false)
    }
  }

  const endGame = (newBoard) => {
    return newBoard.every((element) => element !== null )
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(FICHAS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  
  //TODO: como saber cuando el tablero se acabo? Es empate?
    
  const checkWinner = (board) => {
    for(const combo of COMBO_WINNNER) {
      const [a, b, c] = combo
      if(
        board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return board[a]
      }
    }
    return null
  }

  return (
    <main className="game">
      <button onClick={resetGame} className='reset-game'>Reset Game</button>
      <section className="board">
        {
          board.map((element, index) => {
            return (
              <Square
                key={index}
                classNameSquare={'content'}
                index={index}
                handleState={handleState}
              >
                {element}
              </Square>
            )
          })
        }
      </section>

      <section className='tablero-de-turnos'>
        <Square classNameSquare={turn === FICHAS.x ? 'content turn' : 'content null'}>{FICHAS.x}</Square>
        <Square classNameSquare={turn === FICHAS.o ? 'content turn' : 'content null'}>{FICHAS.o}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'The Winner is:'
                }
              </h2>

              <header className="win">
                {
                  winner 
                  ? <Square classNameSquare='content'>{winner}</Square> 
                  : <Square classNameSquare='content'>{'⚔'}</Square>
                }
              </header>

              <footer>
                <button className='reset-game' onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default TicTacToe