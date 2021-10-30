import './sideMenuStyle.css'
import { Icon } from '@iconify/react'
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';

const SideBar = function(){
    return (
        <>
        <div className='side-bar'>
            <div className='first-bar'>
                <Link to="/" className='itens-first-bar'> <Icon icon="carbon:home" color="white" width="36" height="34" /> </Link>
                <Link to="/" className='itens-first-bar'> <Icon icon="majesticons:file-report-line" color="white" width="36" height="34" /> </Link>
                <Link to="/users" className='itens-first-bar'> <Icon icon="carbon:user-filled" color="white" width="36" height="34" > </Icon> </Link>
                <Link to="/" className='itens-first-bar'> <Icon icon="carbon:document" color="white" width="36" height="34" /> </Link>
            </div>
            <div className='second-bar'>
                <div className='second-bar-logo'>
                    <Logo/>
                </div>
                <div className='second-bar-container-itens'>
                    <span className='second-bar-itens'> Relatório teste teste</span>
                    <span className='second-bar-itens'> Relatório teste teste</span>
                    <span className='second-bar-itens'> Relatório teste teste</span>
                    <span className='second-bar-itens'> Relatório teste teste</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default SideBar;