import React, { useState } from 'react'
import './login.css'
import SubmitButton from '../components/button/submitButton/button'
import { Icon } from '@iconify/react'
import Logo from '../components/logo/logo'
import { SingIn } from '../services/auth/authService'
import { AuthContext } from '../providers/authProvider'
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { errorToast, successToast } from '../providers/toast/toastProvider'

const Login = function () {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const history = useHistory()
    const {setUserInLocalStorage, setAuthenticated, setTest} = React.useContext(AuthContext)

    const onSubmit = async (data) => {
        const email = data.email
        const password = data.password
        try {
            const response = await SingIn(email, password)
            if (response.status == 200) {
                setUserInLocalStorage(response.data)
                setAuthenticated(true)
                setTest('True')
                history.push('/')
                successToast(response.success)
            } else {
                errorToast(response.error)
            }
        } catch (error) {
            console.log(error)
            errorToast('Falha ao fazer login no servidor!')
        }
    }

    return (
        <div className='background'>
            <div className='menu-login'>
                <Logo />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='container'>
                            <Icon icon="bx:bxs-user" color="#212621" />
                            <input className={errors['email'] ? 'input-text-error' : 'input-text'} {...register('email', { required: true, maxLength: 50, minLength: 10 })} type="text" placeholder="Digite seu email" />
                        </div>
                        {errors['email']?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
                        {errors['email']?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
                        {errors['email']?.type === 'minLength' && (<div className='input-text-container-message-error'> Tamanho mínimo de 10 caracteres! </div>)}
                        <div className='container'>
                            <Icon icon="fluent:key-16-filled" color="#212621" />
                            <input className={errors['email'] ? 'input-text-error' : 'input-text'} {...register('password', { required: true, maxLength: 50/*, minLength: 6*/ })} type="password" placeholder="Digite sua senha" />
                        </div>
                        {errors['password']?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
                        {errors['password']?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
                        {errors['password']?.type === 'minLength' && (<div className='input-text-container-message-error'> Tamanho mínimo de 6 caracteres! </div>)}
                        <div className='buttons'>
                            <SubmitButton text='Entrar' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
