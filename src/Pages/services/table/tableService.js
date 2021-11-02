import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/authService";


const getTables = async function(){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get('http://localhost:3000/tables/', config)
        return {
            status: response.status,
            success: response.data.success,
            data:response.data.tables
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {getTables}

const saveTable = async function(data){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.post('http://localhost:3000/tables/',data,config)
        console.log(response)
        return {
            status: response.status,
            success: response.data
        }
    } catch (error) {
        console.log(error.response)
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}

export {saveTable}