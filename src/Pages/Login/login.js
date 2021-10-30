import React, { useState } from 'react'
import './login.css'
import SubmitButton from '../components/button/submitButton/button'
import { Icon } from '@iconify/react'
import Logo from '../components/logo/logo'
import { SingIn } from '../services/auth/authService'
import { useAuth } from '../providers/authProvider'
import { useHistory, Link } from 'react-router-dom';

const Login = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    // const history = useHistory();

    async function ClickSingIn(e) {
        try {
            const response = await SingIn(email, password)
            if (response.status !== 200) {
                return false
            }
            else {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                setUser(response.data.user)
            }
        } catch (error) {
            alert('Erro na api')
        }
    }

    return (
        <div className='background'>
            <div className='menu-login'>
                <Logo />
                <form action="" method="post">
                    <div>
                        <div className='container'>
                            <Icon icon="bx:bxs-user" color="#212621" />
                            <input type="text" name="login" id="login" placeholder='Login' className='input-text' value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='container'>
                            <Icon icon="fluent:key-16-filled" color="#212621" />
                            <input type="password" name="senha" id="senha" placeholder='Senha' className='input-text' value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className='buttons'>
                            <Link to="/"><SubmitButton text='Entrar' name='teste' script={ClickSingIn} /> </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
