"use client";

import { useState } from "react";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";

const AuthNav = () => {
    const [displayForm, setDisplayForm] = useState("");

    function display(str: string) {
        setDisplayForm(str);
    }

    function getForm() {
        if(displayForm.toString() === "signin") {
            return <div className="fixed mx-auto"><LoginForm /></div>;
        }
        if(displayForm.toString() === "signup") {
            return <div className="fixed self-center"><RegisterForm /></div>;
        }
        return undefined;
    }

    return(
        <>
            <ul className="fixed right-4 top-4 flex">
                <li className="me-6" onClick={() => display("signin")}>Sign in</li>
                <li onClick={() => display("signup")}>Sign up</li>
                {getForm()}
            </ul>
        </>
    );
};

export default AuthNav;