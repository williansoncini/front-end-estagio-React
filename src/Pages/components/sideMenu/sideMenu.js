import './sideMenuStyle.css'
import { Icon } from '@iconify/react'
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { destroyUserFromLocalStorage } from '../../services/auth/authService';
import { useContext } from 'react';
import { AuthContext } from '../../providers/authProvider';
import { successToast } from '../../providers/toast/toastProvider';

const SideBar = function () {
    const [sideMenu, setSideMenu] = useState("home")
    const authContext = useContext(AuthContext)

    function logout(){
        destroyUserFromLocalStorage()
        authContext.setAuthenticated(false)
        successToast('Logout efetuado com successo!')
    }

    return (
        <>

            <div className='side-bar'>
                <div className='first-bar'>
                    <Icon className='itens-first-bar' icon="carbon:home" color="white" width="36" height="34" id='home' onClick={() => { setSideMenu('home') }} />
                    <Icon className='itens-first-bar' icon="majesticons:file-report-line" color="white" width="36" height="34" onClick={() => { setSideMenu('file') }} />
                    <Icon className='itens-first-bar' icon="carbon:user-filled" color="white" width="36" height="34" onClick={() => { setSideMenu('user') }} />
                    <Icon className='itens-first-bar' icon="carbon:document" color="white" width="36" height="34" onClick={() => { setSideMenu('report') }} />
                    <Icon className='itens-first-bar' icon="ri:logout-box-fill" color="white" width="36" height="34" onClick={() => { logout()}}/>
                </div>
                <div className='second-bar'>
                    <div className='second-bar-logo'>
                        <Logo />
                    </div>
                    {sideMenu == 'home' && (
                        <div className='second-bar-container-itens'>
                            <span className='second-bar-itens'> HOME </span>
                        </div>
                    )}
                    {sideMenu == 'user' && (
                        <div className='second-bar-container-itens'>
                            <Link to="/users" className='second-bar-itens'> Usuários </Link>
                            <Link to="/departaments" className='second-bar-itens'> Departamentos </Link>
                        </div>
                    )}
                    {sideMenu == 'file' && (
                        <div className='second-bar-container-itens'>
                            <Link to="/input/excel" className='second-bar-itens'> Importar arquivo Excel </Link>
                            <Link to="/tables" className='second-bar-itens'> Tabelas </Link>
                            <Link to="/categorys" className='second-bar-itens'> Categorias </Link>
                        </div>
                    )}
                    {sideMenu == 'report' && (
                        <div className='second-bar-container-itens'>
                            <Link to="/reports/acess" className='second-bar-itens'> Relatório de direito de acesso </Link>
                            <Link to="/reports/tables" className='second-bar-itens'> Relatório de operações feitas no banco de dados </Link>
                            <Link to="/" className='second-bar-itens'> Relatório de arquivos importados  </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SideBar;