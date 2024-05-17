import { useEffect, useState } from 'react'
import './Pointer.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 })

  // random point
  useEffect(() => {
    let timer
    if (enabled) {
      timer = setTimeout(() => {
        const positionX = Math.floor(Math.random() * 889)
        const positionY = Math.floor(Math.random() * 589)
        setPointPosition({ x: positionX, y: positionY})
      }, 2000 )
    }

    return () => clearTimeout(timer)
  }, [pointPosition, enabled])

  // pointer move
  useEffect(() => {

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
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
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  // TODO: no permitir que el circulo salga del div

  return (
    <main>
      <section id='game-board'>
      <div style={{
          border: '1px solid #fff',
          borderRadius: '50%',
          position: 'relative',
          top: pointPosition.y,
          left: pointPosition.x,
          width: 10,          
          height: 10,
          backgroundColor: '#fff'
        }}/>

        <div style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}/>

      </section>


      <button id='pointer-follow' onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>

      <span id='score'>Score: {`${0}`}</span>
    </main>
  )
}

export default FollowMouse