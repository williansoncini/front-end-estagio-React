// import axios from 'axios'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from '../home/home'
import Login from '../Login/login'
import { getTokenFromLocalStorage } from '../services/auth/authService';
import CreateUser from '../Users/create/createUser';
import UsersList from '../Users/home/usersList';
import UpdateUser from '../Users/update/updateUser';

const Routes = function (){
    let authenticated = checkAuthentication()

    function checkAuthentication(){
        try {
            const token = getTokenFromLocalStorage()
            if (token != null)
                return true
            else
                return false
        } catch (error) {
            return false
        }
    }

    return(
        <Switch>
            <Route exact path='/'>  <Home/> </Route>
            <Route exact path='/login'> <Login/>  </Route>
            <Route exact path='/users'>  <UsersList/> </Route>
            <Route exact path='/users/create'>  <CreateUser/> </Route>
            <Route exact path='/users/update/:id'>  <UpdateUser/> </Route>
            {/* <Route exact path='/login'> {authenticated?<Home/>:<Login/>}  </Route>
            <Route exact path='/home'>  {authenticated?<Home/>:<Login/>}  </Route> */}
            {/* <Route path='/home'>  <Home/> </Route> */}
            <Route path='*'> <h6>Not Found!</h6> </Route>
        </Switch>
    )
}

export default Routes