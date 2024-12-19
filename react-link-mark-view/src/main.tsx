import './app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Editor from './editor.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)
