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
    const [newRowsForInsert, setNewRowsForInsert] = useState([])
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
        const columnsArray = [columns.map((column) => {
            return []
        })]
        setNewRowsForInsert(newRowsForInsert.concat(columnsArray))
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
            if (updateRows.length !== 0) {
                const response = await updateDataFromTable(id, updateRows)
                if (response.status == 200) {
                    successToast(response.success)
                    const responseGetTable = await getDataFromTable(id)
                    if (responseGetTable.status == 200) {
                        setRows([])
                        setNewRowsForInsert([])
                        setLoadingNewColumnsFromDatabase(true)
                        let promise = await new Promise(function (resolve, reject) {
                            setTimeout(() => resolve("done"), 300);
                        });
                        setRows(responseGetTable.data)
                        setLoadingNewColumnsFromDatabase(false)
                    }
                } else {
                    errorToast(response.error)
                }
            }
        } catch (error) {
            errorToast('Erro ao alterar dados da tabela')
        }

        if (newRowsForInsert.length !== 0) {
            const id_toast = loadingToast('Carregando')
            try {
                const response = await insertDataIntoTable(id, newRowsForInsert)
                if (response.status == 200) {
                    updateToast(id_toast, 'success', response.success)
                    const responseGetTable = await getDataFromTable(id)
                    if (responseGetTable.status == 200) {
                        setRows([])
                        setNewRowsForInsert([])
                        setLoadingNewColumnsFromDatabase(true)
                        let promise = await new Promise(function (resolve, reject) {
                            setTimeout(() => resolve("done"), 300);
                        });
                        setRows(responseGetTable.data)
                        setLoadingNewColumnsFromDatabase(false)
                    }
                    // history.push(`/tables/update/${id}`)
                } else
                    updateToast(id_toast, 'error', response.error)
            } catch (error) {
                updateToast(id_toast, 'error', 'Erro no processo de criar tabela')
            }
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

                setRows([])
                setLoadingNewColumnsFromDatabase(true)
                let promise = await new Promise(function (resolve, reject) {
                    setTimeout(() => resolve("done"), 300);
                });
                setRows(newRows)
                newRows.map((row, rowIndex) => {
                    row.map((data, dataindex) => {
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

    async function removeColumnFromInsertArray(index) {
        let newArray = newRowsForInsert
        const removedRow = newArray.splice(index, 1)
        setNewRowsForInsert([])
        setLoadingNewColumnsComponents(true)
        let promise = await new Promise(function (resolve, reject) {
            setTimeout(() => resolve("done"), 300);
        });
        setNewRowsForInsert(newArray)
        setLoadingNewColumnsComponents(false)
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

    const handleChangeInput = (indexRow, indexData, event) => {
        const values = newRowsForInsert
        if (typeof (event.target.value) == String)
            values[indexRow][indexData] = event.target.value.trim()
        else
            values[indexRow][indexData] = event.target.value
        setNewRowsForInsert(values)
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
                                                <>
                                                    {
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
                                                                                        // <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data_teste || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                        indexData == 0 ?
                                                                                            <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data_teste || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} readOnly='true' />
                                                                                            :
                                                                                            typeof (data_teste) === 'string' ?
                                                                                                <input type="text" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data_teste || ''} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                                :
                                                                                                <input type="number" className='input-data-table' {...register(`${indexRow}.${indexData}`)} defaultValue={data_teste} onChange={e => changeColorToYellow(e, indexRow, indexData)} />
                                                                                    }
                                                                                </td>
                                                                            )
                                                                        })}
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                    {
                                                        newRowsForInsert.map((row, indexRow) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td onClick={() => removeColumnFromInsertArray(indexRow)}>
                                                                            <div className='delete-row'>
                                                                                <Icon icon="dashicons:remove" color="#fff" width="25" height="25" />
                                                                                <span id='teste'>Remover</span>
                                                                            </div>
                                                                        </td>
                                                                        {
                                                                            row.map((data, indexData) => {
                                                                                return (
                                                                                    <td>
                                                                                        <input type="text" className='input-data-table-insert' defaultValue={data || ''} onChange={event => handleChangeInput(indexRow, indexData, event)} />
                                                                                    </td>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tr>
                                                                </>)
                                                        })
                                                    }
                                                </>
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