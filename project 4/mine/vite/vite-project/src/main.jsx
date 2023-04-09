import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router , Routes, Route, useNavigate} from "react-router-dom"
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename='/socialapp'>
      <App />

    </Router>
  </React.StrictMode>,
)
