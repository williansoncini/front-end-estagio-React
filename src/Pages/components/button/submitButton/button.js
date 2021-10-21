import axios from "axios"
import React from "react"
import './button.css'

const SubmitButton = function({text, name, script}){
    return (
        <div>
            <button type='button' id='submit-button' name={name} onClick={script}>{text}</button>
        </div>
    )
}

export default SubmitButton;