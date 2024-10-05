import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Mainpage() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Footer/>
    </>
  )
}

export default Mainpage
