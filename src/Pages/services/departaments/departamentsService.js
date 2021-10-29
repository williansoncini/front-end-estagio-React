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

export {getDepartaments}

const getNamesDepartaments = async function (){
    const departaments = await getDepartaments()
    let nameDepartaments = []
    for(let i=0; i < departaments.length; i++){
        console.log(departaments[i].descricao)
        nameDepartaments.push(departaments[i].descricao)
    }
    console.log(nameDepartaments)
    return nameDepartaments
}

export {getNamesDepartaments}

const getArrayNameAndIdDepartaments = async function (){
    const departaments = await getDepartaments()
    let nameAndIdDepartaments = []
    for(let i=0; i < departaments.length; i++){
        nameAndIdDepartaments.push({
            name: departaments[i].descricao,
            value: departaments[i].id
        })
    }
    return nameAndIdDepartaments
}

export {getArrayNameAndIdDepartaments}