import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import { useForm } from "react-hook-form";
import InputText from "../../components/inputs/text/inputText";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { errorToast, loadingToast, successToast, updateToast } from "../../providers/toast/toastProvider";
import InputSelectWithValue from "../../components/inputs/select/inputSelectWithValue";
import InputSelect from "../../components/inputs/select/inputSelect";
import { getCategoryIdAndName } from "../../services/categoria/categoryService";
import { Icon } from "@iconify/react";
import { getTableById, updateTable } from "../../services/table/tableService";
import { deleteColumn, saveColumns, updateColumns } from "../../services/columnService/columnService";
import { getTypeColumns } from "../../services/typeColumnService/typeColumnService";
import './updateTable.css'

const UpdateTable = function () {
    const { id } = useParams()
    const [categorys, setCategorys] = useState('');
    const [typeColumns, setTypeColumns] = useState('')
    const [index, setIndex] = useState(0)
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [components, setComponents] = useState([])
    const [table, setTable] = useState('')
    const [columns, setColumns] = useState([])
    const { register, unregister, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [loadingNewColumnsComponents, setLoadingNewColumnsComponents] = useState(false)
    const [loadingNewColumnsFromDatabase, setLoadingNewColumnsFromDatabase] = useState(false)

    useEffect(async () => {
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
                setValue('id', table.id)
                setValue('tableName', table.nome)
                setLoading(false)
            }
        }
        if (categorys == '') {
            const response = await getCategoryIdAndName()
            if (response.error) {
                errorToast(response.error)
                setCategorys({})
            }
            setCategorys(response)
        }
        if (typeColumns == '') {
            const response = await getTypeColumns()
            if (response.error) {
                errorToast(response.error)
                setTypeColumns({})
            } else {
                const idAndName = response.data.map((typeColumn) => {
                    return { name: typeColumn.descricao, value: typeColumn.id }
                })
                setTypeColumns(idAndName)
            }
        }
    }, []
    )

    function handleClick(e) {
        setComponents(components.concat(
            [{
                name: `name ${index}`,
                type: `type ${index}`,
                null: `null ${index}`
            }]
        ))
        setIndex(index + 1)
    }



    const onSubmit = async (data) => {
        const nome = data.tableName
        const categoria_id = data.categoria_id
        const ativa = data.ativa
        const valuesTableUpdate = {
            nome: nome,
            ativa: ativa,
            categoria_id: categoria_id
        }

        const id_toast_update_table = loadingToast('Carregando')
        try {
            const response = await updateTable(id, valuesTableUpdate)
            if (response.status == 200) {
                // history.push('/tables')
                updateToast(id_toast_update_table, 'success', response.success)
            } else if (response.status == 304) {
                // history.push('/tables')
                updateToast(id_toast_update_table, 'success', 'Nada alterado na tabela')
            }
            else {
                return updateToast(id_toast_update_table, 'error', response.error)
            }
        } catch (error) {
            return updateToast(id_toast_update_table, 'error', 'Erro na altera????o da tabela')
        }

        const colunas = []
        columns.map((column) => {
            colunas.push({
                id: column.id,
                nome: data[column.nome],
                vazio: data[column.nome + 'null'],
                tipo_coluna_id: data[column.nome + 'type']
            })
        })
        const valuesUpdateColumns = {
            tabela_id: id,
            colunas: colunas
        }

        const id_toast_update_columns = loadingToast('Carregando')
        try {
            const response = await updateColumns(valuesUpdateColumns)
            if (response.status == 200) {
                // history.push('/tables')
                updateToast(id_toast_update_columns, 'success', response.success)
            } else if (response.status == 304) {
                // history.push('/tables')
                updateToast(id_toast_update_columns, 'success', 'Nada alterado nas colunas existentes')
            }
            else {
                return  updateToast(id_toast_update_columns, 'error', response.error)
            }
        } catch (error) {
            return updateToast(id_toast_update_columns, 'error', 'Erro na altera????o da tabela')
        }

        const nome_colunas = []
        const tipo_colunas = []
        const vazio_colunas = []
        let key;
        for (key in data) {
            if (key.includes('name')) {
                nome_colunas.push(data[key])
            }
            if (key.includes('type')) {
                tipo_colunas.push(data[key])
            }
            if (key.includes('null')) {
                vazio_colunas.push(data[key])
            }
        }

        if (nome_colunas.length > 0) {
            let new_columns = []
            for (let i = 0; i < nome_colunas.length; i++) {
                new_columns.push({
                    nome: nome_colunas[i],
                    vazio: vazio_colunas[i],
                    tipo_coluna_id: tipo_colunas[i],
                })
            }

            const valuesCreateColumns = {
                tabela_id: id,
                colunas: new_columns
            }
            const id_toast_create_columns = loadingToast('Carregando')
            try {
                const response = await saveColumns(valuesCreateColumns)
                if (response.status == 200) {
                    history.push('/tables')
                    updateToast(id_toast_create_columns, 'success', response.success)
                } else {
                    return updateToast(id_toast_create_columns, 'error', response.error)
                }
            } catch (error) {
                return updateToast(id_toast_create_columns, 'error', 'Erro na altera????o da tabela')
            }
        }
    }

    async function removeColumnFromDataBase(index) {
        console.log(columns[index])
        try {
            const id = columns[index].id
            const response = await deleteColumn(id)
            if (response.status == 200){
                let newColumns = columns
                const removedColumn = newColumns.splice(index,1)
                setLoadingNewColumnsFromDatabase(true)
                setColumns([])
                let promise = await new Promise(function (resolve, reject) {
                    setTimeout(() => resolve("done"), 500);
                });
                setColumns(newColumns)
                setLoadingNewColumnsFromDatabase(false)
                unregister(removedColumn.name)
                unregister(removedColumn.type)
                unregister(removedColumn.null)
                successToast(response.success)
            }else{
                errorToast(response.error)
            }
        } catch (error) {
            errorToast('Falha ao deletar coluna')
        }
    }

    async function removeColumnFromComponents(index) {
        let newColumns = components
        const removedColumn = newColumns.splice(index, 1)
        setLoadingNewColumnsComponents(true)
        setComponents([])
        let promise = await new Promise(function (resolve, reject) {
            setTimeout(() => resolve("done"), 500);
        });
        setComponents(newColumns)
        setLoadingNewColumnsComponents(false)
        unregister(removedColumn.name)
        unregister(removedColumn.type)
        unregister(removedColumn.null)
    }

    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const values_ativo = { value: table.ativa, name: table.ativo_descricao }
    const values_categoria = { value: table.categoria_id, name: table.categoria_descricao }
    const vazio = [{ name: 'Sim', value: '1' }, { name: 'N??o', value: '0' }]

    return (
        <>
            <div className='content-container'>
                {loading ? (<p> Buscando usu??rio </p>) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                            <div className='create-user-container'>
                                <div className='create-user-title'>
                                    <span> Altera????o tabela </span>
                                </div>

                                <div className='itens'>
                                    <InputText register={register} name='id' label='ID*:' maxLength={20} errors={errors} />
                                    <InputText register={register} name='tableName' label='Nome*:' maxLength={20} errors={errors} />
                                    <InputSelectWithValue value={values_ativo} register={register} name='ativa' label='Status*:' errors={errors} list={status} />
                                    <InputSelectWithValue value={values_categoria} register={register} name='categoria_id' label='Categoria*:' errors={errors} list={categorys == '' ? [] : categorys} />
                                    {/* <InputSelectWithValue value={} register={register} name='categoria_id' label='Categoria*:' errors={errors} list={categorys == '' ? [] : categorys} /> */}
                                    {/* <InputSelectWithValue register={register} name='ativa' label='Status*:' errors={errors} list={status} /> */}

                                </div>
                            </div>

                            <div className='create-column-container'>
                                <div className='create-user-title'>
                                    <span>Colunas</span>
                                </div>
                                {loadingNewColumnsComponents || loadingNewColumnsFromDatabase ?
                                    <span className='message-loading'>Carregando</span> :
                                    <div >
                                        {columns.map((column, indexColumn) => {
                                            // console.log(column)
                                            const value_tipo = { value: column.tipo_coluna_id, name: column.tipo_coluna_descricao }
                                            const value_vazio = { value: column.vazio, name: column.vazio_descricao }
                                            setValue(column.nome, column.nome)
                                            return (
                                                <>
                                                    <div className='container-remove-columns'>
                                                        <div className='white-container-columns'>
                                                            <InputText register={register} name={column.nome} label='Nome*: ' errors={errors} />
                                                            <InputSelectWithValue value={value_tipo} register={register} name={column.nome + 'type'} label='Tipo*: ' errors={errors} list={typeColumns == '' ? [] : typeColumns} />
                                                            <InputSelectWithValue value={value_vazio} register={register} name={column.nome + 'null'} label='Vazio?*: ' errors={errors} list={vazio} />
                                                        </div>
                                                        <div className='delete-row' onClick={() => removeColumnFromDataBase(indexColumn)}>
                                                            <Icon icon="dashicons:remove" color="#fff" width="25" height="25" />
                                                            <span id='teste'>Remover</span>
                                                        </div>
                                                    </div>
                                                </>)
                                        })}
                                        {components.map((component, index) => {
                                            return (
                                                <>
                                                    <div className='container-remove-columns'>
                                                        <div className='white-container-columns'>
                                                            <InputText register={register} name={component.name} label='Nome*: ' errors={errors} />
                                                            <InputSelect register={register} name={component.type} label='Tipo*: ' errors={errors} list={typeColumns == '' ? [] : typeColumns} />
                                                            <InputSelect register={register} name={component.null} label='Vazio?*: ' errors={errors} list={vazio} />
                                                        </div>
                                                        <div className='delete-row' onClick={() => removeColumnFromComponents(index)}>
                                                            <Icon icon="dashicons:remove" color="#fff" width="25" height="25" />
                                                            <span id='teste'>Remover</span>
                                                        </div>
                                                    </div>
                                                </>)
                                        })}
                                    </div>
                                }

                                <button type="button" className='add-column-button' id='add-column-button-teste' onClick={handleClick}>
                                    <Icon icon="carbon:add-filled" color="#177359" width="50" height="50" />
                                    <span> Adicionar nova coluna </span>
                                </button>

                                <div className='buttons-center'>
                                    <Link to={`/tables/${id}/data/insert`}>
                                        <button type='button' className='button-show-data'>
                                            Adicionar dados
                                        </button>
                                    </Link>

                                    <Link to={`/tables/${id}/data/update`}>
                                        <button type='button' className='button-show-data'>
                                            Editar dados
                                        </button>
                                    </Link>
                                </div>

                                <div className='buttons'>
                                    <Link to="/tables">
                                        <CancelButton script={() => reset({
                                            nome: '',
                                            departamento_id: '',
                                            email: '',
                                            tipo_acesso_id: '',
                                            senha: ''
                                        })} />
                                    </Link>
                                    <SaveButton />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}
export default UpdateTable