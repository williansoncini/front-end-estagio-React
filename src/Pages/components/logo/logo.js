import React from "react";
import './logo.css'

const Logo = function(){
    const pathLogo = window.location.origin + '/logos/safra40.png'
    return(
        <div className='container'>
            <img src={pathLogo} className='logo-safra40' />
        </div>
    )
}

export default Logo