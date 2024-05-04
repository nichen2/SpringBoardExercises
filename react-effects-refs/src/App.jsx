import { useState } from 'react'
import Deck from './Deck'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Deck></Deck>
      </div>
    </>
  )
}

export default App
