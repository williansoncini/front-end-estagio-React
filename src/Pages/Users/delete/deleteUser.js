import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
// import SideBar from "../../components/sideMenu/sideMenu";
import { useForm } from "react-hook-form";
import { getArrayNameAndIdDepartaments } from "../../services/departaments/departamentsService";
import { deleteUser, getUserById } from "../../services/users/usersService";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom'
import { errorToast, successToast } from "../../providers/toast/toastProvider";
import InputTextDisabled from "../../components/inputs/text/inputTextWithValue";
import DeleteButton from "../../components/button/deleteButton/deleteButton";

const DeleteUser = function () {
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
                setValue('departamento_id', user.departamento_descricao)
                setValue('tipo_acesso_id', user.tipo_acesso_descricao)
                setValue('email', user.email)
                setValue('ativo', user.ativo_descricao)
                setValue('senha', 'default')
                setLoading(false)
            }
        }
        if (departaments == '') {
            const departaments = await getArrayNameAndIdDepartaments()
            setDepartaments(departaments)
        }
    })

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const onSubmit = async () => {
        try {
            const response = await deleteUser(id)
            if (response.status == 200) {
                history.push('/users')
                successToast(response.success)
            }
            errorToast(response.error)
        } catch (error) {
            errorToast('Erro ao alterar usuário!')
        }
    }

    const status = [{ name: 'Ativo', value: '1' }, { name: 'Inativo', value: '0' }]
    const tipo_acessos = [{ name: 'Usuário', value: 1 }, { name: 'Supervisor', value: 2 }, { name: 'Administrador', value: 3 }]

    return (
        <>
            {/* <SideBar /> */}
            <div className='content-container'>
                <div className='create-user-container'>
                    <div className='create-user-title'>
                        <span> Deletar usuário </span>
                    </div>
                    {loading ? (<p> Buscando usuário </p>) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='itens'>
                                <InputTextDisabled register={register} name='id' label='Id*:' maxLength={20} errors={errors} />
                                <InputTextDisabled register={register} name='nome' label='Nome*:' maxLength={20} errors={errors} />
                                <InputTextDisabled register={register} name='departamento_id' label='Departamento*:' errors={errors} list={departaments == '' ? [] : departaments} />
                                <InputTextDisabled register={register} name='email' label='Email*:' maxLength={20} errors={errors} />
                                <InputTextDisabled register={register} name='tipo_acesso_id' label='Acesso*:' errors={errors} list={tipo_acessos} />
                                <InputTextDisabled register={register} name='ativo' label='Status*:' errors={errors} list={status} />
                            </div>

                            <div className='buttons'>
                                <Link to="/users"> <CancelButton /> </Link>
                                <DeleteButton/>
                                {/* <SaveButton/> */}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
export default DeleteUser