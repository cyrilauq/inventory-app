"use client";

import { registerUser } from "@/services/auth";
import { FormEvent, useState } from "react";
import Input from "../forms/input";

const RegisterForm = () => {
    const [message, setMessage] = useState({ isError: false, message: "" });
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [email, setEmail] = useState("");

    async function onRegister(event: FormEvent) {
        event.preventDefault();
        if(allFieldAreValid(username, firstname, name, password, confirmPwd, email)) {
            const result = await registerUser({
                username,
                firstname,
                name,
                password,
                email
            });
            if(result.code === 200) {
                setMessage({ isError: false, message: "Account successfully created" });
            } else {
                setMessage({ isError: true, message: result.data + "" });
            }
        } else {
            setMessage({ isError: true, message: "One or more field aren't valid" });
        }
    }

    function allFieldAreValid(username: string,
        firstname: string,
        name: string,
        password: string,
        confirm_password: string,
        email: string): Boolean {
        return !validateName(name) && !validateConfirmPassword(confirm_password) && !validatePassword(password) && !validateEmail(email) && !validateFirstName(firstname) && !validateUsername(username);
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
    
    function validateName(value: string): string | undefined {        
        if(value.length < 5) {
            return "The name shouldn't have more than 5 characters.";
        } else if(value.length > 100) {
            return "The name shouldn't have more than 100 characters.";
        }
        return undefined;
    }
    
    function validateUsername(value: string): string | undefined {
        if(value.length < 5) {
            return "The username should at least have 5 characters.";
        } else if(value.length > 100) {
            return "The username shouldn't have more than 100 characters.";
        }
        return undefined;
    }
    
    function validateFirstName(value: string): string | undefined {
        if(value.length < 5) {
            return "The firstname should at least have 5 characters.";
        } else if(value.length > 100) {
            return "The firstname shouldn't have more than 100 characters.";
        }
        return undefined;
    }

    function validateEmail(value: string): string | undefined {
        if(value.length === 0) {
            return "The email input is required.";
        }
        return undefined;
    }

    function validatePassword(value: string): string | undefined {
        if(value.length < 10) {
            return "The password should at least have 10 characters.";
        } else if(value.length > 100) {
            return "The password shouldn't have more than 100 characters.";
        } else if(!/([0-9+])/.test(value) || !/([A-Z+])/.test(value) || !/([a-z+])/.test(value)) {
            return "The password should have at leat one majascule, one minuscule and one number.";
        }
        return undefined;
    }

    function validateConfirmPassword(value: string): string | undefined {
        if(password !== value) {
            return "Confirm password id different than the password.";
        }
        return undefined;
    }

    return(
        <form className="flex flex-col" onSubmit={onRegister}>
            <h2>Register</h2>
            {getMessage()}
            <Input name="name" type="text" id="name" label="Name" validationFunction={validateName} onBlur={setName} />
            <Input name="firstname" type="text" id="firstname" label="Firstname" validationFunction={validateFirstName} onBlur={setFirstname} />
            <Input name="username" type="text" id="username" label="Username" validationFunction={validateUsername} onBlur={setUsername} />
            <Input name="email" type="text" id="email" label="Email" validationFunction={validateEmail} onBlur={setEmail} />
            <Input name="password" type="password" id="password" label="Password" validationFunction={validatePassword} onBlur={setPassword} />
            <Input name="confirm_password" type="password" id="confirm_password" label="Confirm password" validationFunction={validateConfirmPassword} onBlur={setConfirmPwd} />
            <button>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;