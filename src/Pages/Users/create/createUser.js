import React, { useState } from "react";
import CancelButton from "../../components/button/cancelButton/cancelButton";
import SaveButton from "../../components/button/saveButton/saveButton";
import SideBar from "../../components/sideMenu/sideMenu";
import { useForm } from "react-hook-form";
import "./createUser.css"
import InputText from "../../components/inputs/text/inputText";





const CreateUser = function(){
 
        const { register, handleSubmit, formState: { errors }} = useForm()
        const [result, setResult] = useState("")
        const onSubmit = (data) => setResult(JSON.stringify(data))
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
                                    <InputText 
                                        register={register}
                                        classInput='create-user-input-text'
                                        name='nome'
                                        label='Nome:'
                                        maxLength={20}
                                        errors={errors}
                                    />
                                    {/* <div className='create-user-input-text'>
                                        <label for="nome">Nome:</label>
                                        <input {...register("nome", {required:true, maxLength:20, pattern:/^[A-Za-z]+$/i})} type="text" name="nome" id=""/>
                                    </div>
                                    {errors.nome?.type === 'pattern' && 'Tipo de dados incorreto!'}
                                    {errors.nome?.type === 'required' && 'Campo requerido!'}
                                    {errors.nome?.type === 'maxLength' && 'Tamanho maximo alcançado!'} */}

                                    <div className='create-user-input-text'>
                                        <label for="departamento">Departamendo:</label>
                                        <input {...register("departamento")} type="text" name="departamento" id=""/>
                                    </div>

                                    <div className='create-user-input-text'>
                                        <label for="email">Email:</label>
                                        <input {...register("email")} type="text" name="email" id=""/>
                                    </div>

                                    <div className='create-user-input-text'>
                                        <label for="status">Status:</label>
                                        <input {...register("status")} type="text" name="status" id=""/>
                                    </div>

                                    <div className='create-user-input-text'>
                                        <label for="acesso">Acesso:</label>
                                        <input {...register("acesso")} type="text" name="acesso" id=""/>
                                    </div>

                                    <div className='create-user-input-text'>
                                        <label for="senha">Senha:</label>
                                        <input {...register("senha")} type="password" name="senha" id=""/>
                                    </div>

                                </div>
                                <div className='buttons'>
                                    <CancelButton/>
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