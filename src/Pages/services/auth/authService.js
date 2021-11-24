import axios from 'axios'
import { useHistory } from 'react-router'

const SingIn = async function(email, password){
    const config = {
        auth:{
            username:email,
            password:password
        }
    }
    try {
        const response = await axios.post('http://localhost:3000/login/',{},config)
        return{
            status: response.status,
            success: response.data.success,
            data: response.data.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {SingIn}

const getTokenFromLocalStorage = function(){
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    return token
}

const getUserFromLocalStorage = function(){
    return JSON.parse(localStorage.getItem('user'))
}

export {getTokenFromLocalStorage}

export function destroyUserFromLocalStorage(){
    return localStorage.removeItem('user')
}   
