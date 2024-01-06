"use client";

import { FormEvent } from "react";

const RegisterForm = () => {
    const labelClass = "w-[128px]";
    const divClasses = "flex flex-row my-2";

    function onRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    
    return(
        <form className="flex flex-col" onSubmit={onRegister}>
            <h2>Register</h2>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="username">Username</label>
                <input className="text-black" type="text" name="username" id="username" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="password">Password</label>
                <input className="text-black" type="password" name="password" id="password" />
            </div>
            <div className={divClasses}>
                <label className={labelClass} htmlFor="confirm_password">Confirm password</label>
                <input className="text-black" type="confirm_password" name="confirm_password" id="confirm_password" />
            </div>
            <button>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;