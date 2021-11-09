import axios from "axios";
import { getTokenFromLocalStorage } from "../../auth/authService";

const getTypeColumns = async function(){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get('http://localhost:3000/typeColumns/', config)
        return {
            status: response.status,
            success: response.data.success,
            data:response.data.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {getTypeColumns}