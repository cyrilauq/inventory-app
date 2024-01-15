"use client";

import { IUser } from "@/module/user";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import fetch from "@/services/api";

const AdminPanel = () => {
    const { user, isAuth } = useStoreAuth();
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([])

    if(!isAuth || !user?.isAdmin) {
        router.push("/");
    }

    useEffect(() => {
        async function tru() {
            const result = (await fetch<IUser[]>({ endPoint: '/admin/users' })).data;
            console.log(result);
            setUsers(result!);
        }
        tru();
    }, []);

    return(
        <div>
            <h2>Admin panel</h2>
            <div>
                <h3>Products</h3>
            </div>
            <div>
                <h3>Users</h3>
                <ul>
                    {users.map(u => <li key={u.id}>{u.name}</li>)}
                </ul>
            </div>
        </div>
    )
};

export default AdminPanel;