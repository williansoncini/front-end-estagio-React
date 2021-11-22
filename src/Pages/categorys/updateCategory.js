import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useHistory, useParams } from "react-router-dom"
import CancelButton from "../components/button/cancelButton/cancelButton"
import SaveButton from "../components/button/saveButton/saveButton"
import InputSelectWithValue from "../components/inputs/select/inputSelectWithValue"
import InputText from "../components/inputs/text/inputText"
import InputTextDisabled from "../components/inputs/text/inputTextWithValue"
import { errorToast, successToast } from "../providers/toast/toastProvider"
import { getCategory, saveCategory, updateCategory } from "../services/categoria/categoryService"

export default function UpdateCategory() {
    const { id } = useParams()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const history = useHistory()
    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const values_ativo = { value: category.ativa, name: category.ativa_descricao }

    useEffect(async function () {
        const response = await getCategory(id)
        if (response.status == 200) {
            setCategory(response.data)
            const data = response.data
            setLoading(false)
            setValue('id', data.id)
            setValue('descricao', data.descricao)
            setValue('ativa', data.ativa)
        }
    }, [])

    const onSubmit = async (data) => {
        let response
        try {
            const values = {
                descricao: data.descricao,
                ativa: data.ativa
            }
            response = await updateCategory(id, values)
            if (response.status == 200) {
                history.push('/categorys')
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
                                <span> Categoria </span>
                            </div>
                            <div className='itens'>
                                <InputTextDisabled register={register} name='id' label='Id*:' errors={errors} />
                                <InputText register={register} name='descricao' label='Descricao*:' maxLength={40} errors={errors} />
                                <InputSelectWithValue value={values_ativo} register={register} name='ativa' label='Status*:' errors={errors} list={status} />
                            </div>
                        </div>

                        <div className='create-column-container'>
                            <div className='buttons'>
                                <Link to="/categorys">
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