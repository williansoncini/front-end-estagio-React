// import axios from 'axios'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from '../home/home'
import Login from '../Login/login'
import UsersList from '../Users/home/usersList';

const Routes = function (){
    let authenticated = checkAuthentication()
    // console.log('Passei na autenticação')
    console.log(authenticated)

    function checkAuthentication(){
        try {
            console.log('Passei no check da autenticação')
            const token = getTokenFromLocalStorage()
            if (token != null)
                return true
            else
                return false
        } catch (error) {
            return false
        }
    }

    function getTokenFromLocalStorage(){
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.token
        return token
    }
    return(
        <Switch>
            <Route exact path='/login'> <Login/>  </Route>
            <Route exact path='/home'>  <Home/> </Route>
            <Route exact path='/users'>  <UsersList/> </Route>
            {/* <Route exact path='/login'> {authenticated?<Home/>:<Login/>}  </Route>
            <Route exact path='/home'>  {authenticated?<Home/>:<Login/>}  </Route> */}
            {/* <Route path='/home'>  <Home/> </Route> */}
            <Route path='*'> <h6>Not Found!</h6> </Route>
        </Switch>
    )
}

export default Routes