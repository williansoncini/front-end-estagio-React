import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import CancelButton from "../../components/button/cancelButton/cancelButton"
import SaveButton from "../../components/button/saveButton/saveButton"
import InputSelectWithValue from "../../components/inputs/select/inputSelectWithValue"
import InputText from "../../components/inputs/text/inputText"
import InputTextDisabled from "../../components/inputs/text/inputTextWithValue"
import { errorToast, loadingToast, updateToast } from "../../providers/toast/toastProvider"
import { deleteTable, getTableById } from "../../services/table/tableService"




const DeleteTable = function (){
    const {id} = useParams()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState('')
    const [columns, setColumns] = useState('')

    useEffect(async ()=>{
        if (table == '') {
            const response = await getTableById(id)
            if (response.error) {
                history.push('/tables')
                errorToast(response.error)
            }
            else {
                setTable(response.data.data.table)
                setColumns(response.data.data.columns)
                const table = response.data.data.table
                const columns = response.data.data.columns
                console.log(columns)
                setValue('id', table.id)
                setValue('nome', table.nome)
                setValue('ativa', table.ativo_descricao)
                setValue('categoria', table.categoria_descricao)
                columns.map((column) =>{
                    setValue(column.nome, column.nome)
                    setValue(column.nome + 'type', column.tipo_coluna_descricao)
                    setValue(column.nome + 'null', column.vazio_descricao)
                })
                setLoading(false)
            }
        }
    })

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const onSubmit = async (data) => {
        const id_toast_delete_table = loadingToast('Carregando')
        try {
            const response = await deleteTable(id)
            if (response.status == 200 ) {
                history.push('/tables')
                updateToast(id_toast_delete_table, 'success', response.success)
            } else if (response.status == 304){
                history.push('/tables')
                updateToast(id_toast_delete_table, 'success', 'Nada alterado na tabela')
            }
            else {
                updateToast(id_toast_delete_table, 'error', response.error)
            }
        } catch (error) {
            updateToast(id_toast_delete_table, 'error', 'Erro na alteração da tabela')
        }

    }

    return (
        <>
            <div className='content-container'>
                {loading ? (<p> Buscando usuário </p>) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                            <div className='create-user-container'>
                                <div className='create-user-title'>
                                    <span> Deletar tabela </span>
                                </div>

                                <div className='itens'>
                                    <InputTextDisabled register={register} name='id' label='ID*:' maxLength={20} errors={errors} disabled={true}/>
                                    <InputTextDisabled register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} />
                                    <InputTextDisabled register={register} name='ativa' label='Status*:' errors={errors} />
                                    <InputTextDisabled register={register} name='categoria' label='Categoria*:' errors={errors} />
                                </div>
                            </div>

                            <div className='create-column-container'>
                                <div className='create-user-title'>
                                    <span>Colunas</span>
                                </div>
                                <div >
                                    {columns.map((column) => {
                                        setValue(column.nome, column.nome)
                                        return (
                                            <>
                                                <div className='white-container-columns'>
                                                    <InputTextDisabled register={register} name={column.nome} label='Nome*: ' errors={errors} />
                                                    <InputTextDisabled register={register} name={column.nome + 'type'} label='Tipo*: ' errors={errors} />
                                                    <InputTextDisabled register={register} name={column.nome + 'null'} label='Vazio?*: ' errors={errors} />
                                                </div>
                                            </>)
                                    })}
                                </div>

                                <div className='buttons'>
                                    <Link to="/tables">
                                        <CancelButton/>
                                    </Link>
                                    <SaveButton text='Deletar'/>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export default DeleteTable