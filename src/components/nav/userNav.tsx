"use client";

import { useState } from "react";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface UserNavProps {
}

const UserNav = ( props: UserNavProps ) => {
    const router = useRouter();
    const [displayForm, setDisplayForm] = useState("");
    const { setUser, toggleAuth } = useStoreAuth();

    function onLogOut() {
        toggleAuth(false);
        router.push("/");
    }

    return(
        <>
            <ul className="fixed right-4 top-4 flex">
                <li className="me-6">Profile</li>
                <li className="cursor-pointer" onClick={() => onLogOut()}>Logout</li>
            </ul>
        </>
    );
};

export default UserNav;