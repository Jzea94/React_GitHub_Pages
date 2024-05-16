import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

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

  return (
    <>
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
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}
// Esta logica se hizo con el fin de agregar un button para desmontar el componente
function PointerFollow () {
  const [montarComponente, setMontarComponente] = useState(false)

  const [position, setPosition] = useState({ x: 0, y: 0})

  setTimeout(() => {
    const positionX = Math.floor(Math.random() * 500 )
    const positionY = Math.floor(Math.random() * 500 )
    console.log(positionX, positionY)
    setPosition({ x: positionX, y: positionY})
  }, 2000)


  return (
    <main
      style={{
      display:'grid',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div
        style={{
        border: '1px solid #fff',
        borderRadius: '50%',
        width:10,
        height: 10,
        backgroundColor: '#fff',
        left: `${position.x}`,
        top: `${position.y}`
      }} >
      </div>
      {montarComponente && <FollowMouse />}
      <button onClick={() => setMontarComponente(!montarComponente)}>
        { montarComponente ? 'Desmontar' : 'Montar'} componente
      </button>
    </main>
  )
}

export default PointerFollow