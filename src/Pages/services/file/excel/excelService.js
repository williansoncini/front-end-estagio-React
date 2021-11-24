import axios from "axios";
import { getTokenFromLocalStorage } from "../../auth/authService";

const importExcelOnServer = async function (file) {
    try {
        let token = getTokenFromLocalStorage()
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        let formData = new FormData()
        formData.append('excelFile', file)

        let response = {}
        response = await axios.post(`http://localhost:3000/upload/excel`, formData, config)
        console.log(response)
        // console.log('Soninha!')
        return {
            status: response.status,
            success: response.data.success,
            data: response.data.data
        }
    } catch (error) {
        // return error
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

export { importExcelOnServer }

export async function importFileWithCreateTable(data) {
    try {
        let token = getTokenFromLocalStorage()
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        
        let response = {}
        response = await axios.post(`http://localhost:3000/import/create`, data, config)
        console.log(response)

        // console.log('Soninha!')
        return {
            status: response.status,
            success: response.data.success,
            tabela_id: response.data.tabela_id
        }
    } catch (error) {
        // return error
        return {
            status: error.response.status,
            error: error.response.error
        }
    }
}

export async function importDataIntoTable(data){
    try {
        let token = getTokenFromLocalStorage()
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        
        let response = {}
        response = await axios.post(`http://localhost:3000/import/table`, data, config)

        return {
            status: response.status,
            success: response.data.success,
            tabela_id: response.data.tabela_id
        }
    } catch (error) {
        // return error
        return {
            status: error.response.status,
            error: error.response.error
        }
    }
}