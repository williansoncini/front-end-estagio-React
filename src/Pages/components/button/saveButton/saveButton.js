import React from "react"
import './saveButton.css'

const SaveButton = function({ name, script}){
    return (
        <div>
            <button type='submit' id='submit-save-button' name={name} onClick={script}>Salvar</button>
        </div>
    )
}

export default SaveButton;