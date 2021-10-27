import { Icon } from "@iconify/react"
import SideBar from "../../components/sideMenu/sideMenu"
import Title from "../../components/title/title"
// import getUsers from "../services/users/usersService"

const UsersList = function(){
    // const users = getUsers()

    return (
        <>
            <SideBar/>
            <div className='container'>
                <div className='header'>
                    <Title text='Cadastro de usuários'/>
                    <div className='filter-button'>
                        <button>Filtro</button>
                        <Icon icon="ant-design:filter-filled" color="white" width="36" height="34" />
                    </div>
                    <div className='filter-button'>
                        <Icon/>
                        <button>Filtro</button>
                    </div>
                </div>
                <div className='body'>
                    <div className='table-users'>
                       teste
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersList