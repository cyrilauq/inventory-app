"use client";

import { registerUser } from "@/services/auth";
import { FormEvent, useState } from "react";

interface IRegisterFormProps {
    onRegister(args: {username: string, name: string, firstname: string, email: string, password: string }): void;
}

interface IRegisterFormElements extends HTMLFormControlsCollection   {
    username: HTMLInputElement;
    name: HTMLInputElement;
    firstname: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirm_password: HTMLInputElement;
}

interface IRegisterForm extends HTMLFormElement {
    readonly elements: IRegisterFormElements;
}

const RegisterForm = () => {
    const labelClass = "w-[100px]";
    const divClasses = "flex flex-row my-2 text-start";
    const inputClasses = "bg-gray-400";
    const [message, setMessage] = useState({ isError: false, message: "" });
    const [nameError, setNameError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPwdError, setConfirmPwdError] = useState("");
    const [emailError, setEmailError] = useState("");

    async function onRegister(event: FormEvent<IRegisterForm>) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const result = await registerUser({
            username: elements.username.value,
            firstname: elements.firstname.value,
            name: elements.name.value,
            password: elements.password.value,
            email: elements.email.value
        });
        if(result.code === 200) {
            setMessage({ isError: false, message: "Account successfully created" });
        } else {
            setMessage({ isError: true, message: result.data + "" });
        }
    }

    function getMessage() {
        if(message.message.length === 0) {
            return null;
        }
        if(message.isError) {
            return <p className="text-red-600">{message.message}</p>
        }
        return <p className="text-green-600">{message.message}</p>
    }
    
    function validateName(value: string): void {        
        if(value.length < 5) {
            setNameError("The name should at least have 5 characters.");
            return;
        } else if(value.length > 100) {
            setNameError("The name shouldn't have more than 100 characters.");
            return;
        }
        setNameError("");        
    }
    
    function validateUsername(value: string): void {
        if(value.length < 5) {
            setUsernameError("The username should at least have 5 characters.");
            return;
        } else if(value.length > 100) {
            setUsernameError("The username shouldn't have more than 100 characters.");
            return;
        }
        setUsernameError("");
    }
    
    function validateFirstName(value: string): void {
        if(value.length < 5) {
            setFirstNameError("The firstname should at least have 5 characters.");
            return;
        } else if(value.length > 100) {
            setFirstNameError("The firstname shouldn't have more than 100 characters.");
            return;
        }
        setFirstNameError("");
    }

    function validateEmail(value: string): void {
        if(value.length === 0) {
            setEmailError("The email input is required.");
            return;
        }
        setEmailError("");
    }

    function validatePassword(value: string): void {
        if(value.length < 10) {
            setPasswordError("The password should at least have 10 characters.");
            return;
        } else if(value.length > 100) {
            setPasswordError("The password shouldn't have more than 100 characters.");
            return;
        } else if(!/([0-9+]|[A-Z+]|[a-z+])/.test(value)) {
            setPasswordError("The password should have at leat one majascule, one minuscule and one number.");
            return;
        }
        setPasswordError("");
    }

    function validateConfirmPassword(value: string): void {
        if(document.getElementById("password")?.textContent !== value) {
            setConfirmPwdError("Confirm password id different than the password.");
            return;
        }
        setConfirmPwdError("");
    }

    return(
        <form className="flex flex-col" onSubmit={onRegister}>
            <h2>Register</h2>
            {getMessage()}
            <div className={divClasses}>
                <label className={labelClass} htmlFor="name">Name</label>
                <input className={inputClasses} type="text" name="name" id="name" onBlur={e => validateName(e.target.value)} />
                {nameError.length !== 0 ? <p className="text-red-600">{nameError}</p> : undefined}
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="firstname">Firstname</label>
                <input className={inputClasses} type="text" name="firstname" id="firstname" onBlur={e => validateFirstName(e.target.value)} />
                {firstNameError.length !== 0 ? <p className="text-red-600">{firstNameError}</p> : undefined}
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="email">Email</label>
                <input className={inputClasses} type="text" name="email" id="email" onBlur={e => validateEmail(e.target.value)} />
                {emailError.length !== 0 ? <p className="text-red-600">{emailError}</p> : undefined}
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="username">Username</label>
                <input className={inputClasses} type="text" name="username" id="username" onBlur={e => validateUsername(e.target.value)} />
                {usernameError.length !== 0 ? <p className="text-red-600">{usernameError}</p> : undefined}
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="password">Password</label>
                <input className={inputClasses} type="password" name="password" id="password" onBlur={e => validatePassword(e.target.value)} />
                {passwordError.length !== 0 ? <p className="text-red-600">{passwordError}</p> : undefined}
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="confirm_password">Confirm password</label>
                <input className={inputClasses} type="confirm_password" name="confirm_password" id="confirm_password" onBlur={e => validateConfirmPassword(e.target.value)} />
                {confirmPwdError.length !== 0 ? <p className="text-red-600">{confirmPwdError}</p> : undefined}
            </div>
            <button>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;