import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import { useForm } from "react-hook-form";
// import "./updateUser.css"
import InputText from "../../components/inputs/text/inputText";
import { getArrayNameAndIdDepartaments } from "../../services/departaments/departamentsService";
import InputPassword from "../../components/inputs/password/inputPassword";
import { getUserById, updateUser } from "../../services/users/usersService";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { errorToast, successToast } from "../../providers/toast/toastProvider";
import InputSelectWithValue from "../../components/inputs/select/inputSelectWithValue";

const UpdateUser = function () {
    const { id } = useParams()
    const history = useHistory()
    const [user, setUser] = useState('')
    const [departaments, setDepartaments] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        if (user == '') {
            const response = await getUserById(id)
            if (response.error) {
                history.push('/users')
                errorToast(response.error)
            }
            else {
                setUser(response.data)
                const user = response.data
                setValue('id', user.id)
                setValue('nome', user.nome)
                setValue('departamento_id', user.departamento_id)
                setValue('tipo_acesso_id', user.tipo_acesso_id)
                setValue('email', user.email)
                setValue('ativo', user.ativo)
                setValue('senha', 'default')
                setLoading(false)
            }
        }

        if (departaments == '') {
            const departaments = await getArrayNameAndIdDepartaments()
            setDepartaments(departaments)
        }
    })

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [result, setResult] = useState("")
    const onSubmit = async (data) => {
        setResult(data)
        try {
            const response = await updateUser(data)
            if (response.status == 200) {
                history.push('/users')
                successToast(response.success)
            }
            errorToast(response.error)
        } catch (error) {
            errorToast('Erro ao alterar usuário!')
        }
    }

    const acessos = ['admin', 'supervisor', 'usuário']
    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const valueDepartament = { value: user.departamento_id, name: user.departamento_descricao }
    const valueStatus = { value: user.ativo, name: user.ativo_descricao }
    const valueType_access = { value: user.tipo_acesso_id, name: user.tipo_acesso_descricao }
    const tipo_acessos = [{ name: 'Usuário', value: 1 }, { name: 'Supervisor', value: 2 }, { name: 'Administrador', value: 3 }]

    return (
        <>
            <div className='content-container'>
                <div className='create-user-container'>
                    <div className='create-user-title'>
                        <span>Alteração de usuário</span>
                    </div>
                    {loading ? (<p> Buscando usuário </p>) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='itens'>
                                <InputText register={register} name='id' label='Id*:' maxLength={20} errors={errors} readOnly={true} />
                                <InputText register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} />
                                <InputSelectWithValue value={valueDepartament} register={register} name='departamento_id' label='Departamento*:' errors={errors} list={departaments == '' ? [] : departaments} />
                                <InputText register={register} name='email' label='Email*:' maxLength={20} errors={errors} />
                                <InputSelectWithValue value={valueType_access} register={register} name='tipo_acesso_id' label='Acesso*:' errors={errors} list={tipo_acessos} />
                                <InputSelectWithValue value={valueStatus} register={register} name='ativo' label='Status*:' errors={errors} list={status} />

                                {/* <InputSelect register={register} name='acesso' label='Acesso:' errors={errors} list={acessos}/> */}
                                <InputPassword register={register} name='senha' label='Senha*:' errors={errors} />
                            </div>

                            <div className='buttons'>
                                <Link to="/users">
                                    <CancelButton script={() => reset({
                                        nome: '',
                                        departamento_id: '',
                                        email: '',
                                        ativo: '',
                                        tipo_acesso: '',
                                        senha: ''
                                    })} />
                                </Link>
                                <SaveButton />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
export default UpdateUser