"use client";

import useApi from "@/hooks/useApi";
import { IInventory } from '@/module/inventory';
import { useEffect } from "react";

const Dashboard = () => {
    const { data: inventories, loading } = useApi<IInventory[]>({ endPoint: '/user/inventories' });

    useEffect(() => {
        console.log(inventories);
    }, [inventories]);

    function getDashboard() {
        if(loading) {
            return <p>Loading....</p>
        }
        return <>
            <span>You have {inventories && inventories.length} intentory</span>
            {inventories && inventories.map(item => <p key={item.id}>{item.name}</p>)}
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