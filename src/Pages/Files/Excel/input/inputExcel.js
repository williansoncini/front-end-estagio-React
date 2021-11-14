import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import CancelButton from '../../../components/button/cancelButton/cancelButton';
import DeleteButton from '../../../components/button/deleteButton/deleteButton';
import RedCancelButton from '../../../components/button/redCancelButton/redCancelButton';
import SaveButton from '../../../components/button/saveButton/saveButton';
import SubmitButton from '../../../components/button/submitButton/button';
import InputSelect from '../../../components/inputs/select/inputSelect';
import InputSelectGreen from '../../../components/inputs/select/inputSelectGreen';
import InputText from '../../../components/inputs/text/inputText';
import InputTextGreenColor from '../../../components/inputs/text/inputTextGreenColor';
import Title from '../../../components/title/title';
import { errorToast, loadingToast, updateToast } from '../../../providers/toast/toastProvider';
import { getCategoryIdAndName } from '../../../services/categoria/categoryService';
import { importDataIntoTable, importExcelOnServer, importFileWithCreateTable } from '../../../services/file/excel/excelService';
import { getTables } from '../../../services/table/tableService';
import './inputExcel.css'

const InputExcel = function () {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState('')
    const [nameFile, setNameFile] = useState('')
    const [createTable, setCreateTable] = useState(false)
    const [categorys, setCategorys] = useState('');
    const [tables, setTables] = useState('')
    const history = useHistory()

    useEffect(async () => {
        if (categorys == '') {
            const response = await getCategoryIdAndName()
            if (response.error) {
                errorToast(response.error)
                setCategorys({})
            } else
                setCategorys(response)
        }
        if (tables == '') {
            const response = await getTables()
            if (response.status != 200) {
                errorToast(response.error)
                setTables({})
            } else{
                const valueData = response.data.map((table) => {
                    return {
                        value:table.id,
                        name:table.nome
                    }
                })
                setTables(valueData)
            }
        }
    })

    const onSubmitFile = async (data) => {
        const id = loadingToast('Carregando')
        try {
            const response = await importExcelOnServer(data.excelFile[0])
            if (response.status == 200) {
                // console.log(response.data)
                setData(response.data.data)
                setNameFile(response.data.fileName)
                updateToast(id, 'success', response.success)
            }
            else
                updateToast(id, 'error', response.error)
        } catch (error) {
            updateToast(id, 'error', 'Erro no envio de arquivo')
        }
    };

    const onSubmitData = async (data) => {

        if (createTable) {
            const id = loadingToast('Carregando')
            const tableName = data.tableName
            const categoria_id = data.categoria_id
            const valueData = {
                nameXlsxFile: nameFile,
                table: {
                    nome: tableName,
                    categoria_id: categoria_id
                }
            }
            console.log(valueData)
            try {
                const response = await importFileWithCreateTable(valueData)
                if (response.status == 200) {
                    updateToast(id, 'success', response.success)
                    history.push(`/tables/update/${response.tabela_id}`)
                } else
                    updateToast(id, 'error', response.error)
            } catch (error) {
                updateToast(id, 'error', 'Erro no processo de criar tabela')
            }
        }else{
            const id = loadingToast('Carregando')
            const tableId = data.tabela_id
            const valueData = {
                nameXlsxFile: nameFile,
                tabela_id:tableId
            }
            try {
                const response = await importDataIntoTable(valueData)
                if (response.status == 200) {
                    updateToast(id, 'success', response.success)
                    history.push(`/tables/update/${response.tabela_id}`)
                } else
                    updateToast(id, 'error', response.error)
            } catch (error) {
                updateToast(id, 'error', 'Erro no processo de criar tabela')
            }
        }
    }

    function handleChangeCheck() {
        createTable ? setCreateTable(false) : setCreateTable(true)
        reset({
            tableName: '',
            categoria_id: ''
        })
    }

    return (
        <>
            <div className='content-container'>
                <div className='header'>
                    <Title text='Importar arquivo 📄' />
                </div>
                {data !== '' ?
                    <>
                        <div className='body-container'>
                            <div className='file-name'>
                                <h2>{data.fileName}</h2>
                            </div>
                            <div className='full-size-table'>
                                <table className='styled-table'>
                                    <thead>
                                        <tr>
                                            {data.header.map((column) => {
                                                return (
                                                    <th>{column}</th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.body.map((column) => {
                                            return (
                                                <tr>
                                                    {column.map((row) => {
                                                        return <td>{row}</td>
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className='body-container'>
                            <div className='select-table'>
                                <form onSubmit={handleSubmit(onSubmitData)}>
                                    <div>
                                        <label for="checkbox"> Criar tabela automaticamente? </label>
                                        <input type="checkbox" checked={createTable} class='custon-checkbox' onChangeCapture={handleChangeCheck} />
                                        <span> {createTable.toString()} </span>
                                    </div>
                                    {createTable ?
                                        <>
                                            <InputTextGreenColor register={register} name={'tableName'} label='Nome da tabela*: ' errors={errors} />
                                            <InputSelectGreen register={register} name='categoria_id' label='Categoria*:' errors={errors} list={categorys == '' ? [] : categorys} />
                                        </>
                                        :
                                        <>
                                            <InputSelectGreen register={register} name='tabela_id' label='Tabela*: ' errors={errors} list={tables == '' ? [] : tables} />
                                        </>
                                    }
                                    <div class='buttons'>
                                        <SubmitButton text='Salvar' />
                                        <RedCancelButton />
                                    </div>
                                </form>
                            </div>
                        </div >
                    </>
                    :
                    <div className='container-excel'>
                        <form onSubmit={handleSubmit(onSubmitFile)}>
                            <div className='container-excel-child'>
                                {/* <input type="file" name="input-excel" id="input-excel" className='input-excel' /> */}
                                <input {...register('excelFile', { required: true })} type="file" />
                                {/* <label for="input-excel" id='input-excel-label'> Escolha o arquivo </label> */}
                                <SaveButton text={'Enviar'} />
                                <Link to="/">  <CancelButton /> </Link>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default InputExcel