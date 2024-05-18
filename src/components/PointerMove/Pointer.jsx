import { useEffect, useState, useRef } from 'react'
import './Pointer.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [pointPosition, setPointPosition] = useState({ x: 150, y: 150 })
  const [score, setScore] = useState(0)
  const gameBoardRef = useRef(null); // Reference to the game-board
  
  // Logica para generar la posición random del punto
  useEffect(() => {
    let timer
    if (enabled) {
      timer = setTimeout(() => {
        const positionX = Math.floor(Math.random() * 869)
        const positionY = Math.floor(Math.random() * 569)
        setPointPosition({ x: positionX, y: positionY})
      }, 1000 )
    }

    return () => clearTimeout(timer)
  }, [pointPosition, enabled])

  // Logica para capturar la posición del cursor en la pantalla
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      const gameBoard = gameBoardRef.current.getBoundingClientRect();
      const x = Math.max(27, Math.min(clientX - gameBoard.left, gameBoard.width - 27));
      const y = Math.max(27, Math.min(clientY - gameBoard.top, gameBoard.height - 27));
      setPosition({ x, y });
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    return () => { // cleanup method
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente

  // change body className
  useEffect(() => {
    const cursorElement = document.getElementById('cursor')
    cursorElement.classList.toggle('no-cursor', !enabled)

    return () => {
      cursorElement.classList.remove('no-cursor')
    }
  }, [enabled])

  // Logica para validar que el punto este dentro del cursor
  function count () {
    const newScore = score
    setScore(() => newScore + 1)
  }

  // Reset the game
  const resetGame = () => {
    setScore(0);
    setPointPosition({ x: 150, y: 150 });
    setPosition({ x: 0, y: 0 });
    setEnabled(false);
  };
  
  // TODO: no permitir que el div id=cursor salga del game board

  return (
    <main>
      <section id='game-board' ref={gameBoardRef}>
      <div
          className='randomPoint'
          onClick={count}
          style={{
          top: pointPosition.y,
          left: pointPosition.x
        }}/>

        <div id='cursor'
          style={{
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -27,
          top: -59,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}/>

      </section>
      
      <button id='pointer-follow' onClick={() => enabled ? resetGame() : setEnabled(true)}>
        {enabled ? 'End' : 'Start'} Game
      </button>

      <span id='score'>Score: {`${score}`}</span>
    </main>
  )
}

export default FollowMouse