import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CancelButton from '../../../components/button/cancelButton/cancelButton';
import SaveButton from '../../../components/button/saveButton/saveButton';
import SubmitButton from '../../../components/button/submitButton/button';
import Title from '../../../components/title/title';
import { errorToast, loadingToast, successToast, updateToast } from '../../../providers/toast/toastProvider';
import { importExcelOnServer } from '../../../services/file/excel/excelService';
import './inputExcel.css'

const InputExcel = function () {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('')

    const onSubmit = async (data) => {
        const id = loadingToast('Carregando')
        try {
            const response = await importExcelOnServer(data.excelFile[0])
            if (response.status == 200) {
                setData(response.data.matrix)
                updateToast(id, 'success', response.success)
                console.log(response.data.matrix)
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
                            <div>Dados carregados!</div>
                            <div>{data}</div>
                            <div className='full-size-table'>
                                <table className='styled-table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {}
                                            {/* <th>Nome</th>
                                            <th>Departamento</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Acesso</th>
                                            <th>Ações</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {this.state.users.map((user) => {
                                            return (
                                                <tr>
                                                    <td> {user.id} </td>
                                                    <td> {user.nome} </td>
                                                    <td> {user.departamento_descricao} </td>
                                                    <td> {user.email} </td>
                                                    <td> {user.ativo_descricao} </td>
                                                    <td> {user.tipo_acesso_descricao} </td>
                                                </tr>
                                            )
                                        })
                                        } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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