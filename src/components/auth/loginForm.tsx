"use client";

import { FormEvent } from "react";

const LoginForm = () => {
    const labelClass = "w-[128px]";
    const divClasses = "flex flex-row my-2";

    function onLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return(
        <form className="flex flex-col" onSubmit={onLogin}>
            <h2>Login</h2>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="username">Username</label>
                <input className="text-black" type="text" name="username" id="username" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="password">Password</label>
                <input className="text-black" type="password" name="password" id="password" />
            </div>
        </form>
    );
};

export default LoginForm;