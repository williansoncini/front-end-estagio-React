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
        formData.append('excelFile',file)

        let response = {}
        response = await axios.post(`http://localhost:3000/upload/excel`, formData, config)
        // return response
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

export {importExcelOnServer}