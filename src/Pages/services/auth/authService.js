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

    // console.log(responseSuccess)
    // console.log(responseError)

    if (responseSuccess)
        return responseSuccess
    else
        return responseError
}

export default SingIn