"use client";

import { useState } from "react";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";

interface AuthNavProps {
    handleClick(arg: string): void;
}

const AuthNav = ( props: AuthNavProps ) => {
    const [displayForm, setDisplayForm] = useState("");

    function display(str: string) {
        props.handleClick(str);
    }

    return(
        <>
            <ul className="fixed right-4 top-4 flex">
                <li className="me-6 cursor-pointer" onClick={() => display("signin")}>Sign in</li>
                <li className="cursor-pointer" onClick={() => display("signup")}>Sign up</li>
            </ul>
        </>
    );
};

export default AuthNav;