import { useState, ChangeEvent } from 'react';

interface IInputProps {
    id: string;
    name: string;
    type: string;
    label?: string;
    validationFunction?: (value: string) => string | undefined;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
    rules?: string;
}

const Input = (props: IInputProps) => {
    const labelClass = "w-[100px]";
    const divClasses = "flex flex-row my-2 text-start";
    const inputClasses = "bg-gray-400";

    const [errorMsg, setErrorMsg] = useState("");

    function handleOnBlur(value: string) {
        if(props.rules) {
            setErrorMsg(validateWithRules(props.rules, value) || "");
        }
        props.validationFunction && setErrorMsg(props.validationFunction(value) || "");
        props.onBlur && props.onBlur(value);
    }

    function validateWithRules(rules: string, input: string): string | undefined {
        console.log(rules);
        
        for(const rule of rules.split("|")) {
            console.log(rule);
            
            const error = validateRule(rule, input);
            if(error) {
                return error;
            }
        }
        return undefined;
    }

    function validateRule(rule: string, input: string): string | undefined {
        const [name, values] = rule.split(":");
        switch(name.toLocaleLowerCase()) {
            case "required":
                return input.trim().length > 0 ? undefined : `The field ${props.name} is required`;
            case "min":
                return input.trim().length < parseInt(values) ? `The field ${props.name} is too short` : undefined;
            case "max":
                return input.trim().length > parseInt(values) ? `The field ${props.name} is too long` : undefined;
            case "email":
                return /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(values) ? undefined : `The field ${props.name} doesn't seems to be a valid email`;
            case "text":
                return validateRule("min:10", input) || validateRule("max:255", input);
            default:
                return undefined;
        }
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