import './sideMenuStyle.css'
import { Icon } from '@iconify/react'
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const SideBar = function () {
    const [sideMenu, setSideMenu] = useState("home")
    // const {authenticated} = React.useContext(AuthContext)
    // console.log(authenticated)

    return (
        <>

            <div className='side-bar'>
                <div className='first-bar'>
                    <Link to="/" className='itens-first-bar'> <Icon icon="carbon:home" color="white" width="36" height="34" id='home' onClick={() => { setSideMenu('home') }} /> </Link>
                    <Link to="/" className='itens-first-bar'> <Icon icon="majesticons:file-report-line" color="white" width="36" height="34" /> </Link>
                    <Icon className='itens-first-bar' icon="carbon:user-filled" color="white" width="36" height="34" onClick={() => { setSideMenu('user') }} />
                    <Link to="/" className='itens-first-bar'> <Icon icon="carbon:document" color="white" width="36" height="34" /> </Link>
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
                </div>
            </div>
        </>
    )
}

export default SideBar;