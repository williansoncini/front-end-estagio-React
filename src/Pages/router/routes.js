// import axios from 'axios'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import CreateCategory from '../categorys/createCategory';
import DeleteCategory from '../categorys/deleteCategory';
import ListCategorys from '../categorys/listCategorys';
import UpdateCategory from '../categorys/updateCategory';
import SideBar from '../components/sideMenu/sideMenu';
import CreateDepartament from '../departaments/createDepartament';
import DeleteDepartament from '../departaments/deleteDepartament';
import ListDepartaments from '../departaments/listDepartament';
import UpdateDepartament from '../departaments/updateDepartament';
import InputExcel from '../Files/Excel/input/inputExcel';
import Home from '../home/home'
import Login from '../Login/login'
import { AuthContext } from '../providers/authProvider';
import ReportAcess from '../reports/reportAcess';
import ReportTables from '../reports/reportTables';
import CreateTable from '../tables/create/createTable';
import InsertDataOnTable from '../tables/data/insertData';
import UpdateDataInTable from '../tables/data/updateData';
import DeleteTable from '../tables/delete/deleteTable';
import ListTables from '../tables/list/listTables';
import UpdateTable from '../tables/update/updateTable';
import CreateUser from '../Users/create/createUser';
import DeleteUser from '../Users/delete/deleteUser';
import UsersList from '../Users/home/usersList';
import UpdateUser from '../Users/update/updateUser';

export default class Routes extends React.Component {
    static contextType = AuthContext

    async componentDidMount() {
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
                    <Route exact path='/tables/update/:id'> {this.context.authenticated ? <UpdateTable /> : <Login />} </Route>
                    <Route exact path='/tables/delete/:id'> {this.context.authenticated ? <DeleteTable /> : <Login />} </Route>
                    <Route exact path='/tables/:id/data/insert'> {this.context.authenticated ? <InsertDataOnTable /> : <Login />} </Route>
                    <Route exact path='/tables/:id/data/update'> {this.context.authenticated ? <UpdateDataInTable /> : <Login />} </Route>

                    <Route exact path='/categorys'> {this.context.authenticated ? <ListCategorys /> : <Login />} </Route>
                    <Route exact path='/categorys/create'> {this.context.authenticated ? <CreateCategory /> : <Login />} </Route>
                    <Route exact path='/categorys/update/:id'> {this.context.authenticated ? <UpdateCategory /> : <Login />} </Route>
                    <Route exact path='/categorys/delete/:id'> {this.context.authenticated ? <DeleteCategory /> : <Login />} </Route>

                    <Route exact path='/departaments/'> {this.context.authenticated ? <ListDepartaments /> : <Login />} </Route>
                    <Route exact path='/departaments/create'> {this.context.authenticated ? <CreateDepartament /> : <Login />} </Route>
                    <Route exact path='/departaments/update/:id'> {this.context.authenticated ? <UpdateDepartament /> : <Login />} </Route>
                    <Route exact path='/departaments/delete/:id'> {this.context.authenticated ? <DeleteDepartament /> : <Login />} </Route>

                    <Route exact path='/reports/acess'> {this.context.authenticated ? <ReportAcess /> : <Login />} </Route>
                    <Route exact path='/reports/tables'> {this.context.authenticated ? <ReportTables/> : <Login />} </Route>

                    <Route path='*'>  {this.context.authenticated ? <h6>Not Found!</h6> : <Login />} </Route>
                </Switch>
            </>
        )
    }
}