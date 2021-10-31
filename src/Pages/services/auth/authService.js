import axios from 'axios'

const SingIn = async function(email, password){
    const config = {
        auth:{
            username:email,
            password:password
        }
    }
    try {
        const response = await axios.post('http://localhost:3000/login/',{},config)
        console.log(response)
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

export {getTokenFromLocalStorage}