import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import { useForm } from "react-hook-form";
import InputText from "../../components/inputs/text/inputText";
import InputSelect from "../../components/inputs/select/inputSelect";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { errorToast, loadingToast, successToast, updateToast } from "../../providers/toast/toastProvider";
import { getCategoryIdAndName } from "../../services/categoria/categoryService";
import './createTable.css'
import { Icon } from "@iconify/react";
import { saveTable } from "../../services/table/tableService";

import { saveColumns } from "../../services/columnService/columnService";
import { getTypeColumns } from "../../services/typeColumnService/typeColumnService";

const CreateTable = function () {
    const history = useHistory()
    const [categorys, setCategorys] = useState('');
    const [components, setComponents] = useState([])
    const [index, setIndex] = useState(0)
    const [typeColumns, setTypeColumns] = useState('')
    const [savedTable, setSavedTable] = useState('')

    useEffect(async () => {
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
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        const dataTable = {
            nome: data.nome,
            categoria_id: data.categoria_id
        }
        console.log(dataTable)
        let createdTable = savedTable
        if (savedTable == '') {
            const id_toast_table = loadingToast('Salvando tabela')
            try {
                const response = await saveTable(dataTable/*values*/)
                if (response.status == 200) {
                    // history.push('/tables')
                    updateToast(id_toast_table, 'success', response.success.success)
                    setSavedTable(response.success.data)
                    createdTable = response.success.data
                } else {
                    updateToast(id_toast_table, 'error', response.error)
                }
            } catch {
                updateToast(id_toast_table, 'error', 'Erro no envio de arquivo')
            }
        }

        const nome_colunas = []
        const tipo_colunas = []
        const vazio_colunas = []
        let key;
        for (key in data) {
            // console.log(key)
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
        for (let i = 0; i < nome_colunas.length; i++) {
            colunas.push({
                nome: nome_colunas[i],
                vazio: vazio_colunas[i],
                tipo_coluna_id: tipo_colunas[i],
            })
        }

        const columnData = {
            tabela_id: createdTable.id,
            colunas: colunas
        }
        console.log(columnData)
        const id_toast_column = loadingToast('Salvando colunas')
        try {
                const response = await saveColumns(columnData)
                if (response.status == 200) {
                    history.push('/tables')
                    updateToast(id_toast_column, 'success', response.success)
                } else {
                    updateToast(id_toast_column, 'error', response.error)
                }
        } catch {
            updateToast(id_toast_column, 'error', 'Erro no envio de arquivo')
        }
    }

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

    // const tipo_acessos = [{ name: 'Usuário', value: 1 }, { name: 'Supervisor', value: 2 }, { name: 'Administrador', value: 3 }]
    // const tipo_coluna = [{ name: 'Inteiro', value: 'INT' }, { name: 'Texto', value: 'VARCHAR' }, { name: 'Número', value: 'DECIMAL' }]

    const vazio = [{ name: 'Sim', value: '1' }, { name: 'Não', value: '0' }]
    // const values_tipo_coluna = 

    return (
        <>
            <div className='content-container'>
                <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                    <div className='create-user-container'>
                        <div className='create-user-title'>
                            <span> Tabela</span>
                        </div>
                        <span></span>
                        <div className='itens'>
                            <InputText register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} disabled={savedTable != ''? true : false } />
                            <InputSelect register={register} name='categoria_id' label='Categoria*:' errors={errors} list={categorys == '' ? [] : categorys} disabled={savedTable != ''? true : false } />
                        </div>
                    </div>

                    <div className='create-column-container'>
                        <div className='create-user-title'>
                            <span>Colunas</span>
                        </div>
                        <div >
                            {/* <InputText register={register} name='column1' label='Nome*:' errors={errors} /> */}
                            {components.map((component) => {
                                return (
                                    <>
                                        <div className='white-container-columns'>
                                            <InputText register={register} name={component.name} label='Nome*: ' errors={errors} />
                                            <InputSelect register={register} name={component.type} label='Tipo*: ' errors={errors} list={typeColumns == '' ? [] : typeColumns} />
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
            </div>

        </>
    )
}

export default CreateTable