import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CancelButton from '../../../components/button/cancelButton/cancelButton';
import DeleteButton from '../../../components/button/deleteButton/deleteButton';
import SaveButton from '../../../components/button/saveButton/saveButton';
import SubmitButton from '../../../components/button/submitButton/button';
import InputSelect from '../../../components/inputs/select/inputSelect';
import Title from '../../../components/title/title';
import { loadingToast, updateToast } from '../../../providers/toast/toastProvider';
import { importExcelOnServer } from '../../../services/file/excel/excelService';
import './inputExcel.css'

const InputExcel = function () {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState('')
    const [nameFile, setNameFile] = useState('')

    const onSubmit = async (data) => {
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label for="checkbox"> Criar tabela automaticamente? </label>
                                        <input type="checkbox" name="checkbox" class='custon-checkbox' />
                                    </div>
                                    {/* 
                                    <div>
                                        <label for="select-table">Selecione uma tabela para importação</label>
                                        <select name="select-table" id="">
                                            <option value="" selected>Selecione</option>
                                            <option value="">teste</option>
                                        </select>
                                    </div> 
                                    */}

                                    <div>
                                        <SubmitButton text='Salvar'/>
                                        <DeleteButton/>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </>
                    :
                    <div className='container-excel'>
                        <form onSubmit={handleSubmit(onSubmit)}>
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