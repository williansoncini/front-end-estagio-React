import { Link } from "react-router-dom"
import './redCancelButton.css'

export default function RedCancelButton ({text="Cancelar", redirect='home'}) {
    
    return (
        <div>
            <Link to={redirect}>
                <button type='reset' class='red-cancel-button'>
                    {text}
                </button>
            </Link>
        </div>    
    )
}