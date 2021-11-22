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
import './dataEdit.css'

export default function InsertDataOnTable() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    // const [index, setIndex] = useState(0)
    const [columns, setColumns] = useState('')
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "teste",
    // })
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    // const [indexRow, setIndexRow] = useState(0)

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
        // console.log(rows)
    }, [rows])

    function addColumn() {
        // const rowLength = rows.length
        const values = columns.map((column) => {
            // return `${column.nome}${rowLength}`
            return ''
        })
        setRows(rows.concat([values]))
    }

    // const onSubmit = async function (data) {
    //     const values = rows.map((row) => {
    //         return row.map((datas) => {
    //             return data[datas]
    //         })
    //     })

    //     const id_toast = loadingToast('Carregando')
    //     try {
    //         const response = await insertDataIntoTable(id, values)
    //         console.log(response)
    //         if (response.status == 200) {
    //             updateToast(id_toast, 'success', response.success)
    //             history.push(`/tables/update/${id}`)
    //         } else
    //             updateToast(id_toast, 'error', response.error)
    //     } catch (error) {
    //         updateToast(id_toast, 'error', 'Erro no processo de criar tabela')
    //     }
    // }
    const onSubmit = async function () {
        console.log(rows)
    }

    const handleRemoveRow = (index) => {
        console.log(index)
        var rowsHandler = rows
        // rowsHandler.splice(index,1)
        // const newArray = rowsHandler
        // setRows(newArray)

        // let rowsHandler = rows
        // const index = rowsHandler.indexOf(row);
        // if (index > -1) {
        //     rowsHandler.splice(index, 1);
        //     setRows(rowsHandler)
        // }
        // console.log(rowsHandler)


        const newarray = rowsHandler.filter((row,i) => i !== index)
        setRows([])
        setRows(newarray)
        // const newarray = rowsHandler.filter((value,i) => value[0] !== rows[index][0] && value[1] !== rows[index][1])
        // const newarray = rowsHandler.slice(index, index+1)
        // console.log(newarray)
        // setRows(newarray)
        // setRows(rowsHandler)
        // console.log(rows)
        // console.log(rowsHandler)
    }

    const handleChangeInput = (indexRow, indexData, event) => {
        const values = rows
        values[indexRow][indexData] = event.target.value
        setRows(values)
    }

    return (
        <>
            <div className='content-container'>
                <Title text='Adicionar dados' />
                {loading ?
                    <span>Carregando...</span> :
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* {columns.map((column) => {
                                return <> {column.nome} </>
                            })}

                            {rows.map((row, indexRow) => {
                                return (
                                    <div key={indexRow}>
                                        <span onClick={event => handleRemoveRow(indexRow)}> Remover </span>
                                        {
                                            row.map((data, indexData) => {
                                                return <> <input type="text" onChange={event => handleChangeInput(indexRow, indexData, event)} /> </>
                                            })}
                                    </div>)
                            })} */}
                            <table className='styled-table'>
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
                                    {rows.map((row, indexRow) => {
                                        return <tr >
                                            <td onClick={() => handleRemoveRow(indexRow)}>
                                                <Icon icon="dashicons:remove" color="#b91818" width="25" height="25" />
                                                <span id='teste'>Remover</span>
                                            </td>
                                            {
                                                row.map((data, indexData) => {
                                                    console.log(data)
                                                    return (
                                                        <td>
                                                            {/* <input type="text" className='input-data-table' {...register(`${data}`)} /> */}
                                                            <input type="text" className='input-data-table' onChange={event => handleChangeInput(indexRow, indexData, event)} defaultValue={data || 'teste'} />
                                                        </td>
                                                    )
                                                })}
                                        </tr>
                                    })}
                                </tbody>
                            </table>

                            {/* <button type='button' onClick={() => append({})}>Append</button> */}

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