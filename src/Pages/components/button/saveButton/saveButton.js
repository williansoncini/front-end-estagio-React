import React from "react"
import './saveButton.css'

const SaveButton = function({ name, script, text='Salvar'}){
    return (
        <div>
            <button type='submit' id='submit-save-button' name={name} onClick={script}>{text}</button>
        </div>
    )
}

export default SaveButton;