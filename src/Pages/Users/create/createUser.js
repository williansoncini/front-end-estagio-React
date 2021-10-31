import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import { useForm } from "react-hook-form";
import "./createUser.css"
import InputText from "../../components/inputs/text/inputText";
import InputSelect from "../../components/inputs/select/inputSelect";
import { getArrayNameAndIdDepartaments } from "../../services/departaments/departamentsService";
import InputPassword from "../../components/inputs/password/inputPassword";
import { saveUser } from "../../services/users/usersService";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { errorToast, successToast } from "../../providers/toast/toastProvider";

const CreateUser = function () {
    const history = useHistory()
    const [departaments, setDepartaments] = useState('');

    useEffect(async () => {
        if (departaments == '') {
            const departaments = await getArrayNameAndIdDepartaments()
            setDepartaments(departaments)
        }
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [result, setResult] = useState("")
    const onSubmit = async (data) => {
        setResult(data)
        try {
            const response = await saveUser(data)
            if (response.status == 200) {
                history.push('/users')
                successToast(response.success)
            }
            errorToast(response.error)
        } catch (error) {
            errorToast('Erro ao salvar usuário')
        }
    }

    const tipo_acessos = [{ name: 'Usuário', value: 1 }, { name: 'Supervisor', value: 2 }, { name: 'Administrador', value: 3 }]

    return (
        <>
            <div className='content-container'>
                <div className='create-user-container'>
                    <div className='create-user-title'>
                        <span>Cadastro de novo usuário</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='itens'>
                            <InputText register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} />
                            <InputSelect register={register} name='departamento_id' label='Departamento*:' errors={errors} list={departaments == '' ? [] : departaments} />
                            <InputText register={register} name='email' label='Email*:' maxLength={20} errors={errors} />
                            <InputSelect register={register} name='tipo_acesso_id' label='Acesso*:' errors={errors} list={tipo_acessos} />
                            <InputPassword register={register} name='senha' label='Senha*:' errors={errors} />
                        </div>
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
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateUser