import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  return (
    <>
    <div className="desktop-sidebar">
       <Sidebar/>
    </div>
     <Main/>
    </>
  )
}

export default App
