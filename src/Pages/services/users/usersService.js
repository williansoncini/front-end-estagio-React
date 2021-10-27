import axios from 'axios'
import { getTokenFromLocalStorage } from '../auth/authService'

const getUsers = async function(){
    let token = getTokenFromLocalStorage()
    console.log(token)
    const bodyParameters = {}
    const config = {
        headers:{"Authorization":`Bearer ${token}`}
    };
    
    const response = await axios.get('http://localhost:3000/users/',config)
    if (response.status !== 200)
        return {status:400}
    const users = response.data
    return users
    // await axios.get('http://localhost:3000/users/',bodyParameters,config).then(function(response){
    //     status = response.status
    //     if (status == 200){
    //         users = response.data.users
    //     }
    // }).catch(function (error){
    //     status = 400
    //     console.log(error)
    // })
    
    // console.log(users)
    // console.log(status)
    // return {users,status}
}

export default getUsers