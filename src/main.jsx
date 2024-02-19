import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from "react-router-dom";
import ContextShare from "./Context/ContextShare.jsx";
import AuthContext from "./Context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <ContextShare>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextShare>
    </AuthContext>
  </React.StrictMode>,
)
