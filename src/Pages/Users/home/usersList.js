import { Icon } from "@iconify/react"
import React from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "../../components/button/deleteIcon/deleteIcon"
import EditIcon from "../../components/button/editIcon/editIcon"
import SideBar from "../../components/sideMenu/sideMenu"
import Title from "../../components/title/title"
import {getUsers} from "../../services/users/usersService"
import './usersList.css'

export default class UsersList extends React.Component{
    state = {
        loading:true,
        users:null,
        savedUser:false
    };

    async componentDidMount(){
        const users = await getUsers()
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
                                                    {this.state.users.map((user) => {
                                                        return (
                                                            <tr>
                                                                <td> {user.id} </td>
                                                                <td> {user.nome} </td>
                                                                <td> {user.departamento} </td>
                                                                <td> {user.email} </td>
                                                                <td> {user.ativo} </td>
                                                                <td> Tem que fazer </td>
                                                                <td>
                                                                        <EditIcon path={`users/update/${user.id}`} />
                                                                        <DeleteIcon/>
                                                                        {/* <div>
                                                                            <Icon icon="bi:trash" color="#212621" width="20" height="20"/>
                                                                        </div> */}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
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
