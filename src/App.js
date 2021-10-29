import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { AuthContext } from './Pages/providers/authProvider';
import Routes from './Pages/router/routes'
import './App.css'

function App() {
  // const user = React.useContext(AuthContext)
  return (
      <BrowserRouter>
        <Routes>

        </Routes>
      </BrowserRouter>
  )
}

export default App;