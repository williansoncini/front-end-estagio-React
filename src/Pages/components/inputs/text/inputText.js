import './inputText.css'

const InputText = function ({register, name, label, maxLength, disabled=false, readonly=false, errors}){
    return (
        <>
            <div className={errors[name]? 'input-text-container-error-text':'input-text-container-text'}>
                <label for={name}> {label} </label>
                <input {...register(`${name}`, {required:true, maxLength:50, /*pattern:/^[A-Za-z]+$/i*/})} type="text" name={name} disabled={disabled} readonly={readonly}/>
            </div>
            {/* {errors[name]?.type === 'pattern' && (<div className='input-text-container-message-error'> Tipo de dado incorreto! </div>)} */}
            {errors[name]?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
            {errors[name]?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
        </>
    )
}

export default InputText