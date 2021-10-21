import axios from 'axios'

const singIn = async function(email, password){
    let status = 0
    let responseSuccess = {}
    let responseError = {}
    let token = ''

    await axios.post('http://localhost:3000/login/',{},{
            auth:{
                username:email,
                password:password
            }
        }
    ).then(function (response){
        status = response.status

        if (status === 200){
            token = response.data.user.token
            responseSuccess = response.data.sucess
            return({
                'response':responseSuccess,
                'token':token
            })
        }
    }).catch(function (error){
        responseError = error.response.data.error
        return console.log(responseError)
    })
}

export default singIn