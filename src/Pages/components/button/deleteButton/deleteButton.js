import React from "react"
import './deleteButton.css'

const DeleteButton = function ({ name, script, text='Delete' }) {
    return (
        <div>
            <button type='submit' id='submit-delete-button' name={name} onClick={script}>{text}</button>
        </div>
    )
}

export default DeleteButton;