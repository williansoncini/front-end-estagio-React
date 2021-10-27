import { Icon } from "@iconify/react"
import React from "react"
import SideBar from "../../components/sideMenu/sideMenu"
import Title from "../../components/title/title"
import getUsers from "../../services/users/usersService"
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
                            <button className='button add-button'>  
                                <span>Adicionar</span>
                                <Icon icon="carbon:add-alt" color="#177359" width="36" height="34"/>
                            </button>
                        </div>
                    </div>
                    <div className='body-container'>
                        <div className='table-users'>
                            <div>
                                {this.state.loading? (
                                    <div> Carregando... </div>):(
                                        <div>{this.state.users.map(user => (
                                            user.nome
                                        ))}</div>
                                    )
                                }    
                            </div>
                        </div>
                    </div>  
                </div>
            </>
        )
    }
}


// const UsersList = function(){
   
//     return (
//         <>
//             <SideBar/>
//             <div className='content-container'>
//                 <div className='header'>
//                     <Title text='Cadastro de usuários'/>
//                     <div className='buttons-container'>
//                         <button className='button filter-button'>  
//                             <span>Filtro</span>
//                             <Icon icon="ant-design:filter-filled" color="black" width="36" height="34"/>
//                         </button>
//                         <button className='button add-button'>  
//                             <span>Adicionar</span>
//                             <Icon icon="carbon:add-alt" color="#177359" width="36" height="34"/>
//                         </button>
//                     </div>
//                 </div>
//                 <div className='body-container'>
//                     <div className='table-users'>
//                     Body
//                     </div>
//                 </div>  
//             </div>
//         </>
//     )
// }

// export default UsersList