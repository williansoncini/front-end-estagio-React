import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import { useForm } from "react-hook-form";
import InputText from "../../components/inputs/text/inputText";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { errorToast, loadingToast, updateToast } from "../../providers/toast/toastProvider";
import InputSelectWithValue from "../../components/inputs/select/inputSelectWithValue";
import InputSelect from "../../components/inputs/select/inputSelect";
import { getCategoryIdAndName } from "../../services/categoria/categoryService";
import { Icon } from "@iconify/react";
import { getTableById, updateTable } from "../../services/table/tableService";

const UpdateTable = function () {
    const { id } = useParams()
    const [categorys, setCategorys] = useState('');
    const [index, setIndex] = useState(0)
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [components, setComponents] = useState([])
    const [table, setTable] = useState('')
    const [columns, setColumns] = useState('')

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
                setValue('nome', table.nome)
                setLoading(false)
                // setLoading(false)
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

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

    const onSubmit = async (data) => {
        const id_toast = loadingToast('Carregando')
        const nome = data.nome
        const categoria_id = data.categoria_id
        const ativa = data.ativa

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
        const colunas = []
        columns.map((column) => {
            colunas.push({
                nome: data[column.nome],
                vazio: data[column.nome + 'type'],
                tipo_coluna: data[column.nome + 'null'],
            })
        })

        for (let i = 0; i < nome_colunas.length; i++) {
            colunas.push({
                nome: nome_colunas[i],
                vazio: vazio_colunas[i],
                tipo_coluna: tipo_colunas[i],
            })
        }

        const values = {
            nome: nome,
            categoria_id: categoria_id,
            ativa:ativa,
            colunas: colunas
        }

        try {
            const response = await updateTable(id, values)
            if (response.status == 200) {
                history.push('/tables')
                updateToast(id_toast, 'success', response.success)
            } else {
                updateToast(id_toast, 'error', response.error)
            }
        } catch (error) {
            updateToast(id_toast, 'error', 'Erro na alteração da tabela')
        }
    }

    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const tipo_coluna = [{ name: 'Inteiro', value: 'INT' }, { name: 'Texto', value: 'VARCHAR' }, { name: 'Número', value: 'DECIMAL' }]
    const values_ativo = { value: table.ativa, name: table.ativo_descricao }
    const values_categoria = { value: table.categoria_id, name: table.categoria_descricao }
    const vazio = [{ name: 'Sim', value: '1' }, { name: 'Não', value: '0' }]

    return (
        <>
            <div className='content-container'>
                {loading ? (<p> Buscando usuário </p>) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                            <div className='create-user-container'>
                                <div className='create-user-title'>
                                    <span> Alteração tabela </span>
                                </div>

                                <div className='itens'>
                                    <InputText register={register} name='id' label='ID*:' maxLength={20} errors={errors} />
                                    <InputText register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} />
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
                                <div >
                                    {columns.map((column) => {
                                        const value_tipo = { value: column.tipo_coluna, name: column.tipo_coluna }
                                        const value_vazio = { value: column.vazio, name: column.vazio_descricao }
                                        setValue(column.nome, column.nome)
                                        return (
                                            <>
                                                <div className='teste-2-2'>
                                                    <InputText register={register} name={column.nome} label='Nome*: ' errors={errors} />
                                                    <InputSelectWithValue value={value_tipo} register={register} name={column.nome + 'type'} label='Tipo*: ' errors={errors} list={tipo_coluna} />
                                                    <InputSelectWithValue value={value_vazio} register={register} name={column.nome + 'null'} label='Vazio?*: ' errors={errors} list={vazio} />
                                                </div>
                                            </>)
                                    })}
                                    {components.map((component) => {
                                        return (
                                            <>
                                                <div className='teste-2-2'>
                                                    <InputText register={register} name={component.name} label='Nome*: ' errors={errors} />
                                                    <InputSelect register={register} name={component.type} label='Tipo*: ' errors={errors} list={tipo_coluna} />
                                                    <InputSelect register={register} name={component.null} label='Vazio?*: ' errors={errors} list={vazio} />
                                                </div>
                                            </>)
                                    })}
                                </div>
                                <button type="button" className='add-column-button' id='add-column-button-teste' onClick={handleClick}>
                                    <Icon icon="carbon:add-filled" color="#177359" width="50" height="50" />
                                    <span> Adicionar nova coluna </span>
                                </button>


                                <div className='buttons'>
                                    <Link to="/users">
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