// import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route } from "react-router-dom";
import SideBar from '../components/sideMenu/sideMenu';
import Home from '../home/home'
import Login from '../Login/login'
import { AuthContext } from '../providers/authProvider';
import { getTokenFromLocalStorage } from '../services/auth/authService';
import CreateUser from '../Users/create/createUser';
import DeleteUser from '../Users/delete/deleteUser';
import UsersList from '../Users/home/usersList';
import UpdateUser from '../Users/update/updateUser';

const Routes = function () {
    const { checkAuthentication } = useContext(AuthContext)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    // checkAuthentication()
    console.log(authenticated)
    useEffect(async function () {
        const valid = await checkAuthentication()
        if (valid) {
            setAuthenticated(true)
            setLoading(false)
        }
        else
            setAuthenticated(false)
    })

    return (
        <>
            {authenticated && <SideBar />}
            <Switch>
                <Route exact path='/login'> {authenticated ? <Home /> : <Login />} </Route>
                <Route exact path='/'> {authenticated ? <Home /> : <Login />} </Route>
                <Route exact path='/users'> {authenticated ? <UsersList /> : <Login />} </Route>
                <Route exact path='/users/create'> {authenticated ? <CreateUser /> : <Login />} </Route>
                <Route exact path='/users/update/:id'> {authenticated ? <UpdateUser /> : <Login />} </Route>
                <Route exact path='/users/delete/:id'> {authenticated ? <DeleteUser /> : <Login />} </Route>
                {/* <Route exact path='/login'> {authenticated?<Home/>:<Login/>}  </Route>
                            <Route exact path='/home'>  {authenticated?<Home/>:<Login/>}  </Route> */}
                {/* <Route path='/home'>  <Home/> </Route> */}
                <Route path='*'> <h6>Not Found!</h6> </Route>
            </Switch>
        </>
    )
}

export default Routes