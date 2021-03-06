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

export {saveTable}

const getTableById = async function(id){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get(`http://localhost:3000/tables/${id}`, config)
        return {
            status: response.status,
            success: response.data.success,
            data:response.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {getTableById}

const updateTable = async function(id, data){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.put(`http://localhost:3000/tables/${id}`, data, config)
        console.log(response)
        return {
            status: response.status,
            success: response.success
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {updateTable}

const deleteTable = async function(id){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.delete(`http://localhost:3000/tables/${id}`, config)
        console.log(response)
        return {
            status: response.status,
            success: response.success
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export {deleteTable}

export async function insertDataIntoTable(id, data){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.post(`http://localhost:3000/tables/${id}/data`, data,config)
        console.log(response)
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

export async function getDataFromTable(id){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get(`http://localhost:3000/tables/${id}/data`, config)
        return {
            status: response.status,
            success: response.success,
            data: response.data.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}

export async function getLogTables(){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get(`http://localhost:3000/logs/tables/`, config)
        console.log(response)
        return {
            status: response.status,
            success: response.success,
            data: response.data.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}

export async function deleteRowFromTable(tableId, rowId){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.delete(`http://localhost:3000/tables/${tableId}/data/${rowId}`, config)
        console.log(response)
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

export async function updateDataFromTable (tableId, data){
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.put(`http://localhost:3000/tables/${tableId}/data/`,data, config)
        console.log(response)
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