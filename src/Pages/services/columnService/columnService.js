import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/authService";

const saveColumns = async function(data){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.post('http://localhost:3000/columns/',data,config)
        return {
            status: response.status,
            success: response.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}

export {saveColumns}