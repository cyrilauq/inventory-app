"use client";

import { IUser } from "@/module/user";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import fetch from "@/services/api";
import UserPanelItem from "./userPanelItem";

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

    function onAction(action: CrudActions, id: string) {

    }

    return(
        <div>
            <h2>Admin panel</h2>
            <div>
                <h3>Users</h3>
                <UserPanelItem />
                {users.map((u, i) => <UserPanelItem key={u.id} className={i % 2 === 0 ? "bg-gray-400" : ""} email={u.email} userId={u.id} fullname={`${u.name} ${u.firstname}`} username={u.username} onAction={onAction} />)}
            </div>
        </div>
    )
};

export default AdminPanel;