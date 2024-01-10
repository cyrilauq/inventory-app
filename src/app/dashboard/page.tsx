"use client";

import useApi from "@/hooks/useApi";
import { IInventory } from '@/module/inventory';
import { useEffect } from "react";
import InventoryItem from "./inventoryItem";

const Dashboard = () => {
    const { data: inventories, loading } = useApi<IInventory[]>({ endPoint: '/user/inventories' });

    useEffect(() => {
        console.log(inventories);
    }, [inventories]);

    function editInventory(inventoryId: String): void {
        console.log("editInventory called for: " + inventoryId);
    }

    function deleteInventory(inventoryId: String): void {
        console.log("deleteInventory called for: " + inventoryId);
    }

    function addToInventory(inventoryId: String): void {
        console.log("addToInventory called for: " + inventoryId);
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
            {getDashboard()}
        </>
    );
};

export default Dashboard;