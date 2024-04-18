import React from 'react'

import "../styles/App.css"
import FileTree from './FileTree.jsx'

const App = () => {
  return (
    <div className='wrapper'>
      <FileTree />
      <p>Hello, Electron!!!</p>
    </div>
  )
}

export default App