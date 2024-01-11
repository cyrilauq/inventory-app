"use client";

import { useStoreAuth } from "@/store/authStore";
import { logUser } from "../../services/auth";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";
import FormContainer from "./formContainer";
import AuthNav from "./authNav";
import { useState } from 'react';
import Link from "next/link";
import HeaderNav from "../nav/headerNav";

const Header = () => {
    const [formName, setFormName] = useState("");
    const isAuth = useStoreAuth(state => state.isAuth);

    function handleNavEvent(event: string) {
        setFormName(event);
    }

    function getForm() {
        if(!isAuth) {
            if(formName === "signin") {
                return <FormContainer onClosure={() => handleNavEvent("")}><LoginForm /></FormContainer>;
            } else if(formName === "signup") {
                return <FormContainer onClosure={() => handleNavEvent("")}><RegisterForm /></FormContainer>;
            }
        }
    }

    return(
        <header className="w-[100%] flex flex-col justify-center items-center text-center min-h-24">
            <h1 className="text-2xl font-bold">Inventory manager</h1>
            {getForm()}
            {!isAuth && <AuthNav handleClick={handleNavEvent} />}
            <HeaderNav />
        </header>
    )
};

export default Header;