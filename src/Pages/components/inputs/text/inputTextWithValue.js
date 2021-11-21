import './inputText.css'

const InputTextDisabled = function ({ register, name, label, errors }) {
    return (
        <>
            <div className={errors[name] ? 'input-text-container-error-text' : 'input-text-container-text'}>
                <label for={name}> {label} </label>
                <input {...register(`${name}`, { required: true, maxLength: 50, /*pattern:/^[A-Za-z]+$/i*/ })} type="text" name={name} disabled />
            </div>
        </>
    )
}

export default InputTextDisabled