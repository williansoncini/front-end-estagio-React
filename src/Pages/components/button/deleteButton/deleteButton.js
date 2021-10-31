import React from "react"
import './deleteButton.css'

const DeleteButton = function ({ name, script }) {
    return (
        <div>
            <button type='submit' id='submit-delete-button' name={name} onClick={script}>Delete</button>
        </div>
    )
}

export default DeleteButton;