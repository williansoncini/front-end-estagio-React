// import axios from 'axios'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import SideBar from '../components/sideMenu/sideMenu';
import InputExcel from '../Files/Excel/input/inputExcel';
import Home from '../home/home'
import Login from '../Login/login'
import { AuthContext } from '../providers/authProvider';
import CreateTable from '../tables/create/createTable';
import ListTables from '../tables/list/listTables';
import CreateUser from '../Users/create/createUser';
import DeleteUser from '../Users/delete/deleteUser';
import UsersList from '../Users/home/usersList';
import UpdateUser from '../Users/update/updateUser';

export default class Routes extends React.Component {
    static contextType = AuthContext

    async componentDidMount() {
        // console.log('Estou no did mount')
        const valid = await this.context.checkAuthentication()
        if (valid) {
            this.context.setAuthenticated(true)
            this.context.setTest('True')
        }
        else {
            this.context.setAuthenticated(false)
            this.context.setTest('False')
        }
    }

    render() {
        return (
            <>
                {/* <h6>Autenticado? - {this.context.test}</h6> */}
                {this.context.authenticated && <SideBar />}
                <Switch>
                    <Route exact path='/login'> {this.context.authenticated ? <Home /> : <Login />} </Route>
                    <Route exact path='/'> {this.context.authenticated ? <Home /> : <Login />} </Route>
                    <Route exact path='/users'> {this.context.authenticated ? <UsersList /> : <Login />} </Route>
                    <Route exact path='/users/create'> {this.context.authenticated ? <CreateUser /> : <Login />} </Route>
                    <Route exact path='/users/update/:id'> {this.context.authenticated ? <UpdateUser /> : <Login />} </Route>
                    <Route exact path='/users/delete/:id'> {this.context.authenticated ? <DeleteUser /> : <Login />} </Route>
                    <Route exact path='/input/excel'> {this.context.authenticated ? <InputExcel /> : <Login />} </Route>
                    <Route exact path='/tables'> {this.context.authenticated ? <ListTables /> : <Login />} </Route>
                    <Route exact path='/tables/create'> {this.context.authenticated ? <CreateTable /> : <Login />} </Route>
                    <Route path='*'>  {this.context.authenticated ? <h6>Not Found!</h6> : <Login />} </Route>
                </Switch>
            </>
        )
    }
}