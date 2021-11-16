import { Icon } from '@iconify/react';
import './exportButton.css'


export default function ExportButton({ script }) {
    return (
        <div>
            <button className='export-button' onClick={script}>
                <Icon icon="fa-solid:file-csv" color="white" width="20" height="20" />
                <span>Exportar dados</span>
            </button>
        </div>
    )
}