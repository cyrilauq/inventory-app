"use client";

import useApi from "@/hooks/useApi";
import { IInventory } from '@/module/inventory';
import { useEffect, useState } from "react";
import InventoryItem from "./inventoryItem";
import SearchForm from "@/components/forms/searchForm";
import { useStoreAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Scanner from "@/components/scanner";
import FormContainer from "@/components/global/formContainer";

const Dashboard = () => {
    const { data: inventories, loading } = useApi<IInventory[]>({ endPoint: '/user/inventories' });
    const router = useRouter();
    const [scanVisible, setScanVisible] = useState(false);
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

    function onScanned(barcode: string) {
        console.log("onScanned called for: " + barcode);
    }

    function getScanner() {
        if(!scanVisible) return null;
        return <FormContainer onClosure={() => setScanVisible(false)}><Scanner onScanned={onScanned} /></FormContainer>
    }

    function getDashboard() {
        if(loading) {
            return <p>Loading....</p>
        }
        return <>
            <span>You have {inventories && inventories.length} intentory</span>
            <div className="flex flex-col">                
                <InventoryItem />
                {inventories && inventories.map(item => <InventoryItem key={item.id} id={item.id} name={item.name} editCallBack={editInventory} deleteCallBack={deleteInventory} addCallBack={addToInventory} />)}
            </div>
        </>;
    }

    return(
        <>
            <h2>Dashboard</h2>
            <div className="flex flex-row">
                <SearchForm onSubmit={onSearch} />
                <span>ou</span>
                <button onClick={() => setScanVisible(true)}>Scan</button>
            </div>
            {getScanner()}
            {getDashboard()}
        </>
    );
};

export default Dashboard;