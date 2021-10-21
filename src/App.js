import React from 'react';
import Login from './Pages/Login/login';
import SideMenu from './Pages/components/sideMenu/sideMenu';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthContext } from './Pages/providers/authProvider';

function App() {
  const user = React.useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
          <Switch>
            <Route path="/login"><Login/></Route>
            <Route path="/home"><SideMenu/></Route>
            <Route path="*"><SideMenu/></Route>
          </Switch>
      </BrowserRouter>
      <script src="https://code.iconify.design/2/2.0.4/iconify.min.js"></script>
    </>
  )
}

export default App;