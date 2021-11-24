import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import RedCancelButton from "../../components/button/redCancelButton/redCancelButton"
import SubmitButton from "../../components/button/submitButton/button"
import Title from "../../components/title/title"
import { errorToast, loadingToast, successToast, updateToast } from "../../providers/toast/toastProvider"
import { deleteColumn } from "../../services/columnService/columnService"
import { deleteRowFromTable, getDataFromTable, getTableById, insertDataIntoTable, updateDataFromTable } from "../../services/table/tableService"
import './dataEdit.css'

export default function UpdateDataInTable() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [index, setIndex] = useState(0)
    const [columns, setColumns] = useState([])
    const { register, unregister, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [loadingNewColumnsComponents, setLoadingNewColumnsComponents] = useState(false)
    const [loadingNewColumnsFromDatabase, setLoadingNewColumnsFromDatabase] = useState(false)
    // const [updateRows, setUpdateRows] = useState([])

    useEffect(async () => {
        let columnsLoaded = []
        if (columns == '') {
            const response = await getTableById(id)
            if (response.error) {
                history.push('/tables')
                errorToast(response.error)
            }
            else {
                setColumns(response.data.data.columns)
                columnsLoaded = response.data.data.columns
                setLoading(false)
            }
        }

        if (data == '') {
            const response = await getDataFromTable(id)
            if (response.status == 200) {
                setRows(response.data)
            }
        }
    }, [])

    useEffect(() => {
    }, [rows])

    function addColumn() {
        const values = columns.map((column) => {
            return `${column.nome}${index}`
        })
        setIndex(index + 1)
        setRows(rows.concat([values]))
    }

    const onSubmit = async function (data) {
        let updateRows = []
        rows.map((row, indexRow) => {
            row.map((cell, indexCell) => {
                if (data[indexRow][indexCell] !== String(cell)) {
                    console.log(data[indexRow][indexCell])
                    if (!updateRows.includes(data[indexRow]))
                        return updateRows.push(data[indexRow])
                }
            })
        })

        try {
            const response = await updateDataFromTable(id, updateRows)
            if (response.status == 200) {
                return successToast(response.success)
            } else {
                errorToast(response.error)
            }
        } catch (error) {
            errorToast('Erro ao alterar dados da tabela')
        }

    }

    async function removeColumnFromDataBase(index) {
        try {
            console.log(index)
            console.log(rows[index][0])
            const rowId = rows[index][0]
            const response = await deleteRowFromTable(id, rowId)
            if (response.status == 200) {
                let newRows = rows
                const removedRow = newRows.splice(index, 1)
                console.log(removedRow)
                rows[index].map((data, indexData) => {
                    console.log(`${index}.${indexData}`)
                    unregister(`${index}.${indexData}`)
                })
                // removedRow[0].map((data, indexData) => {
                //     console.log(`${index}.${indexData}`)
                //     unregister(`${index}.${indexData}`)
                // })

                setRows([])
                setLoadingNewColumnsFromDatabase(true)
                let promise = await new Promise(function (resolve, reject) {
                    setTimeout(() => resolve("done"), 1000);
                });
                setRows(newRows)
                newRows.map((row, rowIndex)=> {
                    row.map((data, dataindex)=>{
                        setValue(`${rowIndex}.${dataindex}`, data)
                    })
                })
                setLoadingNewColumnsFromDatabase(false)

                successToast(response.success)
            } else {
                errorToast(response.error)
            }
        } catch (error) {
            errorToast('Não foi possível deletar a linha')
        }
    }

    function changeColorToYellow(event, indexRow, indexData) {
        const cell = event.target
        const data = String(rows[indexRow][indexData])
        if (cell.value !== data) {
            cell.style.backgroundColor = '#ffd60a'
        } else {
            cell.style.backgroundColor = 'white'
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
                                        loadingNewColumnsFromDatabase || loadingNewColumnsComponents ?
                                            (<span>Atualizando...</span>) : (
                                                rows.map((row, indexRow) => {
                                                    return (
                                                        <tr>
                                                            <td onClick={() => removeColumnFromDataBase(indexRow)}>
                                                                <div className='delete-row'>
                                                                    <Icon icon="dashicons:remove" color="#fff" width="25" height="25" />
                                                                    <span id='teste'>Remover</span>
                                                                </div>
                                                            </td>
                                                            {
                                                                row.map((data_teste, indexData) => {
                                                                    // console.log(`${indexRow}.${indexData}`)
                                                                    return (
                                                                        <td>
                                                                            {
                                                                                // <input type="text" className='input-data-table' defaultValue={data || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data_teste || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                // indexData == 0 ?
                                                                                //     <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} readOnly='true' />
                                                                                //     :
                                                                                //     typeof (data) === 'string' ?
                                                                                //         <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                //         :
                                                                                //         <input type="number" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                            }
                                                                        </td>
                                                                    )
                                                                })}
                                                        </tr>
                                                    )

                                                })
                                            )
                                    }
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