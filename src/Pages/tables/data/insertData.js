import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { set, useFieldArray, useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import CancelButton from "../../components/button/cancelButton/cancelButton"
import RedCancelButton from "../../components/button/redCancelButton/redCancelButton"
import SaveButton from "../../components/button/saveButton/saveButton"
import SubmitButton from "../../components/button/submitButton/button"
import Title from "../../components/title/title"
import { errorToast, loadingToast, updateToast } from "../../providers/toast/toastProvider"
import { getTableById, insertDataIntoTable } from "../../services/table/tableService"
// import useForceUpdate from 'use-force-update';
import './dataEdit.css'

export default function InsertDataOnTable() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [updating, setUpdating] = useState(false)
    const [columns, setColumns] = useState('')
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        if (columns == '') {
            const response = await getTableById(id)
            if (response.error) {
                history.push('/tables')
                errorToast(response.error)
            }
            else {
                setColumns(response.data.data.columns)
                setLoading(false)
            }
        }
    }, [])

    useEffect(() => {
    }, [rows])

    function addColumn() {
        const values = columns.map((column) => {
            return ''
        })
        setRows(rows.concat([values]))
    }

    const onSubmit = async function (data) {
        const id_toast = loadingToast('Carregando')
        try {
            const response = await insertDataIntoTable(id, rows)
            console.log(response)
            if (response.status == 200) {
                updateToast(id_toast, 'success', response.success)
                history.push(`/tables/update/${id}`)
            } else
                updateToast(id_toast, 'error', response.error)
        } catch (error) {
            updateToast(id_toast, 'error', 'Erro no processo de criar tabela')
        }
    }

    const handleRemoveRow = async (index) => {
        var rowsHandler = [...rows]
        const newarray = rowsHandler.filter((row, i) => i !== index)
        setRows([])
        setUpdating(true)
        let promise = await new Promise(function (resolve, reject) {
            setTimeout(() => resolve("done"), 500);
        });
        setUpdating(false)
        setRows(newarray);
    }

    const handleChangeInput = (indexRow, indexData, event) => {
        const values = rows
        if (typeof (event.target.value) == String)
            values[indexRow][indexData] = event.target.value.trim()
        else
            values[indexRow][indexData] = event.target.value
        setRows(values)
    }

    return (
        <>
            <div className='content-container'>
                <Title text='Adicionar dados' />
                {loading ?
                    <span>Atualizando...</span> :
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <table className='styled-table' id='table-data'>
                                <thead>
                                    <tr>
                                        <td>Ações</td>
                                        {columns.map((column) => {
                                            return (
                                                <td>
                                                    {column.nome}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        updating ?
                                            <span>Carregando</span> :
                                            rows.map((row, indexRow) => {
                                                return (
                                                    <>
                                                        <tr key={indexRow}>
                                                            <td onClick={() => handleRemoveRow(indexRow)}>
                                                                <div className='delete-row'>
                                                                    <Icon icon="dashicons:remove" color="#fff" width="25" height="25" />
                                                                    <span id='teste'>Remover</span>
                                                                </div>
                                                            </td>
                                                            {
                                                                row.map((data, indexData) => {
                                                                    return (
                                                                        <td>
                                                                            <input type="text" className='input-data-table' onChange={event => handleChangeInput(indexRow, indexData, event)} defaultValue={data || ''} />
                                                                        </td>
                                                                    )
                                                                })
                                                            }
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                </tbody>
                            </table>

                            <div className='centred-container'>
                                <button type='button' className='add-column-button-green' onClick={addColumn}>
                                    <Icon icon="carbon:add-filled" color="white" width="50" height="50" />
                                    <span> Adicionar nova coluna </span>
                                </button>
                            </div>

                            <div class='buttons-center'>
                                <SubmitButton text='Salvar' />
                                <RedCancelButton />
                            </div>
                        </form>
                    )
                }
            </div>
        </>
    )
}