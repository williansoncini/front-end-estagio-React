import React from "react"
import './button.css'

const SubmitButton = function({text, name, script}){
    return (
        <div>
            <button type='submit' id='submit-button' name={name} onClick={script}>{text}</button>
        </div>
    )
}

export default SubmitButton;