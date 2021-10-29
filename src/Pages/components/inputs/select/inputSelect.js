import './inputSelect.css'

const InputSelect = function ({register, name, label, list, errors}){
    
    return (
        <>
            {/* <div className={errors[name]? 'input-text-container-error':'input-text-container'}> */}
            <div className={errors[name]? 'input-text-container-error':'input-text-container'}>
                <label for={name}> {label} </label>
                <select {...register(`${name}`, {required:true, maxLength:20})} >
                    {list.map((object) => {
                        return (
                            <option value={object}>{object}</option>
                        )
                    })}
                </select>
            </div>
            {errors[name]?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
            {errors[name]?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
        </>
    )
}

export default InputSelect