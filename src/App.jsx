import { useState } from 'react'
import Mainpage from './pages/Mainpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Mainpage/>
    </>
  )
}

export default App
