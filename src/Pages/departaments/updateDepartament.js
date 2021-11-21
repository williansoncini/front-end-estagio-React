import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useHistory, useParams } from "react-router-dom"
import CancelButton from "../components/button/cancelButton/cancelButton"
import SaveButton from "../components/button/saveButton/saveButton"
import InputSelectWithValue from "../components/inputs/select/inputSelectWithValue"
import InputText from "../components/inputs/text/inputText"
import InputTextDisabled from "../components/inputs/text/inputTextWithValue"
import { errorToast, successToast } from "../providers/toast/toastProvider"
import { getDepartament, updateDepartament } from "../services/departaments/departamentsService"

export default function UpdateDepartament() {
    const { id } = useParams()
    const [departament, setDepartament] = useState([])
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const history = useHistory()
    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const values_ativo = { value: departament.ativo, name: departament.ativo_descricao }

    useEffect(async function () {
        const response = await getDepartament(id)
        if (response.status == 200) {
            setDepartament(response.data)
            const data = response.data
            setLoading(false)
            setValue('id', data.id)
            setValue('descricao', data.descricao)
            setValue('ativo', data.ativo)
        }
    }, [])

    const onSubmit = async (data) => {
        let response
        try {
            const values = {
                descricao: data.descricao,
                ativo: data.ativo
            }
            response = await updateDepartament(id, values)
            console.log(response)
            if (response.status == 200) {
                history.push('/departaments')
                successToast(response.success)
            } else {
                errorToast(response.error)
            }
        } catch (error) {
            errorToast('Falha ao criar categoria!')
        }
    }

    return (
        <>
            <div className='content-container'>
                {loading ?
                    <span>Carregando...</span> :
                    <form onSubmit={handleSubmit(onSubmit)} id='form-create-table'>
                        <div className='create-user-container'>
                            <div className='create-user-title'>
                                <span> Departamento </span>
                            </div>
                            <div className='itens'>
                                <InputTextDisabled register={register} name='id' label='Descricao*:' errors={errors} />
                                <InputText register={register} name='descricao' label='Descricao*:' maxLength={40} errors={errors} />
                                <InputSelectWithValue value={values_ativo} register={register} name='ativo' label='Status*:' errors={errors} list={status} />
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
                }
            </div>
        </>
    )
}