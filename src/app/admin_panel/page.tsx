"use client";

import { IUser } from "@/module/user";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import fetch from "@/services/api";
import UserPanelItem from "./userPanelItem";

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddProductForm from "./addProductForm";
import FormContainer from "@/components/global/formContainer";
import Button from "@/components/global/button";

const AdminPanel = () => {
    const { user, isAuth } = useStoreAuth();
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([])
    const [isVisible, setIsVisible] = useState(false);

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

    function getAddProdForm() {
        if(isVisible) {
            return <FormContainer onClosure={() => setIsVisible(!isVisible)}>
                <AddProductForm />
            </FormContainer>;
        }
        return null;
    }

    return(
        <>
            {getAddProdForm()}
            <div>
                <h2>Admin panel</h2>
                <div>
                    <h3>Products</h3>
                    <div>
                        <div>
                            <Button onClick={() => setIsVisible(!isVisible)} text="Add product" operation="add" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Users</h3>
                    <div>
                        <div>
                            <Button onClick={() => setIsVisible(!isVisible)} text="Add user" operation="add" />
                        </div>
                        <UserPanelItem />
                        {users.map((u, i) => <UserPanelItem key={u.id} className={i % 2 === 0 ? "bg-gray-400" : ""} email={u.email} userId={u.id} fullname={`${u.name} ${u.firstname}`} username={u.username} onAction={onAction} />)}
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminPanel;