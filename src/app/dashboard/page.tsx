"use client";

import useApi from "@/hooks/useApi";
import { IInventory } from '@/module/inventory';
import { useEffect } from "react";
import InventoryItem from "./inventoryItem";
import SearchForm from "@/components/forms/searchForm";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { data: inventories, loading } = useApi<IInventory[]>({ endPoint: '/user/inventories' });
    const router = useRouter();
    const { isAuth } = useStoreAuth();

    useEffect(() => {
        if(!isAuth) {
            router.push("/");
        }
        console.log(inventories);
    }, [inventories, isAuth, router]);

    function editInventory(inventoryId: String): void {
        console.log("editInventory called for: " + inventoryId);
    }

    function deleteInventory(inventoryId: String): void {
        console.log("deleteInventory called for: " + inventoryId);
    }

    function addToInventory(inventoryId: String): void {
        console.log("addToInventory called for: " + inventoryId);
    }

    function onSearch(value: string) {
        console.log("onSearch called for: " + value);
    }

    function getDashboard() {
        if(loading) {
            return <p>Loading....</p>
        }
        return <>
            <span>You have {inventories && inventories.length} intentory</span>
            {inventories && inventories.map(item => <InventoryItem key={item.id} id={item.id} name={item.name} editCallBack={editInventory} deleteCallBack={deleteInventory} addCallBack={addToInventory} />)}
        </>;
    }

    return(
        <>
            <h2>Dashboard</h2>
            <SearchForm onSubmit={onSearch} />
            {getDashboard()}
        </>
    );
};

export default Dashboard;