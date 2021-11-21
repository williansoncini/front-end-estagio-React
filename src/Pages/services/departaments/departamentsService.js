import axios from 'axios'
import { errorToast } from '../../providers/toast/toastProvider'
import { getTokenFromLocalStorage } from '../auth/authService'

const getDepartaments = async function () {
    let token = getTokenFromLocalStorage()
    const bodyParameters = {}
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    const response = await axios.get('http://localhost:3000/departaments/', config)
    if (response.status !== 200)
        return { status: 400 }
    const departaments = response.data
    return departaments
}

export { getDepartaments }

const getDepartaments_new = async function () {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get('http://localhost:3000/departaments/', config)
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

export { getDepartaments_new }

const getNamesDepartaments = async function () {
    const departaments = await getDepartaments()
    let nameDepartaments = []
    for (let i = 0; i < departaments.length; i++) {
        nameDepartaments.push(departaments[i].descricao)
    }

    return nameDepartaments
}

export { getNamesDepartaments }

const getArrayNameAndIdDepartaments = async function () {
    const response = await getDepartaments()
    const departaments = response.data

    let nameAndIdDepartaments = []
    for (let i = 0; i < departaments.length; i++) {
        nameAndIdDepartaments.push({
            name: departaments[i].descricao,
            value: departaments[i].id
        })
    }
    return nameAndIdDepartaments
}

export { getArrayNameAndIdDepartaments }

const getDepartament = async function (id) {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.get(`http://localhost:3000/departaments/${id}`, config)
        return {
            status: response.status,
            success: response.data.success,
            data: response.data.data
        }
    } catch (error) {
        console.log(error.response)
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}
export { getDepartament }

const updateDepartament = async function (id, data) {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.put(`http://localhost:3000/departaments/${id}`, data, config)
        // console.log(response)
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

export { updateDepartament }

const saveDepartament = async function (data) {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.post('http://localhost:3000/departaments', data, config)
        return {
            status: response.status,
            success: response.data.success,
            data: response.data.data
        }
    } catch (error) {
        console.log(error.response)
        return {
            status: error.response.status,
            error: error.response.data
        }
    }
}

export { saveDepartament }

const deleteDepartament = async function (id) {
    let token = getTokenFromLocalStorage()
    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    let response = {}
    try {
        response = await axios.delete(`http://localhost:3000/departaments/${id}`, config)
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

export { deleteDepartament }