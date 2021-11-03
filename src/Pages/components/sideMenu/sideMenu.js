import './sideMenuStyle.css'
import { Icon } from '@iconify/react'
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const SideBar = function () {
    const [sideMenu, setSideMenu] = useState("home")
    return (
        <>

            <div className='side-bar'>
                <div className='first-bar'>
                    <Icon className='itens-first-bar' icon="carbon:home" color="white" width="36" height="34" id='home' onClick={() => { setSideMenu('home') }} />
                    <Icon className='itens-first-bar' icon="majesticons:file-report-line" color="white" width="36" height="34" onClick={() => { setSideMenu('file') }} />
                    <Icon className='itens-first-bar' icon="carbon:user-filled" color="white" width="36" height="34" onClick={() => { setSideMenu('user') }} />
                    <Icon className='itens-first-bar' icon="carbon:document" color="white" width="36" height="34" />
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
                        </div>
                    )}
                    {sideMenu == 'file' && (
                        <div className='second-bar-container-itens'>
                            <Link to="/input/excel" className='second-bar-itens'> Importar arquivo Excel </Link>
                            <Link to="/tables" className='second-bar-itens'> Tabelas </Link>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default SideBar;