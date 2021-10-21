import React, {useState} from 'react'
import './login.css'
import SubmitButton from '../components/button/submitButton/button'
import { Icon } from '@iconify/react'
import Logo from '../components/logo/logo'
import singIn from '../services/auth/authService'
import { useAuth } from '../providers/authProvider'

const Login = function(){
    const {email, setEmail} = useAuth()
    console.log(email)
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function clickSingIn(e){
        const emailChange = email
        localStorage.setItem('email',JSON.stringify(emailChange))
        setEmail(emailChange.name)
        // return await singIn(email, password)
    }

    return (
        <div className='background'>
            <div className='menu-login'>
                <Logo/>
                <form action="" method="post">
                    <div>
                        <div className='container'>
                            <Icon icon="bx:bxs-user" color="#212621"/>
                            <input type="text" name="login" id="login" placeholder='Login' className='input-text' value={email.name} onChange={(event) => setEmail({name:event.target.value})}/>
                        </div>
                        <div className='container'>
                            <Icon icon="fluent:key-16-filled" color="#212621"/>
                            <input type="password" name="senha" id="senha" placeholder='Senha' className='input-text' value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className='buttons'>
                            <SubmitButton text='Entrar' name='teste' script={clickSingIn}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
