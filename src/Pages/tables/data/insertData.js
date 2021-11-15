import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import Title from "../../components/title/title"
import { errorToast, loadingToast, updateToast } from "../../providers/toast/toastProvider"
import { getTableById, insertDataIntoTable } from "../../services/table/tableService"
import './dataEdit.css'

export default function InsertDataOnTable() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [index, setIndex] = useState(0)
    const [columns, setColumns] = useState('')
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
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
                const columns = response.data.data.columns
                setLoading(false)
            }
        }
    })

    function addColumn() {
        setIndex(index + 1)
        const values = columns.map((column) => {
            return `${column.nome}${index}`
        })

        setRows(rows.concat([values]))
    }

    const onSubmit = async function (data) {
        const values = rows.map((row) => {
            return row.map((datas) => {
                return data[datas]
            })
        })

        const id_toast = loadingToast('Carregando')
        try {
            const response = await insertDataIntoTable(id, values)
            console.log(response)
            if (response.status == 200) {
                updateToast(id_toast, 'success', response.success)
                // history.push(`/tables/update/${response.tabela_id}`)
            } else
                updateToast(id_toast, 'error', response.error)
        } catch (error) {
            updateToast(id_toast, 'error', 'Erro no processo de criar tabela')
        }
    }

    return (
        <>
            <div className='content-container'>
                <Title text='Adicionar dados' />
                {loading ?
                    <span>Carregando...</span> :
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <table className='styled-table'>
                                <thead>
                                    <tr>
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
                                    {rows.map((row) => {
                                        return <tr>{
                                            row.map((data) => {
                                                return (
                                                    <td>
                                                        <input type="text" className='input-data-table' {...register(`${data}`)} />
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    })}
                                </tbody>
                            </table>

                            <button type='button' className='add-column-button-green' onClick={addColumn}>
                                <Icon icon="carbon:add-filled" color="white" width="50" height="50" />
                                <span> Adicionar nova coluna </span>
                            </button>

                            <button type="submit">teste</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}