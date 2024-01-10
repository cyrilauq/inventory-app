import { useState, ChangeEvent } from 'react';

interface IInputProps {
    id: string;
    name: string;
    type: string;
    label?: string;
    validationFunction?: (value: string) => string | undefined;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
}

const Input = (props: IInputProps) => {
    const labelClass = "w-[100px]";
    const divClasses = "flex flex-row my-2 text-start";
    const inputClasses = "bg-gray-400";

    const [errorMsg, setErrorMsg] = useState("");

    function handleOnBlur(value: string) {
        props.validationFunction && setErrorMsg(props.validationFunction(value) || "");
        props.onBlur && props.onBlur(value);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange && props.onChange(event.target.value);
    }

    return (
        <div>
            <div className={divClasses}>
                {props.label && <label className={labelClass} htmlFor={props.id}>{props.label}</label>}
                <input className={inputClasses} type={props.type} name={props.name} id={props.id} onBlur={e => handleOnBlur(e.target.value)} onChange={handleOnChange} />
            </div>
            {errorMsg.length !== 0 ? <p className="text-red-600">{errorMsg}</p> : undefined}
        </div>
    );
};

export default Input;