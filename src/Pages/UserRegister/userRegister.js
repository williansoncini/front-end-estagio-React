import React from 'react'
import './userRegister.css'

const UserRegister = () => {
    return (
        <div className="UserRegister">
            <h1>Cadastro de novo usuario</h1>
            <div className="UserLogin">
                <label>Login:  </label>
                    <input
                        type="text"
                        placeholder="Digite um Login"
                    />
                </div>
                <div className="UserName">
                <label>Nome</label>
                    <input
                        type="text"
                        placeholder="Digite seu Nome"
                    />
                </div>
                <div className="UserDepartament">
                <label>Departamento: </label>
                    <input
                        type="text"
                        placeholder="Digite um departamento"
                    />
                </div>
                <div className="UserEmail">
                <label>Email: </label>
                    <input
                        type="text"
                        placeholder="Digite um Email"
                    />
                </div>
                <div className="UserPassword">
                <label>Senha: </label>
                    
                    <input
                        type="text"
                        placeholder="Digite sua senha"
                    />
                </div>

                <div className="UserStatus">
                <label>Status</label>
                    <select>
                        <option value="statusAtivo">Ativo</option>
                        <option value="statusDesativado">Desativado</option>
                        
                    </select>
                </div>
                <div className="UserAcess">
                <label>Acesso</label>
                    <select>
                        <option value="acessComun">Comun</option>
                        <option value="acesssSupervisor">Supervisor</option>
                        <option value="acessAdministrador">Administrador</option>
                        
                    </select>
                </div>
            <div className="UserSave">
            <button className="Btsave"type="submit">
                    salvar
                </button>
            </div>

            <div className="UserCancel">
                <button className="BtCancel"type= "submit">
                    Cancelar
                </button>

            </div>
           
        </div>
    )
}

export default UserRegister;
