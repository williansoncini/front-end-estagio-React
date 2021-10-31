import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { AuthContext } from './Pages/providers/authProvider';
import Routes from './Pages/router/routes'
import './App.css'
import {ToastComponent} from './Pages/components/toast/ToastComponent';
// import SideBar from './Pages/components/sideMenu/sideMenu';

function App() {
  // const [autenticated, setAutenticated] = useState(false)
  // const user = React.useContext(AuthContext)
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