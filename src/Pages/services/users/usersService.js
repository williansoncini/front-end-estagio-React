import axios from 'axios'

const getUsers = async function(){
    let users = {}
    let status = 0

    await axios.get('http://localhost:3000/users/',{}).then(function(response){
        status = response.status
        if (status == 200){
            users = response.data.users
        }
    }).catch(function (error){
        status = 400
    })
    
    return {users,status}
}

export default getUsers