"use client";

import { useStoreAuth } from "@/store/authStore";
import { logUser } from "../../services/auth";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";
import AuthFormContainer from "./authFormContainer";
import AuthNav from "./authNav";
import { useState } from 'react';

const Header = () => {
    const [formName, setFormName] = useState("");
    const isAuth = useStoreAuth(state => state.isAuth);

    function handleNavEvent(event: string) {
        setFormName(event);
    }

    function getForm() {
        if(formName === "signin") {
            return <AuthFormContainer onClosure={() => handleNavEvent("")}><LoginForm /></AuthFormContainer>;
        } else if(formName === "signup") {
            return <AuthFormContainer onClosure={() => handleNavEvent("")}><RegisterForm /></AuthFormContainer>;
        }
    }

    function getNav() {
        if(isAuth) return <p>Dashboard</p>
        else return <AuthNav handleClick={handleNavEvent} />
    }

    return(
        <header className="w-[100%] flex justify-center items-center text-center min-h-24">
            <h1 className="text-2xl font-bold">Inventory manager</h1>
            {getNav()}
            {getForm()}
        </header>
    )
};

export default Header;