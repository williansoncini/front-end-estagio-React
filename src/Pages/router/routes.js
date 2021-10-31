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

export default class Routes extends React.Component {
    // state = {
    //     // loading: true
    //     // authenticated: false,
    //     // teste:'false'
    // }

    static contextType = AuthContext
    // const { checkAuthentication } = useContext(AuthContext)

    async componentDidMount() {
        console.log('Estou no did mount')
        const valid = await this.context.checkAuthentication() /*checkAuthentication()*/
        if (valid) {
            this.context.setAuthenticated(true)
            this.context.setTest('True')
            // this.setState({
            //     authenticated: true,
            //     loading: false,
            //     teste:'true'
            // })
        }
        else{
        //     this.setState({ authenticated: false })
            this.context.setAuthenticated(false)
            this.context.setTest('False')
        }
    }

    render() {
        // const Routes = function () {

        // const [authenticated, setAuthenticated] = useState(false)
        // const [loading, setLoading] = useState(true)
        // checkAuthentication()
        // console.log(this.state.authenticated)
        // useEffect(async () => {

        // })

        return (
            <>
                <h6>Autenticado? - {this.context.test}</h6>
                {this.context.authenticated && <SideBar />}
                <Switch>
                    <Route exact path='/login'> {this.context.authenticated ? <Home /> : <Login />} </Route>
                    <Route exact path='/'> {this.context.authenticated ? <Home /> : <Login />} </Route>
                    <Route exact path='/users'> {this.context.authenticated ? <UsersList /> : <Login />} </Route>
                    <Route exact path='/users/create'> {this.context.authenticated ? <CreateUser /> : <Login />} </Route>
                    <Route exact path='/users/update/:id'> {this.context.authenticated ? <UpdateUser /> : <Login />} </Route>
                    <Route exact path='/users/delete/:id'> {this.context.authenticated ? <DeleteUser /> : <Login />} </Route>
                    {/* <Route exact path='/login'> {authenticated?<Home/>:<Login/>}  </Route>
                            <Route exact path='/home'>  {authenticated?<Home/>:<Login/>}  </Route> */}
                    {/* <Route path='/home'>  <Home/> </Route> */}
                    <Route path='*'> <h6>Not Found!</h6> </Route>
                </Switch>
            </>
        )
    }
}

// export default Routes