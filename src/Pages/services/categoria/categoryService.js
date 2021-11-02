import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/authService";


const getCategorys = async function () {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get('http://localhost:3000/categorys/', config)
        return {
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

export { getCategorys }

const getCategoryIdAndName = async () => {
    let response = {}
    try {
        response = await getCategorys()
        const categorys = response.data
        let nameAndId = []
        for (let i = 0; i < categorys.length; i++) {
            nameAndId.push({
                name: categorys[i].descricao,
                value: categorys[i].id
            })
        }
        return nameAndId
    } catch (error) {
        return {error: error.response.data.error}
    }
}

export { getCategoryIdAndName }