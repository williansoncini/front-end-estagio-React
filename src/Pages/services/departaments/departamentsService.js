import axios from 'axios'
import { getTokenFromLocalStorage } from '../auth/authService'

const getDepartaments = async function(){
    let token = getTokenFromLocalStorage()
    console.log(token)
    const bodyParameters = {}
    const config = {
        headers:{"Authorization":`Bearer ${token}`}
    };
    
    const response = await axios.get('http://localhost:3000/departaments/',config)
    if (response.status !== 200)
        return {status:400}
    const departaments = response.data
    return departaments
}

export default getDepartaments