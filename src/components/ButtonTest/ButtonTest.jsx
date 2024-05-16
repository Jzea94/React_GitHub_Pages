import { useState } from 'react'
import './ButtonTest.css'

export default function ButtonComponent() {
	const [initialState, setInitialState] = useState(0)
	
	const handleState = () => {
		const plus = initialState + 1
		setInitialState(plus) 
	}

  const cleanState = () => {
    setInitialState(0)
  }


	
	return (
    <section>      
		<span>{`counter: ${initialState}`}</span>
		<button onClick={handleState}>plus</button>
		<button className='reset' onClick={cleanState}>reset</button>

    </section>
	)
}