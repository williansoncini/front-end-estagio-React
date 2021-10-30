import axios from 'axios'

const SingIn = async function(email, password){
    let status = 0
    let responseSuccess 
    let responseError

    await axios.post('http://localhost:3000/login/',{},{
            auth:{
                username:email,
                password:password
            }
        }
    ).then(function (response){
        status = response.status
        if (status === 200){
            responseSuccess = {
                'status':status,
                'data':response.data
            }
        }
    }).catch(function (error){
        responseError = {
            'status': error.response.status,
            'data': error.response.data
        }
    })

    if (responseSuccess)
        return responseSuccess
    else
        return responseError
}

export {SingIn}

const getTokenFromLocalStorage = function(){
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    return token
}

export {getTokenFromLocalStorage}