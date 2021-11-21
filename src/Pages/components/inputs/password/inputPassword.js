import './inputPassword.css'

const InputPassword = function ({register, name, label, maxLength, errors}){
    return (
        <>
            <div className={errors[name]? 'input-text-container-error-password':'input-text-container-password'}>
                <label for={name}> {label} </label>
                <input {...register(`${name}`, {required:true})} type="password" name={name} />
            </div>
            {errors[name]?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
        </>
    )
}

export default InputPassword