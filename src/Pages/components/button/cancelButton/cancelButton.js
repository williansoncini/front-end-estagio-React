import React from "react"
import './cancelButton.css'

const CancelButton = function({ name, script}){
    return (
        <div>
            <button type='reset' id='cancel-button' name={name} onClick={script}>Cancelar</button>
        </div>
    )
}

export default CancelButton;