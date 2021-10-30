import axios from 'axios'
import { getTokenFromLocalStorage } from '../auth/authService'

const getUsers = async function(){
    let token = getTokenFromLocalStorage()
    const bodyParameters = {}
    const config = {
        headers:{"Authorization":`Bearer ${token}`}
    };
    
    const response = await axios.get('http://localhost:3000/users/',config)
    if (response.status !== 200)
        return {status:400}
    const users = response.data
    return users
}

export {getUsers}

const saveUser = async function(user){
    let token = getTokenFromLocalStorage()
    const bodyParameters = {}
    const config = {
        headers:{"Authorization":`Bearer ${token}`}
    };
    let response = {}
    try {
        response = await axios.post('http://localhost:3000/users/',user,config)
        return {
            status: response.status,
            success: response.data.success
        }
        
    } catch (error) {
        return {
            status:error.response.status,
            error:error.response.data.error
        }
    }
}

export {saveUser}

const getUserById = async function(id){
    let token = getTokenFromLocalStorage()
    const bodyParameters = {}
    const config = {
        headers:{"Authorization":`Bearer ${token}`}
    };
    let response = {}
    try {
        response = await axios.get(`http://localhost:3000/users/${id}`,config)
        return {
            status: response.status,
            success: response.data.success,
            data: response.data.user
        }
    } catch (error) {
        return {
            status:error.response.status,
            error:error.response.data.error
        }
    }
}

export {getUserById}