import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"
import CancelButton from "../components/button/cancelButton/cancelButton"
import SaveButton from "../components/button/saveButton/saveButton"
import InputSelect from "../components/inputs/select/inputSelect"
import InputText from "../components/inputs/text/inputText"
import { errorToast, successToast } from "../providers/toast/toastProvider"
import { saveDepartament } from "../services/departaments/departamentsService"

export default function CreateDepartament() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const history = useHistory()

    const onSubmit = async (data) => {
        let response
        try {
            const values = {
                descricao:data.descricao
            }
            response = await saveDepartament(values)
            console.log(response)
            if (response.status == 200){
                history.push('/departaments')
                successToast('Departamento criado com sucesso!')
            } else{
                errorToast(response.error)
            }
        } catch (error) {
            errorToast('Falha ao criar departamento!')
        }
    }

    return (
        <>
                <div className='content-container'>
                    <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                        <div className='create-user-container'>
                            <div className='create-user-title'>
                                <span> Criar departamento </span>
                            </div>
                            <div className='itens'>
                                <InputText register={register} name='descricao' label='Descricao*:' maxLength={40} errors={errors} />
                            </div>
                        </div>

                        <div className='create-column-container'>
                            <div className='buttons'>
                                <Link to="/departaments">
                                    <CancelButton script={() => reset({
                                        descricao: ''
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