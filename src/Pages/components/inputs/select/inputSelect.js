import './inputSelect.css'

const InputSelect = function ({ register, name, label, list=[], errors, disabled=false, readonly=false }) {
    return (
        <>
            <div className={errors[name] ? 'input-text-container-error-select' : 'input-text-container-select'}>
                <label for={name}> {label} </label>
                <select {...register(`${name}`, { required: true, maxLength: 20 })} disabled={disabled} readonly={readonly}>
                    <option value='' selected="true">Selecione</option>
                    {list.map((object) => {
                        return (
                            <option value={object.value}>{object.name}</option>
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