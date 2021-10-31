import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import './deleteIcon.css'

const DeleteIcon = function(path){
    return (<Link to={path.path}> <Icon icon="bi:trash" color="#fff" width="20" height="20" className='delete-icon'/> </Link>)
}
export default DeleteIcon