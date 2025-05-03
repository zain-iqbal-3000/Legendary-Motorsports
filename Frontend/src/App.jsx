import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home.jsx'
import CarDetail from './CarDetail'
import Dashboard from './Dashboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home /> */}
      {/* <CarDetail /> */}
      <Dashboard />
      
    </>
  )
}

export default App
