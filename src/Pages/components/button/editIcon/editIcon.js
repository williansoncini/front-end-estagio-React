import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import './editIcon.css'

const EditIcon = function(path){
    
    return (
        <Link to={path.path}> <Icon icon="bi:trash" color="#212621" width="20" height="20" className='edit-icon' /> </Link>
    )
}

export default EditIcon