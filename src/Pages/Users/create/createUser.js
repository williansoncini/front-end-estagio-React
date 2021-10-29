import React, { useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import SideBar from "../../components/sideMenu/sideMenu";
import { useForm } from "react-hook-form";
import "./createUser.css"
import InputText from "../../components/inputs/text/inputText";
import InputSelect from "../../components/inputs/select/inputSelect";
// import getDepartaments from "../../services/departaments/departamentsService";

const CreateUser = function(){
        const { register, handleSubmit, formState: { errors }, reset} = useForm()
        const [result, setResult] = useState("")
        const onSubmit = (data) => setResult(JSON.stringify(data))

        // const departamentos = await getDepartaments()
        // console.log(departamentos)
        const departamentos = ['teste','teste2']
        const acessos = ['admin', 'supervisor', 'usuário']
        
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
                                    <InputSelect register={register} name='departamento' label='Departamento:' errors={errors} list={departamentos}/>
                                    <InputText register={register} name='email' label='Email:' maxLength={20} errors={errors} />
                                    <InputText register={register} name='status' label='Status:' maxLength={20} errors={errors} />
                                    <InputSelect register={register} name='acesso' label='Acesso:' errors={errors} list={acessos}/>
                                    {/* <InputText register={register} name='acesso' label='Acesso:' maxLength={20} errors={errors} /> */}
                                    <InputText register={register} name='senha' label='Senha:' maxLength={20} errors={errors} />
                                </div>
                                <div className='buttons'>
                                    <CancelButton script={() => reset({
                                        nome:'',
                                        departamento:'',
                                        email:'',
                                        status:'',
                                        acesso:'',
                                        senha:''
                                    })}/>
                                    <SaveButton/>
                                </div>
                            </form>
                        </div>
                    </div>
                <p>{result}</p>
            </>
        )
}
export default CreateUser