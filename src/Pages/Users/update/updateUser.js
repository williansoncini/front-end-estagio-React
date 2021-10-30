import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import SideBar from "../../components/sideMenu/sideMenu";
import { useForm } from "react-hook-form";
import "./updateUser.css"
import InputText from "../../components/inputs/text/inputText";
import InputSelect from "../../components/inputs/select/inputSelect";
import { getArrayNameAndIdDepartaments, getNamesDepartaments } from "../../services/departaments/departamentsService";
import InputPassword from "../../components/inputs/password/inputPassword";
import { getUserById, saveUser } from "../../services/users/usersService";
import { Link } from "react-router-dom";
import  { useHistory, useParams } from 'react-router-dom'
import { errorToast, successToast } from "../../providers/toast/toastProvider";

const UpdateUser = function(){
        const {id} = useParams()
        const history = useHistory()
        const [user, setUser] = useState('')
        const [departaments, setDepartaments] = useState('');
        const [loading, setLoading] = useState(true)

        useEffect(async () => {
            if (user == ''){
                const response = await getUserById(id)
                if (response.error){
                    history.push('/users')
                    errorToast(response.error)
                }
                else{
                    setUser(response.data)
                    setLoading(false)
                }
            }
            
            if (departaments == ''){
                const departaments = await getArrayNameAndIdDepartaments()
                setDepartaments(departaments)
            }
        })

        const { register, handleSubmit, formState: { errors }, reset} = useForm()
        const [result, setResult] = useState("")
        const onSubmit = async (data) => {
            setResult(data)
            try {
                const response = await saveUser(data)
                if (response.status == 200){
                    history.push('/users')
                    successToast(response.success)
                }
                errorToast(response.error)
            } catch (error) {
                errorToast('Erro ao salvar usuário')
            }
        }

        const acessos = ['admin', 'supervisor', 'usuário']
        const status = [{name:'Ativo',value:'1'}, {name:'Inativo', value:'0'}]
        
        return(
            <>
                <SideBar/>
                <div className='content-container'>
                    <div className='create-user-container'>
                            <div className='create-user-title'>
                                <span>Cadastro de novo usuário</span>
                            </div>
                            {loading? (<p> Buscando usuário </p>) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='itens'>
                                    <InputText value={user.nome} register={register} name='nome' label='Nome:' maxLength={20} errors={errors} />
                                    <InputSelect value={'value'=user.departamento_id,'name'='teste'} register={register} name='departamento_id' label='Departamento:' errors={errors} list={departaments == ''?[]:departaments}/>
                                    <InputText value={user.email} register={register} name='email' label='Email:' maxLength={20} errors={errors} />
                                    <InputSelect value={user.ativo, 'teste'} register={register} name='ativo' label='Status*:' errors={errors} list={status}/>
                                    {/* <InputSelect register={register} name='acesso' label='Acesso:' errors={errors} list={acessos}/> */}
                                    <InputPassword value={user.senha} register={register} name='senha' label='Senha:' errors={errors} />
                                </div>
                                
                                <div className='buttons'>
                                <Link to="/users">
                                    <CancelButton script={() => reset({
                                        nome:'',
                                        departamento_id:'',
                                        email:'',
                                        ativo:'',
                                        acesso:'',
                                        senha:''
                                    })}/>
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