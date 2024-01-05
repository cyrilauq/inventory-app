"use client";

import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";
import AuthFormContainer from "./authFormContainer";
import AuthNav from "./authNav";
import { useState } from 'react';

const Header = () => {
    const [formName, setFormName] = useState("");

    function handleNavEvent(event: string) {
        setFormName(event);
    }

    function getForm() {
        const formClasses = "fixed mx-auto top-56 backdrop-blur-md flex"
        if(formName === "signin") {
            return <AuthFormContainer onClosure={() => handleNavEvent("")}><LoginForm /></AuthFormContainer>
        } else if(formName === "signup") {
            return <AuthFormContainer onClosure={() => handleNavEvent("")}><RegisterForm /></AuthFormContainer>
        }
    }
    return(
        <header className="w-[100%] flex justify-center items-center text-center min-h-24">
            <h1 className="text-2xl font-bold">Inventory manager</h1>
            <AuthNav handleClick={value => handleNavEvent(value)} />
            {getForm()}
        </header>
    )
};

export default Header;