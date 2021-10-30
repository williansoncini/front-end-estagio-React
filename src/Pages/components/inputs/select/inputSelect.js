import './inputSelect.css'

const InputSelect = function ({ register, name, label, list, value, errors }) {
    return (
        <>
            <div className={errors[name] ? 'input-text-container-error' : 'input-text-container'}>
                <label for={name}> {label} </label>
                <select {...register(`${name}`, { required: true, maxLength: 20 })}>
                    <option value={value.value} selected="true"> {value? value.name: "Selecione uma das opções"} </option>
                    {list.map((object) => {
                        if (object.value != value.value){
                        return (
                            <option value={object.value}>{object.name}</option>
                        )}
                    })}
                </select>
            </div>
            {errors[name]?.type === 'required' && (<div className='input-text-container-message-error'> Campo requerido! </div>)}
            {errors[name]?.type === 'maxLength' && (<div className='input-text-container-message-error'> Tamanho maximo alcançado! </div>)}
        </>
    )
}

export default InputSelect