import React,{ useState } from 'react'
import './App.css'
import JokeList from './JokeList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <JokeList />
    </div>
  )
}

export default App
