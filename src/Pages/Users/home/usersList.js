import { Icon } from "@iconify/react"
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import SideBar from "../../components/sideMenu/sideMenu"
import Title from "../../components/title/title"
import getUsers from "../../services/users/usersService"
import CreateUser from "../create/createUser"
import './usersList.css'


export default class UsersList extends React.Component{
    state = {
        loading:true,
        users:null
    };

    async componentDidMount(){
        console.log('to aqui no didmount')
        const users = await getUsers()
        console.log(users)
        this.setState({
            users:users,
            loading:false
        })
    }
    
    render(){
        return(
            <>
                <SideBar/>
                <div className='content-container'>
                    <div className='header'>
                        <Title text='Cadastro de usuários'/>
                        <div className='buttons-container'>
                            <button className='button filter-button'>  
                                <span>Filtro</span>
                                <Icon icon="ant-design:filter-filled" color="black" width="36" height="34"/>
                            </button>
                            <Link to="/users/create">
                                <button className='button add-button'> 
                                    <span>Adicionar</span>
                                    <Icon icon="carbon:add-alt" color="#177359" width="36" height="34"/>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='body-container'>
                            <div>
                                {this.state.loading? (
                                    <div> Carregando... </div>):(
                                        <div className='full-size-table'>
                                            <table className='styled-table'>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        {/* <th>Login</th> */}
                                                        <th>Nome</th>
                                                        <th>Departamento</th>
                                                        <th>Email</th>
                                                        <th>Status</th>
                                                        <th>Acesso</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                    <tr>
                                                        <td>{this.state.users.map(user => (user.id))} </td>
                                                        <td>{this.state.users.map(user => (user.nome))} </td>
                                                        <td>{this.state.users.map(user => (user.departamento))} </td>
                                                        <td>{this.state.users.map(user => (user.email))} </td>
                                                        <td>{this.state.users.map(user => (user.ativo))} </td>
                                                        <td> Tem que fazer </td>
                                                        <td> Colocar dois botões aqui </td>
                                                    </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }    
                            </div>
                    </div>  
                </div>
            </>
        )
    }
}
