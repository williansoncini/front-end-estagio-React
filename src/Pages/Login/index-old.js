import React from 'react'
import './login.css'

import { MdEmail, MdLock } from "react-icons/md";

const Login = () => {
    return (
        <div className="login">
            {/* <div className="login-logo">
                <img
                    src="https://anzuns.org/wp-content/uploads/2018/02/admin_login.png"
                    alt="Login App"
                />

            </div> */}
            <div className="login-right">
                <h1>Acessar app</h1>
                <div className="login-loginInputEmail">
                    <MdEmail />
                    <input
                        type="text"
                        placeholder="Digite um email"
                    />

                </div>
                <div className="login-loginInputPassword">
                    <MdLock />
                    <input
                        type="text"
                        placeholder="Digite sua senha"
                    />

                </div>

                <button type="submit">
                    Entrar
                </button>

                <h4>Não tenho conta!!</h4>

                <button type="submit">
                    Cadastrar
                </button>

            </div>

        </div>
    )
}

export default Login;

