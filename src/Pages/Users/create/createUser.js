import React, { useEffect, useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import SideBar from "../../components/sideMenu/sideMenu";
import { useForm } from "react-hook-form";
import "./createUser.css"
import InputText from "../../components/inputs/text/inputText";
import InputSelect from "../../components/inputs/select/inputSelect";
import {getArrayNameAndIdDepartaments, getNamesDepartaments} from "../../services/departaments/departamentsService";
import InputPassword from "../../components/inputs/password/inputPassword";
import { saveUser } from "../../services/users/usersService";
import { Link } from "react-router-dom";
import  { Redirect, useHistory } from 'react-router-dom'


const CreateUser = function(){
        const history = useHistory()
        const [departaments, setDepartaments] = useState('');

        useEffect(async () => {
            if (departaments == ''){
                const departaments = await getArrayNameAndIdDepartaments()
                setDepartaments(departaments)
            }
        })

        const { register, handleSubmit, formState: { errors }, reset} = useForm()
        const [result, setResult] = useState("")
        // const onSubmit = (data) => setResult(JSON.stringify(data))
        const onSubmit = async (data) => {
            setResult(data)
            const response = await saveUser(data)
            if (response.status !== 200){
                
            }
            history.push('/users')
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='itens'>
                                    <InputText register={register} name='nome' label='Nome:' maxLength={20} errors={errors} />
                                    <InputSelect register={register} name='departamento_id' label='Departamento:' errors={errors} list={departaments == ''?[]:departaments}/>
                                    <InputText register={register} name='email' label='Email:' maxLength={20} errors={errors} />
                                    <InputSelect register={register} name='ativo' label='Status*:' errors={errors} list={status}/>
                                    {/* <InputSelect register={register} name='acesso' label='Acesso:' errors={errors} list={acessos}/> */}
                                    <InputPassword register={register} name='senha' label='Senha:' errors={errors} />
                                    
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
                        </div>
                    </div>
            </>
        )
}
export default CreateUser