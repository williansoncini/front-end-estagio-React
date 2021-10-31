import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './Pages/providers/authProvider';
import Routes from './Pages/router/routes'
import './App.css'
import {ToastComponent} from './Pages/components/toast/ToastComponent';

function App() {
  // const [autenticated, setAutenticated] = useState(false)
  
  
  // console.log(user)

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  return (
    <>
      <BrowserRouter>
       
        <Routes />
      </BrowserRouter>
      <ToastComponent/>
    </>
  )
}

export default App;