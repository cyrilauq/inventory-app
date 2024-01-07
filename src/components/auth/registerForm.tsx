"use client";

import { registerUser } from "@/services/auth";
import { FormEvent } from "react";

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
    }
    
    return(
        <form className="flex flex-col" onSubmit={onRegister}>
            <h2>Register</h2>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="name">Name</label>
                <input className={inputClasses} type="text" name="name" id="name" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="firstname">Firstname</label>
                <input className={inputClasses} type="text" name="firstname" id="firstname" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="email">Email</label>
                <input className={inputClasses} type="text" name="email" id="email" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="username">Username</label>
                <input className={inputClasses} type="text" name="username" id="username" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="password">Password</label>
                <input className={inputClasses} type="password" name="password" id="password" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="confirm_password">Confirm password</label>
                <input className={inputClasses} type="confirm_password" name="confirm_password" id="confirm_password" />
            </div>
            <button>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;