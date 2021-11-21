import './inputSelect.css'

const InputSelectWithValue = function ({ register, name, label, list, value, disabled=false, errors }) {
    return (
        <>
            <div className={errors[name] ? 'input-text-container-error-select' : 'input-text-container-select'}>
                <label for={name}> {label} </label>
                <select {...register(`${name}`, { required: true, maxLength: 20 })} disabled={disabled}>
                    <option value={value.value} selected="true"> {value.name} </option>
                    {list.map((object) => {
                        if (object.value != value.value) {
                            return (
                                <option value={object.value}>{object.name}</option>
                            )
                        }
                    })}
                </select>
            </div>
            {errors[name]?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
            {errors[name]?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
        </>
    )
}

export default InputSelectWithValue