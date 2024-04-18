import React from 'react'

import "../styles/Titlebar.css"

const Titlebar = () => {
  return (
    <div id="titlebarContainer">
      <div id="titlebar" className="draggable">
        <span className="draggable">Mesh-Based File Manager</span>
      </div>
    </div>
  )
}

export default Titlebar