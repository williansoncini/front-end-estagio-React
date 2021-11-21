import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import RedCancelButton from "../../components/button/redCancelButton/redCancelButton"
import SubmitButton from "../../components/button/submitButton/button"
import Title from "../../components/title/title"
import { errorToast, loadingToast, updateToast } from "../../providers/toast/toastProvider"
import { getDataFromTable, getTableById, insertDataIntoTable } from "../../services/table/tableService"
import './dataEdit.css'

export default function UpdateDataInTable() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [index, setIndex] = useState(0)
    const [columns, setColumns] = useState([])
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

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
            console.log(response)
            if (response.status == 200) {
                let rowCount = 0
                // response.data.map((row) => {
                //     rowCount++
                //     return row.map((cell, i) => {
                //         console.log(cell)
                //     })
                // })

                const rowsData = response.data.map((row) => {
                    rowCount++
                    return row.map((cell, i) => {
                        // setValue(columnsLoaded[i] + rowCount, cell)
                        // return {
                        //     name: columnsLoaded[i] + rowCount,
                        //     value: cell
                        // }
                        // console.log(columnsLoaded[i])
                        return {
                            name: columnsLoaded[i] + rowCount,
                            value: cell
                        }
                    })
                })
                setIndex(rowCount + 1)
                setRows(rowsData)
            }
            else {
                errorToast(response.error)
                history.push('/tables')
                setData([])
            }
        }
    }, [])

    function addColumn() {
        const values = columns.map((column) => {
            return `${column.nome}${index}`
        })
        setIndex(index + 1)
        setRows(rows.concat([values]))
    }

    const onSubmit = async function (data) {
        const values = rows.map((row) => {
            return row.map((datas) => {
                return data[datas.name]
            })
        })

        console.log(values)

        // const id_toast = loadingToast('Carregando')
        // try {
        //     const response = await insertDataIntoTable(id, values)
        //     console.log(response)
        //     if (response.status == 200) {
        //         updateToast(id_toast, 'success', response.success)
        //         history.push(`/tables/update/${id}`)
        //     } else
        //         updateToast(id_toast, 'error', response.error)
        // } catch (error) {
        //     updateToast(id_toast, 'error', 'Erro no processo de criar tabela')
        // }
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
                                        {/* <td>#</td> */}
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
                                        rows.map((row) => {
                                            return <tr>{
                                                row.map((data) => {
                                                    return (
                                                        <td>
                                                            <input type="text" className='input-data-table' {...register(`${data}`)} />
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        })
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