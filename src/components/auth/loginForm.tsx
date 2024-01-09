"use client";

import { logUser } from "@/services/auth";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface FormElements extends HTMLFormControlsCollection   {
    login: HTMLInputElement;
    password: HTMLInputElement;
}

interface Form extends HTMLFormElement {
    readonly elements: FormElements;
}

const LoginForm = () => {
    const router = useRouter();
    const toogleIsAuth = useStoreAuth(state => state.toggleAuth);
    const labelClass = "w-[128px]";
    const divClasses = "flex flex-row my-2";

    async function onLogin(event: FormEvent<Form>) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        console.log(elements);
        const result = await logUser(elements.login.value, elements.password.value);
        if(result.code === 200) {
            toogleIsAuth(true);
            router.push('/dashboard');
        }
    }

    return(
        <form className="flex flex-col" onSubmit={onLogin}>
            <h2>Login</h2>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="login">Login</label>
                <input className="text-black" type="text" name="login" id="login" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="password">Password</label>
                <input className="text-black" type="password" name="password" id="password" />
            </div>
            <button>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;