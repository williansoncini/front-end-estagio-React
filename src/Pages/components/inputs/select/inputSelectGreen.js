import './inputSelect.css'

export default function InputSelectGreen ({ register, name, label, list=[], errors, disabled=false }) {
    return (
        <>
            <div className={errors[name] ? 'input-text-container-error-select' : 'input-text-container-green-color-select'}>
                <label for={name}> {label} </label>
                <select {...register(`${name}`, { required: true, maxLength: 20 })} disabled={disabled}>
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
