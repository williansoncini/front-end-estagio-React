import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CancelButton from '../../../components/button/cancelButton/cancelButton';
import SaveButton from '../../../components/button/saveButton/saveButton';
import SubmitButton from '../../../components/button/submitButton/button';
import { errorToast, loadingToast, successToast, updateToast } from '../../../providers/toast/toastProvider';
import { importExcelOnServer } from '../../../services/file/excel/excelService';
import './inputExcel.css'

const InputExcel = function () {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState()

    const onSubmit = async (data) => {
        const id = loadingToast('Carregando')
        try {
            // const id = successToast('sucess')
            // await new Promise(r => setTimeout(r, 2000));
            // console.log(id)
            const response = await importExcelOnServer(data.excelFile[0])
            if (response.status == 200) {
                // successToast(response.success)
                updateToast(id, 'success', response.success)
                console.log(response.data.matrix)
            }
            else
                updateToast(id, 'error', response.error)
            // errorToast(response.error)
        } catch (error) {
            updateToast(id, 'error', 'Erro no envio de arquivo')
            // errorToast('Erro no envio de arquivo')
        }
    };

    return (
        <>
            <div className='content-container'>
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
            </div>
        </>
    )
}

export default InputExcel