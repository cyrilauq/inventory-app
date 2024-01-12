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

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from "@/components/global/button";
import AddInventory from "@/components/forms/addInventory";
import PrivateRoute from "@/components/global/privateRoute";

const Dashboard = () => {
    const router = useRouter();
    const [scanVisible, setScanVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const { isAuth } = useStoreAuth();
    const { data: inventories, loading } = useApi<IInventory[]>({ endPoint: '/user/inventories' });

    // useEffect(() => {
    //     if(!isAuth) {
    //         router.push("/");
    //     }
    //     console.log(inventories);
    // }, [inventories, isAuth, router]);

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

    function addInventory() {
        console.log("addInventory called");
        setAddVisible(false);
    }

    function getDashboard() {
        if(loading) {
            return <p>Loading....</p>
        }
        return <>
            <span>You have {inventories && inventories.length} intentory</span>
            <div className="flex flex-col">
                <InventoryItem />
                {inventories && inventories.map(item => <InventoryItem key={item.id} id={item.id} count={0} name={item.name} editCallBack={editInventory} deleteCallBack={deleteInventory} addCallBack={addToInventory} />)}
            </div>
        </>;
    }

    function getAddForm() {
        if(addVisible) {
            return <FormContainer onClosure={() => setAddVisible(false)}><AddInventory onAdded={addInventory} /></FormContainer>
        }
        return undefined;
    }

    return(
        <PrivateRoute isAuth={isAuth}>
            <div className="text-center flex flex-col min-w-[50%]">
                <h2>Dashboard</h2>
                <Button onClick={() => setAddVisible(!addVisible)} text="New inventory" operation="add" />
                <div className="flex flex-row self-center">
                    <SearchForm onSubmit={onSearch} />
                    <span>ou</span>
                    <button onClick={() => setScanVisible(true)}>Scan</button>
                </div>
                {getScanner()}
                {getDashboard()}
                {getAddForm()}
            </div>
        </PrivateRoute>
    );
};

export default Dashboard;